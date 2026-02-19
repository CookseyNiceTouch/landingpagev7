import { useEffect } from 'react'
import type { ReactElement } from 'react'
import Header from '../components/Header'

function Pricing(): ReactElement {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/pricing-table.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="pricing-page">
      <Header />
      <main className="pricing-main">
        <div className="pricing-table-wrapper">
          <stripe-pricing-table
            pricing-table-id="prctbl_1T2YQnGKqHXhKBbWIpCJHcIO"
            publishable-key="pk_live_51R9jQbGKqHXhKBbWNbSwhq5LlNaV3e3N8uEDwyJA7C2yW6eb26kXXGpYSzRxBV6RUOIFpowS9U7zMLTQdXhrX25R00ddkRjM1U"
            default-selected-interval="year"
          />
        </div>
      </main>
    </div>
  )
}

export default Pricing
