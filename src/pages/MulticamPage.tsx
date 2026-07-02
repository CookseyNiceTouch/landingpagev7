import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import Button from '@/components/ui/Button'
import FaqSection from '@/components/sections/FaqSection'
import { OPEN_TRY_NOW } from '@/components/layout/Header'
import multicam2Illustration from '@/assets/images/illustrations/multicam2.webp'
import {
  MULTICAM_HERO,
  MULTICAM_CAPABILITIES,
  MULTICAM_PAIN_QUOTES,
  MULTICAM_FAQ,
} from '@/data/multicam-page'
import { faqPageSchema } from '@/data/home'

export default function MulticamPage(): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title="Multicam Editing"
        description="Nice Touch handles the full lifecycle of multicam editing: import from Resolve and Premiere, automatic audio scoring, video coverage mapping, and timelines built directly in your NLE."
        path="/multicam"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Nice Touch',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Windows, macOS',
            description: MULTICAM_HERO.subtitle,
          },
          faqPageSchema(MULTICAM_FAQ),
        ]}
      />

      <section className="content-hero">
        <FadeIn>
          <img
            src={multicam2Illustration}
            alt="Multicam editing with Nice Touch"
            className="section-illustration features-hero-laptop"
          />
        </FadeIn>
        <FadeIn delay={80}>
          <h1 className="content-hero-heading">{MULTICAM_HERO.heading}</h1>
        </FadeIn>
        <FadeIn delay={160}>
          <p className="content-hero-subtitle">{MULTICAM_HERO.subtitle}</p>
        </FadeIn>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">What multicam in Nice Touch covers</h2>
        </FadeIn>
        <div className="content-card-grid">
          {MULTICAM_CAPABILITIES.map((cap, i) => (
            <FadeIn key={cap.heading} delay={i * 70}>
              <PixelCard>
                <div className="pixel-card-content">
                  <h3 className="content-card-heading">{cap.heading}</h3>
                  <p className="content-card-body">{cap.body}</p>
                </div>
              </PixelCard>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="content-block">
        <div className="testimonials-grid">
          {MULTICAM_PAIN_QUOTES.map((q, i) => (
            <FadeIn key={i} delay={i * 80}>
              <figure className="testimonial-card">
                <blockquote className="testimonial-quote">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="testimonial-author">
                  <span className="testimonial-role">{q.role}</span>
                  <span className="testimonial-company">{q.company}</span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">Frequently asked questions</h2>
        </FadeIn>
        <FaqSection items={MULTICAM_FAQ} />
      </section>

      <FadeIn>
        <div className="content-cta">
          <p className="content-cta-text">
            Multicam is available on Pro plans and above.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_TRY_NOW))}
            >
              Try Free Now
            </Button>
            <Button as="a" href="/pricing" variant="secondary" size="lg">
              View Plans
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
