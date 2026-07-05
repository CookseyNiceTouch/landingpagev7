import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { OPEN_TRY_NOW } from '@/components/layout/Header'
import {
  ABOUT_HERO,
  MISSION,
  VISION,
  NOT_LIST,
} from '@/data/about'

export default function About(): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title="About"
        description="Nice Touch is an early-stage, founder-led company building an AI edit assistant for dialogue-led video editors and post teams — removing the repetitive first-pass work inside Premiere Pro and DaVinci Resolve, while the editor keeps the creative calls."
        path="/about"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          url: 'https://nicetouch.app/about/',
          name: 'About Nice Touch',
          description: ABOUT_HERO.subtitle,
          mainEntity: { '@id': 'https://nicetouch.app/#organization' },
        }}
      />

      <section className="content-hero">
        <FadeIn>
          <h1 className="content-hero-heading">{ABOUT_HERO.heading}</h1>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="content-hero-subtitle">{ABOUT_HERO.subtitle}</p>
        </FadeIn>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">{MISSION.heading}</h2>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="content-callout">
            <p style={{ whiteSpace: 'pre-line' }}>{MISSION.body}</p>
          </div>
        </FadeIn>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">{VISION.heading}</h2>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="content-callout">
            <p style={{ whiteSpace: 'pre-line' }}>{VISION.body}</p>
          </div>
        </FadeIn>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">What Nice Touch is not</h2>
        </FadeIn>
        <div className="content-not-list">
          {NOT_LIST.map((item, i) => (
            <FadeIn key={item} delay={i * 60}>
              <div className="content-not-item">{item}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      <FadeIn>
        <div className="content-cta">
          <p className="content-cta-text">
            Want to learn more about what Nice Touch can do?
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_TRY_NOW))}
            >
              Try Free Now
            </Button>
            <Button as="a" href="/features/" variant="secondary" size="lg">
              Explore Features
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
