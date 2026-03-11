import type { ReactElement } from 'react'
import { DEMO_STEPS } from '@/data/home'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import editIllustration from '@/assets/images/illustrations/edit.png'

export default function DemoSection(): ReactElement {
  return (
    <section className="demo-section">
      <FadeIn>
        <img
          src={editIllustration}
          alt=""
          className="demo-illustration"
          aria-hidden="true"
        />
      </FadeIn>
      <h2 className="type-card-heading demo-section-heading">How it works</h2>
      <div className="demo-grid">
        {DEMO_STEPS.map((step, i) => (
          <FadeIn key={step.heading} delay={i * 80}>
            <PixelCard variant="dark">
              <div className="pixel-card-content">
                <span className="demo-step-number">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="content-card-heading">{step.heading}</h3>
                <p className="content-card-body">{step.body}</p>
              </div>
            </PixelCard>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
