import type { BodyInit } from 'undici-types'
import { loadEnv } from './config.js'

const BASE = 'https://api.assemblyai.com/v2'

export interface SubmitOptions {
  /** Enable speaker diarization. */
  speakers: boolean
  /** Enable word-level timestamps in the response (always on; toggle controls
   *  whether they appear in the user-facing TXT download). */
  language_detection?: boolean
}

export interface AssemblyAiTranscript {
  id: string
  status: 'queued' | 'processing' | 'completed' | 'error'
  text?: string | null
  audio_duration?: number | null
  language_code?: string | null
  error?: string | null
  utterances?: Array<{
    speaker: string
    start: number
    end: number
    text: string
    words?: Array<{ start: number; end: number; text: string }>
  }> | null
  words?: Array<{ start: number; end: number; text: string }> | null
}

function authHeaders(): Record<string, string> {
  const env = loadEnv()
  return { authorization: env.ASSEMBLYAI_API_KEY }
}

/** Stream a binary file body to AssemblyAI's upload endpoint. Returns a public URL. */
export async function uploadFile(body: BodyInit): Promise<string> {
  const res = await fetch(`${BASE}/upload`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'content-type': 'application/octet-stream',
    },
    body: body as never,
    // duplex is required by undici when the body is a ReadableStream;
    // it's not in the standard `RequestInit` type so we cast to `never` above.
    duplex: 'half',
  } as Parameters<typeof fetch>[1])

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`AssemblyAI upload failed (${res.status}): ${detail}`)
  }
  const json = (await res.json()) as { upload_url?: string }
  if (!json.upload_url) throw new Error('AssemblyAI upload returned no upload_url')
  return json.upload_url
}

/** Submit a transcription job. Returns the new transcript record. */
export async function submitTranscript(
  audioUrl: string,
  opts: SubmitOptions,
): Promise<AssemblyAiTranscript> {
  const res = await fetch(`${BASE}/transcript`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      audio_url: audioUrl,
      speech_model: 'universal',
      speaker_labels: opts.speakers,
      language_detection: opts.language_detection ?? true,
    }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`AssemblyAI submit failed (${res.status}): ${detail}`)
  }
  return (await res.json()) as AssemblyAiTranscript
}

export async function getTranscript(id: string): Promise<AssemblyAiTranscript> {
  const res = await fetch(`${BASE}/transcript/${encodeURIComponent(id)}`, {
    headers: authHeaders(),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`AssemblyAI poll failed (${res.status}): ${detail}`)
  }
  return (await res.json()) as AssemblyAiTranscript
}
