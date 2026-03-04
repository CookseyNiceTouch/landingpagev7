import type { ReactElement } from 'react'
import { HERO } from '@/data/home'
import heroDevice from '@/assets/images/devices/try-now.png'

export default function HeroSection(): ReactElement {
  return (
    <section className="hero-section">
      <h1 className="type-display text-center">
        {HERO.headingLines.map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h1>

      <p className="type-subtitle hero-subtitle">{HERO.subtitle}</p>

      <img
        src={heroDevice}
        alt="Nice Touch app — Try Now"
        className="hero-device"
      />
    </section>
  )
}
