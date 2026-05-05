import type { ReactElement } from 'react'
import type { TranscribeStatus, UploadProgress } from '@/hooks/useTranscribe'

interface ProgressProps {
  status: TranscribeStatus
  upload: UploadProgress | null
  processingElapsedMs: number
  audioDuration: number | null
}

function formatMb(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function formatSeconds(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '\u2014'
  const rounded = Math.max(1, Math.round(sec))
  if (rounded < 60) return `${rounded}s`
  const m = Math.floor(rounded / 60)
  const s = rounded % 60
  if (m < 60) return s === 0 ? `${m}m` : `${m}m ${s}s`
  const h = Math.floor(m / 60)
  const mm = m % 60
  return mm === 0 ? `${h}h` : `${h}h ${mm}m`
}

/** AssemblyAI advertises ~5x realtime for Universal-2; we bias slightly slower
 *  to avoid showing aggressive ETAs that disappoint. */
const TRANSCRIBE_REALTIME_RATIO = 1 / 5

function estimateProcessingRemaining(
  audioSec: number | null,
  elapsedMs: number,
): number | null {
  if (audioSec === null || audioSec <= 0) return null
  const expectedTotalSec = audioSec * TRANSCRIBE_REALTIME_RATIO
  const remainingSec = expectedTotalSec - elapsedMs / 1000
  return Math.max(0, remainingSec)
}

export default function Progress({
  status,
  upload,
  processingElapsedMs,
  audioDuration,
}: ProgressProps): ReactElement | null {
  if (status === 'idle' || status === 'completed' || status === 'error') return null

  // ── Phase 1: uploading ────────────────────────────────────────────────────
  if (status === 'uploading' && upload) {
    const pct = Math.round(upload.fraction * 100)
    const eta = upload.etaSeconds
    return (
      <div className="flex flex-col gap-3 w-full pointer-events-auto" aria-live="polite">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[clamp(15px,1.2vw,18px)] font-semibold text-white leading-tight">
            Uploading&hellip;
          </span>
          <span className="text-[clamp(13px,1vw,15px)] font-mono text-pink tabular-nums">
            {pct}%
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          className="relative w-full h-2 rounded-full overflow-hidden bg-white/10"
        >
          <div
            className="absolute inset-y-0 left-0 bg-pink rounded-full transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between gap-3 text-[clamp(12px,0.9vw,13px)] text-white/55 tabular-nums">
          <span>
            {formatMb(upload.loaded)} of {formatMb(upload.total)}
          </span>
          <span>
            {eta === null
              ? 'Calculating\u2026'
              : eta <= 1
                ? 'Almost there\u2026'
                : `${formatSeconds(eta)} remaining`}
          </span>
        </div>
      </div>
    )
  }

  // ── Phase 2: queued (brief) ───────────────────────────────────────────────
  if (status === 'queued') {
    return (
      <div className="flex flex-col gap-3 w-full pointer-events-auto" aria-live="polite">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[clamp(15px,1.2vw,18px)] font-semibold text-white leading-tight">
            Queued for transcription&hellip;
          </span>
        </div>
        <div className="relative w-full h-2 rounded-full overflow-hidden bg-white/10">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-pink rounded-full animate-[indeterminate_1.4s_ease-in-out_infinite]" />
        </div>
        <span className="text-[clamp(12px,0.9vw,13px)] text-white/55">
          Your file is in line. We&rsquo;ll start processing in a moment.
        </span>
        <IndeterminateKeyframes />
      </div>
    )
  }

  // ── Phase 3: processing (longest phase) ────────────────────────────────────
  const elapsedSec = Math.floor(processingElapsedMs / 1000)
  const remaining = estimateProcessingRemaining(audioDuration, processingElapsedMs)
  const totalEstSec =
    audioDuration && audioDuration > 0
      ? audioDuration * TRANSCRIBE_REALTIME_RATIO
      : null
  const determinatePct =
    totalEstSec && totalEstSec > 0
      ? Math.min(98, Math.round((processingElapsedMs / 1000 / totalEstSec) * 100))
      : null

  return (
    <div className="flex flex-col gap-3 w-full pointer-events-auto" aria-live="polite">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[clamp(15px,1.2vw,18px)] font-semibold text-white leading-tight">
          Transcribing your audio&hellip;
        </span>
        {determinatePct !== null && (
          <span className="text-[clamp(13px,1vw,15px)] font-mono text-pink tabular-nums">
            {determinatePct}%
          </span>
        )}
      </div>

      {determinatePct !== null ? (
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={determinatePct}
          className="relative w-full h-2 rounded-full overflow-hidden bg-white/10"
        >
          <div
            className="absolute inset-y-0 left-0 bg-pink rounded-full transition-[width] duration-1000 ease-linear"
            style={{ width: `${determinatePct}%` }}
          />
        </div>
      ) : (
        <div className="relative w-full h-2 rounded-full overflow-hidden bg-white/10">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-pink rounded-full animate-[indeterminate_1.4s_ease-in-out_infinite]" />
        </div>
      )}

      <div className="flex items-center justify-between gap-3 text-[clamp(12px,0.9vw,13px)] text-white/55 tabular-nums">
        <span>
          {audioDuration
            ? `${formatSeconds(audioDuration)} of audio \u00b7 ${formatSeconds(elapsedSec)} elapsed`
            : `${formatSeconds(elapsedSec)} elapsed`}
        </span>
        <span>
          {remaining === null
            ? ''
            : remaining <= 1
              ? 'Wrapping up\u2026'
              : `~${formatSeconds(remaining)} remaining`}
        </span>
      </div>
      <IndeterminateKeyframes />
    </div>
  )
}

function IndeterminateKeyframes(): ReactElement {
  return (
    <style>{`
      @keyframes indeterminate {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(300%); }
      }
    `}</style>
  )
}
