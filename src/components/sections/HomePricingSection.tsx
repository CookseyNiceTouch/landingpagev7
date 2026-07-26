import type { ReactElement } from 'react'
import PricingPlanCards from '@/components/ui/PricingPlanCards'

export default function HomePricingSection(): ReactElement {
  return (
    <section className="home-pricing-section">
      <PricingPlanCards
        enterpriseHref="mailto:cooksey@nicetouch.app"
        enterpriseLabel="Contact Us"
      />
    </section>
  )
}
