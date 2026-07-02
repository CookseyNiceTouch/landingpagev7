import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import Button from '@/components/ui/Button'
import { OPEN_TRY_NOW } from '@/components/layout/Header'
import { FEATURES_HERO, HOW_IT_WORKS, CORE_FEATURES, TESTIMONIALS } from '@/data/features'
import laptopIllustration from '@/assets/images/illustrations/laptop.webp'
import projectShot from '@/assets/images/productshots/project.webp'
import analysisShot from '@/assets/images/productshots/analysis.webp'
import chatShot from '@/assets/images/productshots/chat.webp'
import timelineShot from '@/assets/images/productshots/timeline.webp'

// Map screenshots to HOW_IT_WORKS steps by index — null = no screenshot
const STEP_SCREENSHOTS: (string | null)[] = [
  projectShot,   // 01 Bring in your project context
  analysisShot,  // 02 Analyse your footage
  chatShot,      // 03 Work with the AI assistant
  timelineShot,  // 04 Review and refine
]

export default function Features(): ReactElement {
  const stepsWithShots = HOW_IT_WORKS.filter((_, i) => STEP_SCREENSHOTS[i] !== null)
  const closingStep = HOW_IT_WORKS.find((_, i) => STEP_SCREENSHOTS[i] === null)

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
          <img
            src={laptopIllustration}
            alt="Nice Touch running on a laptop"
            className="section-illustration features-hero-laptop"
          />
        </FadeIn>
        <FadeIn delay={80}>
          <h1 className="content-hero-heading">{FEATURES_HERO.heading}</h1>
        </FadeIn>
        <FadeIn delay={160}>
          <p className="content-hero-subtitle">{FEATURES_HERO.subtitle}</p>
        </FadeIn>
      </section>

      {/* ── How it works — alternating screenshot rows ── */}
      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">How it works</h2>
        </FadeIn>

        <div className="feature-steps">
          {stepsWithShots.map((step, i) => {
            const shot = STEP_SCREENSHOTS[HOW_IT_WORKS.indexOf(step)] as string
            const reversed = i % 2 === 1
            return (
              <FadeIn key={step.number}>
                <div className={`feature-step-row${reversed ? ' feature-step-row--reversed' : ''}`}>
                  <div className="feature-step-meta">
                    <span className="feature-step-number">{step.number}</span>
                    <h3 className="feature-step-heading">{step.heading}</h3>
                    <p className="feature-step-body">{step.body}</p>
                  </div>
                  <div className="feature-step-image">
                    <img
                      src={shot}
                      alt={`Nice Touch — ${step.heading}`}
                      loading="lazy"
                      className="feature-screenshot"
                    />
                  </div>
                </div>
              </FadeIn>
            )
          })}

          {/* Step 04 — no screenshot, full-width closing block */}
          {closingStep && (
            <FadeIn>
              <div className="feature-step-closing">
                <span className="feature-step-number">{closingStep.number}</span>
                <h3 className="feature-step-heading">{closingStep.heading}</h3>
                <p className="feature-step-body">{closingStep.body}</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">What people are saying</h2>
        </FadeIn>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 60}>
              <figure className="testimonial-card">
                <blockquote className="testimonial-quote">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="testimonial-author">
                  <span className="testimonial-role">{t.role}</span>
                  <span className="testimonial-company">{t.company}</span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Capabilities grid ── */}
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
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_TRY_NOW))}
            >
              Try Free Now
            </Button>
            <Button as="a" href="/pricing" variant="secondary" size="lg">
              View Pricing
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
