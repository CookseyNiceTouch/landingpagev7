import type { ReactElement } from 'react'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
import { PROOF_POINTS } from '@/data/home'

export default function ProofStrip(): ReactElement {
  return (
    <Section spacing="sm" width="content" className="proof-strip">
      <FadeIn>
        {/* A single <div> wrapper per dt/dd pair is the only nesting HTML
            allows inside <dl>, so the fade wraps the whole grid rather than
            each item. */}
        <dl className="proof-strip__grid m-0">
          {PROOF_POINTS.map((point) => (
            <div className="proof-strip__item" key={point.label}>
              <dt className="proof-strip__label">{point.label}</dt>
              <dd className="proof-strip__value m-0">{point.value}</dd>
            </div>
          ))}
        </dl>
      </FadeIn>
    </Section>
  )
}
