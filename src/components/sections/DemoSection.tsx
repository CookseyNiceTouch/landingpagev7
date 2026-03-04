import type { ReactElement } from 'react'
import { DEMO_FEATURE } from '@/data/home'
import Infocard from '@/components/ui/Infocard'
import demoDevice from '@/assets/images/devices/demo.png'

export default function DemoSection(): ReactElement {
  return (
    <section className="demo-section">
      <div className="demo-feature-row">
        <Infocard content={DEMO_FEATURE} className="type-body demo-feature-infocard" />

        <img
          src={demoDevice}
          alt="Nice Touch demo — upload, chat, generate"
          className="demo-device"
        />
      </div>
    </section>
  )
}
