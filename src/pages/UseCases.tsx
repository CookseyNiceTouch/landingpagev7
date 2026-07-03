import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import Button from '@/components/ui/Button'
import { OPEN_TRY_NOW } from '@/components/layout/Header'
import { USE_CASES_HERO, USE_CASES} from '@/data/use-cases'

export default function UseCases(): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title="Use Cases — Who Nice Touch Is For"
        description="Who Nice Touch is for — solo freelance editors through to post houses cutting dialogue-led work: podcasts, interviews, talking heads, and documentary. Wherever footage volume and a repetitive first pass eat the time you'd rather spend on the edit."
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
            Try it on your own footage tonight, or talk to us about your team.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_TRY_NOW))}
            >
              Try Free Now
            </Button>
            <Button as="a" href="/for-teams" variant="secondary" size="lg">
              For teams
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
