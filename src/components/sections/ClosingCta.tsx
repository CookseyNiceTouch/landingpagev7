import type { ReactElement } from 'react'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { OPEN_TRY_NOW } from '@/components/layout/Header'

export default function ClosingCta(): ReactElement {
  return (
    <Section width="narrow" spacing="lg">
      <FadeIn>
        <div className="closing-cta">
          <h2 className="closing-cta__heading">Start your next edit from a rough cut.</h2>
          <p className="closing-cta__body">
            Point Nice Touch at the project you already have open in Premiere Pro or DaVinci
            Resolve, and get the first pass out of the way.
          </p>
          <div className="closing-cta__actions">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_TRY_NOW))}
            >
              Try Free Now
            </Button>
            <Button as="a" href="/download/" variant="secondary" size="lg">
              Download
            </Button>
          </div>
          <p className="closing-cta__note">Available for macOS and Windows.</p>
        </div>
      </FadeIn>
    </Section>
  )
}
