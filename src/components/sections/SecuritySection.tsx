import type { ReactElement } from 'react'
import { SECURITY_CARD } from '@/data/home'
import Infocard from '@/components/ui/Infocard'
import FadeIn from '@/components/ui/FadeIn'
import securityIllustration from '@/assets/images/illustrations/security.webp'

export default function SecuritySection(): ReactElement {
  return (
    <section className="security-section">
      <div className="security-inner">
        <FadeIn className="security-image-col">
          <img
            src={securityIllustration}
            alt="Nice Touch keeps your footage private and secure during AI edit processing"
            loading="lazy"
            className="section-illustration"
          />
        </FadeIn>
        <Infocard content={SECURITY_CARD} className="security-copy" />
      </div>
    </section>
  )
}
