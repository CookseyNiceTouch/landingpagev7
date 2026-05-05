import { useCallback, useEffect, useRef, useState } from 'react'
import { API_URL } from '@/data/transcribe'
import type { Transcript } from '@/lib/transcript-formats'
import { track } from '@/lib/analytics'

export type TranscribeStatus =
  | 'idle'
  | 'uploading'
  | 'queued'
  | 'processing'
  | 'completed'
  | 'error'

export interface TranscribeFlags {
  speakers: boolean
}

export interface TranscribeError {
  code: string
  message: string
}

/** Live progress for the upload phase (bytes-accurate). */
export interface UploadProgress {
  /** Bytes sent so far. */
  loaded: number
  /** Total bytes to send. */
  total: number
  /** 0-1 fraction. */
  fraction: number
  /** Estimated seconds remaining, or null while we don't have enough samples. */
  etaSeconds: number | null
}

interface SubmitResponse {
  id: string
  status: string
}

interface PollResponse {
  id: string
  status: 'queued' | 'processing' | 'completed' | 'error'
  text: string | null
  audio_duration: number | null
  language_code: string | null
  utterances: Transcript['utterances']
  words: Transcript['words']
  error: string | null
}

const POLL_INTERVAL_MS = 3000

interface UseTranscribeReturn {
  status: TranscribeStatus
  transcript: Transcript | null
  audioDuration: number | null
  error: TranscribeError | null
  upload: UploadProgress | null
  /** ms since the processing phase started, polled every 1s. */
  processingElapsedMs: number
  submit: (file: File, flags: TranscribeFlags) => void
  reset: () => void
}

export function useTranscribe(): UseTranscribeReturn {
  const [status, setStatus] = useState<TranscribeStatus>('idle')
  const [transcript, setTranscript] = useState<Transcript | null>(null)
  const [audioDuration, setAudioDuration] = useState<number | null>(null)
  const [error, setError] = useState<TranscribeError | null>(null)
  const [upload, setUpload] = useState<UploadProgress | null>(null)
  const [processingElapsedMs, setProcessingElapsedMs] = useState(0)

  const pollTimeout = useRef<number | null>(null)
  const elapsedInterval = useRef<number | null>(null)
  const xhrRef = useRef<XMLHttpRequest | null>(null)
  const processingStartRef = useRef<number | null>(null)

  const clearTimers = useCallback(() => {
    if (pollTimeout.current !== null) {
      window.clearTimeout(pollTimeout.current)
      pollTimeout.current = null
    }
    if (elapsedInterval.current !== null) {
      window.clearInterval(elapsedInterval.current)
      elapsedInterval.current = null
    }
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    if (xhrRef.current) {
      try {
        xhrRef.current.abort()
      } catch {
        /* ignore */
      }
      xhrRef.current = null
    }
    processingStartRef.current = null
    setStatus('idle')
    setTranscript(null)
    setAudioDuration(null)
    setError(null)
    setUpload(null)
    setProcessingElapsedMs(0)
  }, [clearTimers])

  useEffect(() => {
    return () => {
      clearTimers()
      if (xhrRef.current) {
        try {
          xhrRef.current.abort()
        } catch {
          /* ignore */
        }
      }
    }
  }, [clearTimers])

  const startProcessingTimer = useCallback(() => {
    if (processingStartRef.current !== null) return
    processingStartRef.current = Date.now()
    elapsedInterval.current = window.setInterval(() => {
      const start = processingStartRef.current
      if (start === null) return
      setProcessingElapsedMs(Date.now() - start)
    }, 1000)
  }, [])

  const poll = useCallback(
    async (id: string): Promise<void> => {
      try {
        const res = await fetch(`${API_URL}/api/transcribe/${id}`)
        if (!res.ok) {
          throw new Error(`poll_${res.status}`)
        }
        const json = (await res.json()) as PollResponse

        if (typeof json.audio_duration === 'number' && json.audio_duration > 0) {
          setAudioDuration(json.audio_duration)
        }

        if (json.status === 'completed') {
          clearTimers()
          setTranscript({
            text: json.text,
            words: json.words,
            utterances: json.utterances,
          })
          setStatus('completed')
          track('transcribe_completed', { duration: json.audio_duration })
          return
        }
        if (json.status === 'error') {
          clearTimers()
          console.error('[useTranscribe] AssemblyAI error:', json.error)
          setError({
            code: 'transcription_failed',
            message: 'Something went wrong with the transcription. Please try again.',
          })
          setStatus('error')
          track('transcribe_failed', { reason: 'assemblyai_error' })
          return
        }

        if (json.status === 'processing') {
          startProcessingTimer()
        }
        setStatus(json.status === 'queued' ? 'queued' : 'processing')
        pollTimeout.current = window.setTimeout(() => {
          void poll(id)
        }, POLL_INTERVAL_MS)
      } catch (err) {
        clearTimers()
        console.error('[useTranscribe] poll failed:', err)
        setError({
          code: 'poll_failed',
          message: 'We lost contact with the transcription service. Please try again.',
        })
        setStatus('error')
        track('transcribe_failed', { reason: 'poll_failed' })
      }
    },
    [clearTimers, startProcessingTimer],
  )

  const submit = useCallback(
    (file: File, flags: TranscribeFlags) => {
      reset()

      if (!API_URL) {
        setError({
          code: 'misconfigured',
          message:
            'The transcription service is not configured. Please try again later.',
        })
        setStatus('error')
        return
      }

      setStatus('uploading')
      track('transcribe_uploaded', { size: file.size, type: file.type })

      const url = new URL(`${API_URL}/api/transcribe/submit`)
      url.searchParams.set('speakers', flags.speakers ? 'true' : 'false')

      const xhr = new XMLHttpRequest()
      xhrRef.current = xhr
      xhr.open('POST', url.toString(), true)
      xhr.setRequestHeader('content-type', file.type || 'application/octet-stream')

      const startedAt = Date.now()
      // Hold a small ring of recent samples for a smoothed ETA. Naive
      // instantaneous rates jitter wildly when the network has a spiky uplink.
      const samples: Array<{ t: number; loaded: number }> = []

      xhr.upload.onprogress = (e: ProgressEvent) => {
        if (!e.lengthComputable) return
        const total = e.total
        const loaded = e.loaded
        const fraction = total > 0 ? loaded / total : 0

        const now = Date.now()
        samples.push({ t: now, loaded })
        // keep only last ~5 seconds of samples
        while (samples.length > 1 && now - samples[0]!.t > 5000) {
          samples.shift()
        }

        let etaSeconds: number | null = null
        if (samples.length >= 2 && loaded < total) {
          const first = samples[0]!
          const last = samples[samples.length - 1]!
          const dt = (last.t - first.t) / 1000
          const dBytes = last.loaded - first.loaded
          if (dt > 0 && dBytes > 0) {
            const bps = dBytes / dt
            etaSeconds = (total - loaded) / bps
          }
        }

        // Once upload is fully done, drop ETA so the UI can switch phases.
        if (loaded >= total) etaSeconds = 0

        setUpload({ loaded, total, fraction, etaSeconds })
      }

      xhr.onload = () => {
        const elapsed = Date.now() - startedAt
        if (xhr.status === 429) {
          setError({
            code: 'daily_cap',
            message:
              'Free transcription is at capacity for today. Please try again tomorrow.',
          })
          setStatus('error')
          track('transcribe_failed', { reason: 'daily_cap' })
          return
        }
        if (xhr.status === 413) {
          setError({
            code: 'file_too_large',
            message: 'That file is over the 100 MB limit.',
          })
          setStatus('error')
          return
        }
        if (xhr.status < 200 || xhr.status >= 300) {
          setError({
            code: 'submit_failed',
            message: 'Could not start transcription. Please try again.',
          })
          setStatus('error')
          track('transcribe_failed', { reason: `status_${xhr.status}` })
          return
        }

        try {
          const json = JSON.parse(xhr.responseText) as SubmitResponse
          setUpload((prev) =>
            prev ? { ...prev, fraction: 1, etaSeconds: 0 } : prev,
          )
          setStatus('queued')
          track('transcribe_queued', { uploadMs: elapsed, id: json.id })
          void poll(json.id)
        } catch (err) {
          console.error('[useTranscribe] could not parse submit response:', err)
          setError({
            code: 'submit_failed',
            message: 'Could not start transcription. Please try again.',
          })
          setStatus('error')
        }
      }

      xhr.onerror = () => {
        if (xhr.status === 0) return
        console.error('[useTranscribe] xhr error, status:', xhr.status)
        setError({
          code: 'submit_failed',
          message: 'Could not reach the transcription service. Please try again.',
        })
        setStatus('error')
        track('transcribe_failed', { reason: 'network' })
      }

      xhr.onabort = () => {
        // Reset already handled by reset(); nothing else to do.
      }

      xhr.send(file)
    },
    [reset, poll],
  )

  return {
    status,
    transcript,
    audioDuration,
    error,
    upload,
    processingElapsedMs,
    submit,
    reset,
  }
}
