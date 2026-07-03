import type { ReactElement } from 'react'
import { MULTICAM_CARD } from '@/data/home'
import Infocard from '@/components/ui/Infocard'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import multicamIllustration from '@/assets/images/illustrations/multicam.webp'

export default function MulticamSection(): ReactElement {
  return (
    <section className="multicam-section">
      <div className="multicam-inner">
        <div className="multicam-copy">
          <Infocard content={MULTICAM_CARD} />
          <div className="multicam-cta">
            <Button as="a" href="/multicam" variant="secondary" size="md">
              Learn more about multicam
            </Button>
          </div>
        </div>
        <FadeIn className="multicam-image-col">
          <img
            src={multicamIllustration}
            alt="Nice Touch multicam editing workflow inside DaVinci Resolve and Adobe Premiere Pro"
            loading="lazy"
            className="section-illustration"
          />
        </FadeIn>
      </div>
    </section>
  )
}
