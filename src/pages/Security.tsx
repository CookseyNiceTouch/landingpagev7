import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import Button from '@/components/ui/Button'
import { SECURITY_HERO, SECURITY_POINTS, TECH_OVERVIEW } from '@/data/security'

export default function Security(): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title="Security and Privacy"
        description="Nice Touch processes footage in isolated environments, encrypts all data in transit and at rest, and never uses customer content for model training. Built for teams handling sensitive, pre-release material."
        path="/security"
      />

      <section className="content-hero">
        <FadeIn>
          <h1 className="content-hero-heading">{SECURITY_HERO.heading}</h1>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="content-hero-subtitle">{SECURITY_HERO.subtitle}</p>
        </FadeIn>
      </section>

      <section className="content-block">
        <div className="content-card-grid content-card-grid--2col">
          {SECURITY_POINTS.map((point, i) => (
            <FadeIn key={point.heading} delay={i * 70}>
              <PixelCard>
                <div className="pixel-card-content">
                  <h3 className="content-card-heading">{point.heading}</h3>
                  <p className="content-card-body">{point.body}</p>
                </div>
              </PixelCard>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">{TECH_OVERVIEW.heading}</h2>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="tech-table">
            {TECH_OVERVIEW.items.map((item) => (
              <div key={item.label} className="tech-row">
                <span className="tech-label">{item.label}</span>
                <span className="tech-value">{item.value}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <FadeIn>
        <div className="content-cta">
          <p className="content-cta-text">
            Questions about security or compliance? Get in touch.
          </p>
          <Button as="a" href="mailto:contact@nicetouch.app" variant="primary" size="lg">
            Contact Us
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
