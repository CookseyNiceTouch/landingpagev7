import type { ReactElement } from 'react'
import { HERO } from '@/data/home'
import Button from '@/components/ui/Button'
import HeroImage from '@/components/ui/HeroImage'
import { OPEN_TRY_NOW } from '@/components/layout/Header'
import heroVideo from '@/assets/video/wl_480_15fps_crf28.mp4'
import directorPoster from '@/assets/images/illustrations/director.webp'
import premiereIcon from '@/assets/images/premiere-pro-icon.webp'
import resolveIcon from '@/assets/images/davinci-resolve-icon.webp'

export default function HeroSection(): ReactElement {
  return (
    <section className="hero-section">
      <HeroImage videoSrc={heroVideo} posterSrc={directorPoster} />

      <h1 className="type-display text-center">
        {HERO.headingLines.map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h1>

      <p className="type-subtitle hero-subtitle">{HERO.subtitle}</p>

      <div className="hero-cta-row">
        <Button
          variant="primary"
          size="lg"
          onClick={() => window.dispatchEvent(new CustomEvent(OPEN_TRY_NOW))}
        >
          Try Free Now
        </Button>
        <Button as="a" href="/pricing/" variant="secondary" size="lg">
          View Pricing
        </Button>
      </div>

      <p className="hero-trust">
        <span className="hero-trust__nle">
          <img src={premiereIcon} alt="" className="hero-trust__icon" aria-hidden="true" />
          Adobe Premiere Pro
        </span>
        <span className="hero-trust__nle">
          <img src={resolveIcon} alt="" className="hero-trust__icon" aria-hidden="true" />
          DaVinci Resolve
        </span>
        <span className="hero-trust__divider" aria-hidden="true" />
        <span>macOS &amp; Windows</span>
      </p>
    </section>
  )
}
