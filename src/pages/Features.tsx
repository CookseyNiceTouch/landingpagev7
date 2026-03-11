import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import Button from '@/components/ui/Button'
import { FEATURES_HERO, HOW_IT_WORKS, CORE_FEATURES } from '@/data/features'

export default function Features(): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title="Features"
        description="Explore Nice Touch capabilities: context-aware AI chat, rough cut generation, transcript analysis, timeline actions, project memory, and multicam support — all inside Premiere and Resolve."
        path="/features"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Nice Touch',
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Windows, macOS',
          description: FEATURES_HERO.subtitle,
        }}
      />

      <section className="content-hero">
        <FadeIn>
          <h1 className="content-hero-heading">{FEATURES_HERO.heading}</h1>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="content-hero-subtitle">{FEATURES_HERO.subtitle}</p>
        </FadeIn>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">How it works</h2>
        </FadeIn>
        <div className="content-card-grid content-card-grid--2col">
          {HOW_IT_WORKS.map((step, i) => (
            <FadeIn key={step.number} delay={i * 80}>
              <PixelCard>
                <div className="pixel-card-content">
                  <span className="demo-step-number">{step.number}</span>
                  <h3 className="content-card-heading">{step.heading}</h3>
                  <p className="content-card-body">{step.body}</p>
                </div>
              </PixelCard>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">Capabilities</h2>
        </FadeIn>
        <div className="content-card-grid">
          {CORE_FEATURES.map((feature, i) => (
            <FadeIn key={feature.heading} delay={i * 60}>
              <PixelCard>
                <div className="pixel-card-content">
                  <h3 className="content-card-heading">{feature.heading}</h3>
                  <p className="content-card-body">{feature.body}</p>
                </div>
              </PixelCard>
            </FadeIn>
          ))}
        </div>
      </section>

      <FadeIn>
        <div className="content-cta">
          <p className="content-cta-text">Ready to see Nice Touch in action?</p>
          <Button as="a" href="/pricing" variant="primary" size="lg">
            View Pricing
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
