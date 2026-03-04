import type { ReactElement } from 'react'
import { MULTICAM_CARD } from '@/data/home'
import Infocard from '@/components/ui/Infocard'
import multicamDevice from '@/assets/images/devices/multicam.png'

export default function MulticamSection(): ReactElement {
  return (
    <section className="multicam-section">
      <Infocard content={MULTICAM_CARD} className="content-column" />
      <img
        src={multicamDevice}
        alt="Nice Touch multicam mode — multi-angle timeline editing"
        className="multicam-device"
      />
    </section>
  )
}
