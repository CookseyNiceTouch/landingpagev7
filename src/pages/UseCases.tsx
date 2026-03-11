import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import Button from '@/components/ui/Button'
import { USE_CASES_HERO, USE_CASES, BUYING_MOTION } from '@/data/use-cases'

export default function UseCases(): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title="Use Cases"
        description="Nice Touch is designed for professional post-production teams — from dedicated freelance editors to enterprise teams — wherever footage volume and workflow repetition create clear value."
        path="/use-cases"
      />

      <section className="content-hero">
        <FadeIn>
          <h1 className="content-hero-heading">{USE_CASES_HERO.heading}</h1>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="content-hero-subtitle">{USE_CASES_HERO.subtitle}</p>
        </FadeIn>
      </section>

      <section className="content-block">
        <div className="content-card-grid content-card-grid--2col">
          {USE_CASES.map((uc, i) => (
            <FadeIn key={uc.audience} delay={i * 70}>
              <PixelCard>
                <div className="pixel-card-content">
                  <h3 className="content-card-heading">{uc.audience}</h3>
                  <p className="content-card-body">{uc.description}</p>
                </div>
              </PixelCard>
            </FadeIn>
          ))}
        </div>
      </section>


      <FadeIn>
        <div className="content-cta">
          <p className="content-cta-text">
            Find the plan that fits your team.
          </p>
          <Button as="a" href="/pricing" variant="primary" size="lg">
            View Pricing
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
