import type { ReactElement } from 'react'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
import { PAYOFF, SECTION_TITLES } from '@/data/home'

export default function PayoffSection(): ReactElement {
  return (
    <Section
      eyebrow={PAYOFF.eyebrow}
      title={SECTION_TITLES.payoff}
      width="content"
      className="payoff-section"
    >
      <FadeIn>
        <p className="payoff-lead">{PAYOFF.lead}</p>
      </FadeIn>

      <div className="payoff-grid nt-grid-fade">
        {PAYOFF.items.map((item, i) => (
          <FadeIn key={item.heading} delay={i * 90}>
            <div className="payoff-item">
              <h3 className="payoff-item__heading">{item.heading}</h3>
              <p className="payoff-item__body">{item.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
