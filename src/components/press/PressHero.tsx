import type { ReactElement } from 'react'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import { HERO } from '@/data/press'

export default function PressHero(): ReactElement {
  return (
    <FadeIn className="flex flex-col items-center gap-5 text-center max-w-[44rem]">
      <span className="text-[clamp(11px,0.85vw,13px)] font-semibold uppercase tracking-[0.2em] text-yellow">
        {HERO.eyebrow}
      </span>
      <h1 className="m-0 text-[clamp(28px,3.5vw,52px)] font-bold text-white leading-tight tracking-tight">
        {HERO.headline}
      </h1>
      <p className="m-0 text-[clamp(14px,1.1vw,18px)] text-white/55 max-w-[36rem]">
        {HERO.subhead}
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
        <Button as="a" href={HERO.primaryCta.href} variant="primary" size="md" download>
          {HERO.primaryCta.label}
        </Button>
        <Button as="a" href={HERO.secondaryCta.href} variant="secondary" size="md">
          {HERO.secondaryCta.label}
        </Button>
      </div>
    </FadeIn>
  )
}
