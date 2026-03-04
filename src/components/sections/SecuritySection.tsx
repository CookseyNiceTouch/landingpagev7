import type { ReactElement } from 'react'
import { SECURITY_CARD } from '@/data/home'
import Infocard from '@/components/ui/Infocard'

export default function SecuritySection(): ReactElement {
  return (
    <section className="security-section">
      <Infocard content={SECURITY_CARD} />
    </section>
  )
}
