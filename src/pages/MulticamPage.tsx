import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import Button from '@/components/ui/Button'
import {
  MULTICAM_HERO,
  MULTICAM_CAPABILITIES,
  MULTICAM_RESULT,
} from '@/data/multicam-page'

export default function MulticamPage(): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title="Multicam Editing"
        description="Nice Touch handles the full lifecycle of multicam editing: import from Resolve and Premiere, automatic audio scoring, video coverage mapping, and timelines built directly in your NLE."
        path="/multicam"
      />

      <section className="content-hero">
        <FadeIn>
          <h1 className="content-hero-heading">{MULTICAM_HERO.heading}</h1>
        </FadeIn>
        <FadeIn delay={80}>
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
        <FadeIn>
          <div className="content-callout">
            <p>{MULTICAM_RESULT}</p>
          </div>
        </FadeIn>
      </section>

      <FadeIn>
        <div className="content-cta">
          <p className="content-cta-text">
            Multicam is available on Pro plans and above.
          </p>
          <Button as="a" href="/pricing" variant="primary" size="lg">
            View Plans
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
