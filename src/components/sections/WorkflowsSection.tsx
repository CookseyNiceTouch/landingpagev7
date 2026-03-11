import type { ReactElement } from 'react'
import { WORKFLOWS_CARD } from '@/data/home'
import Infocard from '@/components/ui/Infocard'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import tapesIllustration from '@/assets/images/illustrations/tapes.png'

export default function WorkflowsSection(): ReactElement {
  return (
    <section className="workflows-section">
      <FadeIn>
        <img
          src={tapesIllustration}
          alt=""
          className="section-illustration workflows-illustration"
          aria-hidden="true"
        />
      </FadeIn>
      <Infocard content={WORKFLOWS_CARD} className="content-column" />
      <div className="workflows-cta">
        <Button as="a" href="/features" variant="secondary" size="md">
          Explore all features
        </Button>
      </div>
    </section>
  )
}
