import { useCallback } from 'react'
import type { ReactElement } from 'react'
import Button from '@/components/ui/Button'
import {
  toRtf,
  toSrt,
  toVtt,
  type Transcript,
} from '@/lib/transcript-formats'
import { track } from '@/lib/analytics'

interface DownloadButtonsProps {
  transcript: Transcript
  speakers: boolean
  timestamps: boolean
  /** Original filename (with extension) — used as the document title. */
  baseName: string
}

type Format = 'rtf' | 'srt' | 'vtt'

const MIME: Record<Format, string> = {
  rtf: 'application/rtf;charset=utf-8',
  srt: 'application/x-subrip;charset=utf-8',
  vtt: 'text/vtt;charset=utf-8',
}

function safeFileBaseName(name: string): string {
  const trimmed = name.replace(/\.[^.]+$/, '').trim()
  const cleaned = trimmed.replace(/[^a-zA-Z0-9._-]+/g, '-')
  return cleaned.length > 0 ? cleaned : 'transcript'
}

function displayTitle(name: string): string {
  return name.replace(/\.[^.]+$/, '').trim() || 'Transcript'
}

export default function DownloadButtons({
  transcript,
  speakers,
  timestamps,
  baseName,
}: DownloadButtonsProps): ReactElement {
  const safe = safeFileBaseName(baseName)
  const title = displayTitle(baseName)

  const download = useCallback(
    (format: Format) => {
      const content =
        format === 'rtf'
          ? toRtf(transcript, { speakers, timestamps }, { fileName: title })
          : format === 'srt'
            ? toSrt(transcript)
            : toVtt(transcript)

      const blob = new Blob([content], { type: MIME[format] })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${safe}.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      track('transcribe_downloaded', { format })
    },
    [transcript, speakers, timestamps, safe, title],
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pointer-events-auto">
      <Button variant="primary" size="md" onClick={() => download('rtf')}>
        Download Document
      </Button>
      <Button variant="secondary" size="md" onClick={() => download('srt')}>
        Download SRT
      </Button>
      <Button variant="secondary" size="md" onClick={() => download('vtt')}>
        Download VTT
      </Button>
    </div>
  )
}
