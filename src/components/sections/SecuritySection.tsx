import type { ReactElement } from 'react'
import { SECURITY_CARD } from '@/data/home'
import Infocard from '@/components/ui/Infocard'
import FadeIn from '@/components/ui/FadeIn'
import securityIllustration from '@/assets/images/illustrations/security.png'

export default function SecuritySection(): ReactElement {
  return (
    <section className="security-section">
      <div className="security-inner">
        <FadeIn className="security-image-col">
          <img
            src={securityIllustration}
            alt="Security and privacy"
            className="section-illustration"
          />
        </FadeIn>
        <Infocard content={SECURITY_CARD} className="security-copy" />
      </div>
    </section>
  )
}
