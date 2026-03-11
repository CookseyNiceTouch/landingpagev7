import type { ReactElement } from 'react'
import { MULTICAM_CARD } from '@/data/home'
import Infocard from '@/components/ui/Infocard'
import Button from '@/components/ui/Button'

export default function MulticamSection(): ReactElement {
  return (
    <section className="multicam-section">
      <Infocard content={MULTICAM_CARD} className="content-column" />
      <div className="multicam-cta">
        <Button as="a" href="/multicam" variant="secondary" size="md">
          Learn more about multicam
        </Button>
      </div>
    </section>
  )
}
