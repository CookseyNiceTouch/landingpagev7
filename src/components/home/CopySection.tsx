import type { ReactElement } from 'react'

export default function CopySection(): ReactElement {
  return (
    <section className="px-[clamp(24px,8vw,120px)] py-[clamp(64px,8vw,120px)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-[880px] mx-auto">
          <div className="flex flex-col gap-5">
            <p className="m-0 font-semibold text-white text-[clamp(16px,1.3vw,20px)]">
              Analyse. Explore. Rough Cut.
            </p>
            <p className="m-0 text-white/70 leading-relaxed text-[clamp(14px,1.1vw,17px)]">
              Nice Touch starts by understanding your footage.
            </p>
            <p className="m-0 text-white/55 leading-relaxed text-[clamp(14px,1.1vw,17px)]">
              It transcribes interviews, detects speakers, and surfaces themes across long-form conversations. Instead of scrubbing through hours of material, you can see the shape of the story immediately.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="m-0 text-white/55 leading-relaxed text-[clamp(14px,1.1vw,17px)]">
              From there, you can explore. Ask questions about topics captured in your footage and refine the direction of an edit before you commit to a timeline.
            </p>
            <p className="m-0 text-white/55 leading-relaxed text-[clamp(14px,1.1vw,17px)]">
              When you&rsquo;re ready, generate a structured first pass inside Premiere or DaVinci. Not a finished film. Not locked decisions. Just a clean, intelligent starting point.
            </p>
            <p className="m-0 text-white/70 font-medium leading-relaxed text-[clamp(14px,1.1vw,17px)]">
              The slow part is handled.<br />You stay in control.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
