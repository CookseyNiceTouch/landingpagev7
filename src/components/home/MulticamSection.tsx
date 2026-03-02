import type { ReactElement } from 'react'
import section03 from '@/assets/images/Section03_Mulit.png'

export default function MulticamSection(): ReactElement {
  return (
    <section className="px-[clamp(24px,8vw,120px)] py-[clamp(64px,8vw,120px)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-[clamp(32px,4vw,64px)]">
        <div className="flex flex-col gap-4 max-w-3xl">
          <h2
            className="m-0 font-bold font-heading leading-[0.61] tracking-[-0.04em] text-yellow text-[clamp(36px,5vw,72px)]"
            style={{ textShadow: '0 0 40px rgba(242,233,78,0.2)' }}
          >
            Multicam footage. edit<br className="hidden md:block" /> straight to your timeline
          </h2>
          <p className="m-0 font-light font-subheading leading-[1.16] tracking-[-0.04em] text-yellow text-[clamp(16px,1.4vw,20px)]">
            Giving you back time to be more creative
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-[clamp(32px,4vw,64px)] items-start">
          <div className="flex flex-col gap-6 max-w-sm">
            <p className="m-0 font-semibold text-white text-[clamp(16px,1.3vw,20px)]">
              Multicam, without the chaos.
            </p>
            <p className="m-0 text-white/70 leading-relaxed text-[clamp(14px,1.1vw,17px)]">
              Multiple cameras. Multiple speakers. One conversation.
            </p>
            <p className="m-0 text-white/55 leading-relaxed text-[clamp(14px,1.1vw,17px)]">
              Nice Touch analyses synced multicam footage as a single narrative. It tracks who&rsquo;s speaking, identifies key moments, and builds structure across every angle.
            </p>
            <p className="m-0 text-white/55 leading-relaxed text-[clamp(14px,1.1vw,17px)]">
              Instead of watching eight timelines to find one usable beat, you start with clarity.
            </p>
            <p className="m-0 text-white/70 font-medium leading-relaxed text-[clamp(14px,1.1vw,17px)]">
              It doesn&rsquo;t replace your edit.<br />It removes the repetitive part that gets in the way of it.
            </p>
          </div>

          <img
            src={section03}
            alt="Multicam timeline device"
            className="w-full md:w-[75%] rounded-l-xl shrink-0 md:-mr-[clamp(48px,12vw,200px)]"
          />
        </div>
      </div>
    </section>
  )
}
