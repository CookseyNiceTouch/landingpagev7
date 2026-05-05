import { useCallback, useRef, useState } from 'react'
import type { ChangeEvent, DragEvent, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import {
  ACCEPT_ATTRIBUTE,
  ACCEPTED_MIME,
  MAX_BYTES,
  MAX_DURATION_LABEL,
  TRANSCODER_PATH,
} from '@/data/transcribe'

interface DropZoneProps {
  onFile: (file: File) => void
  disabled?: boolean
}

interface ValidationResult {
  ok: boolean
  reason?: 'too_large' | 'unsupported_type'
  message?: string
}

function validateFile(file: File): ValidationResult {
  if (file.size > MAX_BYTES) {
    return {
      ok: false,
      reason: 'too_large',
      message: `That file is ${formatMb(file.size)}. The limit is 100 MB.`,
    }
  }
  const lowered = file.type.toLowerCase()
  const allowedByType = (ACCEPTED_MIME as readonly string[]).includes(lowered)
  const allowedByExt = /\.(mp3|wav|m4a|flac|ogg|mp4|mov)$/i.test(file.name)
  if (!allowedByType && !allowedByExt) {
    return {
      ok: false,
      reason: 'unsupported_type',
      message: `${file.type || file.name} is not a supported audio or video format.`,
    }
  }
  return { ok: true }
}

function formatMb(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function DropZone({ onFile, disabled }: DropZoneProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setDragOver] = useState(false)
  const [error, setError] = useState<ValidationResult | null>(null)

  const handleFile = useCallback(
    (file: File) => {
      const result = validateFile(file)
      if (!result.ok) {
        setError(result)
        return
      }
      setError(null)
      onFile(file)
    },
    [onFile],
  )

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
      e.target.value = ''
    },
    [handleFile],
  )

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragOver(false)
      if (disabled) return
      const file = e.dataTransfer.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile, disabled],
  )

  const onDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (!disabled) setDragOver(true)
    },
    [disabled],
  )

  const onDragLeave = useCallback(() => setDragOver(false), [])

  const openPicker = useCallback(() => {
    if (!disabled) inputRef.current?.click()
  }, [disabled])

  return (
    <div className="flex flex-col gap-3 w-full pointer-events-auto">
      <div
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openPicker()
          }
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={[
          'flex flex-col items-center justify-center gap-3 text-center',
          'border-2 border-dashed rounded-lg',
          'p-[clamp(28px,4vw,56px)] min-h-[clamp(180px,22vw,260px)]',
          'transition-colors duration-150',
          'cursor-pointer select-none',
          isDragOver
            ? 'border-pink bg-pink/10'
            : 'border-border bg-black/20 hover:bg-black/30 hover:border-white/30',
          disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        ].join(' ')}
      >
        <span className="text-[clamp(16px,1.4vw,20px)] font-semibold text-white leading-tight">
          Drop a file here, or tap to choose
        </span>
        <span className="text-[clamp(12px,1vw,14px)] text-white/55 leading-snug max-w-[42ch]">
          Audio or video, up to 100 MB and {MAX_DURATION_LABEL}. MP3, WAV, M4A, FLAC, OGG, MP4, MOV.
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_ATTRIBUTE}
          onChange={onChange}
          className="hidden"
          aria-label="Choose an audio or video file"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="text-[clamp(13px,1vw,15px)] text-pink leading-snug"
        >
          {error.message}{' '}
          {error.reason === 'too_large' && (
            <Link to={TRANSCODER_PATH} className="underline hover:text-white">
              Use the free Nice Touch File Converter to compress it first.
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
