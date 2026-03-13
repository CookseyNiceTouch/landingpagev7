import type { ReactElement } from 'react'
import { WORKFLOWS_CARD } from '@/data/home'
import Infocard from '@/components/ui/Infocard'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import tapesIllustration from '@/assets/images/illustrations/tapes.png'

export default function WorkflowsSection(): ReactElement {
  return (
    <section className="workflows-section">
      <div className="workflows-inner">
        <FadeIn className="workflows-image-col">
          <img
            src={tapesIllustration}
            alt="Stacked memory cards representing large media volumes"
            className="section-illustration workflows-illustration"
          />
        </FadeIn>
        <div className="workflows-copy">
          <Infocard content={WORKFLOWS_CARD} />
          <div className="workflows-cta">
            <Button as="a" href="/features" variant="secondary" size="md">
              Explore all features
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
