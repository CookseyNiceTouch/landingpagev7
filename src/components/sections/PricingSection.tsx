import type { ReactElement } from 'react'
import pricingDevice from '@/assets/images/devices/pricing.png'

export default function PricingSection(): ReactElement {
  return (
    <section className="pricing-section">
      <img
        src={pricingDevice}
        alt="Nice Touch Pro plan — £208.33/mo, 25 hours footage processing, 250 edit generations"
        className="pricing-device"
      />
    </section>
  )
}
