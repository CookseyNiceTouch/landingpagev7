import type { ReactElement } from 'react'
import { WORKFLOWS_CARD } from '@/data/home'
import Infocard from '@/components/ui/Infocard'
import Button from '@/components/ui/Button'

export default function WorkflowsSection(): ReactElement {
  return (
    <section className="workflows-section">
      <Infocard content={WORKFLOWS_CARD} className="content-column" />
      <div className="workflows-cta">
        <Button as="a" href="/features" variant="secondary" size="md">
          Explore all features
        </Button>
      </div>
    </section>
  )
}
