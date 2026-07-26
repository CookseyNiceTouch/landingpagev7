import { useMemo } from 'react'
import type { ReactElement } from 'react'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { SECTION_TITLES } from '@/data/home'
import { PLANS, detectCurrency, formatPrice } from '@/data/pricing'

export default function PricingTeaser(): ReactElement {
  const currency = useMemo(() => detectCurrency(), [])

  // Only the self-serve tiers; Enterprise is a footnote, not a card.
  const tiers = PLANS.filter((plan) => plan.pricing)

  return (
    <Section eyebrow="Pricing" title={SECTION_TITLES.pricing} width="content">
      <div className="pt-grid nt-grid-fade">
        {tiers.map((plan, i) => (
          <FadeIn key={plan.name} delay={i * 70}>
            <div className={`nt-card pt-card${plan.highlighted ? ' pt-card--highlighted' : ''}`}>
              <h3 className="pt-card__name">
                {plan.name}
                {plan.highlighted && <span className="pt-card__badge">Most popular</span>}
              </h3>
              <p className="pt-card__tagline">{plan.tagline}</p>
              <p className="pt-card__price">
                <span className="pt-card__amount">
                  {formatPrice(plan.pricing![currency].monthly, currency)}
                </span>
                <span className="pt-card__period">/ month</span>
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <p className="pt-footnote">
          Billed monthly or annually — annual saves roughly two months. Larger teams and higher
          volume are covered by Enterprise.
        </p>
        <div className="pt-actions">
          <Button as="a" href="/pricing/" variant="primary" size="lg">
            Compare Plans
          </Button>
          <Button as="a" href="/for-teams/" variant="secondary" size="lg">
            For Teams
          </Button>
        </div>
      </FadeIn>
    </Section>
  )
}
