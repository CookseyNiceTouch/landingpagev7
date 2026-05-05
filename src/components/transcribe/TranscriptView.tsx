import type { ReactElement } from 'react'
import type { Transcript } from '@/lib/transcript-formats'

interface TranscriptViewProps {
  transcript: Transcript
}

export default function TranscriptView({ transcript }: TranscriptViewProps): ReactElement {
  if (transcript.utterances && transcript.utterances.length > 0) {
    return (
      <div className="flex flex-col gap-4 w-full pointer-events-auto">
        {transcript.utterances.map((u, i) => (
          <div key={`${u.speaker}-${u.start}-${i}`} className="flex flex-col gap-1">
            <span className="text-[clamp(11px,0.85vw,13px)] font-semibold uppercase tracking-wider text-pink">
              Speaker {u.speaker}
            </span>
            <p className="m-0 text-[clamp(14px,1.05vw,16px)] text-white/85 leading-relaxed">
              {u.text}
            </p>
          </div>
        ))}
      </div>
    )
  }

  if (transcript.text) {
    return (
      <p className="m-0 text-[clamp(14px,1.05vw,16px)] text-white/85 leading-relaxed whitespace-pre-wrap pointer-events-auto">
        {transcript.text}
      </p>
    )
  }

  return (
    <p className="m-0 text-[clamp(14px,1.05vw,16px)] text-white/55 italic pointer-events-auto">
      No speech detected in this file.
    </p>
  )
}
