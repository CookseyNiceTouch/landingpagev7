import type { ReactElement } from 'react'
import section01 from '@/assets/images/Section01_Login.png'

interface HeroSectionProps {
  onCtaClick: () => void
}

export default function HeroSection({ onCtaClick }: HeroSectionProps): ReactElement {
  return (
    <section className="px-[clamp(24px,8vw,120px)] pt-[clamp(160px,22vh,280px)] pb-[clamp(40px,6vh,80px)]">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-8">
        <h1
          className="m-0 w-full max-w-[800px] font-bold font-heading leading-[0.61] tracking-[-0.04em] text-yellow text-[clamp(52px,6vw,96px)]"
          style={{ textShadow: '0 0 60px rgba(242,233,78,0.25)' }}
        >
          Assistant<br />video editor
        </h1>
        <p className="m-0 w-full max-w-[720px] font-light font-subheading leading-[1.16] tracking-[-0.04em] text-yellow text-[clamp(15px,1.3vw,20px)]">
          turns interviews, documentaries and long-form footage into structured rough cuts in minutes — inside Premiere and DaVinci
        </p>
        <button
          onClick={onCtaClick}
          className="max-w-[460px] w-full transition-transform hover:-translate-y-1 active:translate-y-0 cursor-pointer bg-transparent border-none p-0"
          aria-label="Try now"
        >
          <img src={section01} alt="Try now" className="w-full rounded-xl" />
        </button>
      </div>
    </section>
  )
}
