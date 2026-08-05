import type { ReactElement } from 'react'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { OPEN_TRY_NOW } from '@/components/layout/Header'

interface ClosingCtaProps {
  heading?: string
  body?: string
  /** Secondary button. Pass `null` to show only the primary action. */
  secondary?: { label: string; href: string } | null
  note?: string
}

const DEFAULT_SECONDARY = { label: 'Download', href: '/download/' }

/**
 * Standard end-of-page ask. Every page should close with one — several used
 * to end on a footer with no next step at all.
 */
export default function ClosingCta({
  heading = 'Start your next edit from a rough cut.',
  body = 'Point Nice Touch at the project you already have open in Premiere Pro or DaVinci Resolve, and get the first pass out of the way.',
  secondary = DEFAULT_SECONDARY,
  note = 'Available for macOS and Windows.',
}: ClosingCtaProps = {}): ReactElement {
  return (
    <Section width="narrow" spacing="lg">
      <FadeIn>
        <div className="closing-cta">
          <h2 className="closing-cta__heading">{heading}</h2>
          <p className="closing-cta__body">{body}</p>
          <div className="closing-cta__actions">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_TRY_NOW))}
            >
              Try Free Now
            </Button>
            {secondary && (
              <Button as="a" href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
          {note && <p className="closing-cta__note">{note}</p>}
        </div>
      </FadeIn>
    </Section>
  )
}
