import type { ReactElement } from 'react'
import { WORKFLOWS_CARD } from '@/data/home'
import Infocard from '@/components/ui/Infocard'
import workflowsDevice from '@/assets/images/devices/workflows.png'

export default function WorkflowsSection(): ReactElement {
  return (
    <section className="workflows-section">
      <img
        src={workflowsDevice}
        alt="Nice Touch workflows — corporate interviews, documentary, podcasts, social cutdowns"
        className="workflows-device"
      />
      <Infocard content={WORKFLOWS_CARD} className="content-column" />
    </section>
  )
}
