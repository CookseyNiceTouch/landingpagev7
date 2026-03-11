import type { ReactElement } from 'react'
import { HERO } from '@/data/home'
import Button from '@/components/ui/Button'
import HeroImage from '@/components/ui/HeroImage'
import directorIllustration from '@/assets/images/illustrations/director.png'

export default function HeroSection(): ReactElement {
  return (
    <section className="hero-section">
      <HeroImage src={directorIllustration} />

      <h1 className="type-display text-center">
        {HERO.headingLines.map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h1>

      <p className="type-subtitle hero-subtitle">{HERO.subtitle}</p>

      <div className="hero-cta-row">
        <Button as="a" href="/features" variant="primary" size="lg">
          See How It Works
        </Button>
        <Button as="a" href="/pricing" variant="secondary" size="lg">
          View Pricing
        </Button>
      </div>
    </section>
  )
}
