import type { ReactElement } from 'react'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
import { PROBLEM, SECTION_TITLES } from '@/data/home'

interface ColumnProps {
  heading: string
  steps: readonly string[]
  variant: 'before' | 'after'
}

function Column({ heading, steps, variant }: ColumnProps): ReactElement {
  return (
    <div className={`nt-card problem-col problem-col--${variant}`}>
      <h3 className="problem-col__heading">{heading}</h3>
      <ol className="problem-list">
        {steps.map((step) => (
          <li key={step} className="problem-list__item">
            {step}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function ProblemSection(): ReactElement {
  return (
    <Section eyebrow={PROBLEM.eyebrow} title={SECTION_TITLES.problem} width="content">
      <FadeIn>
        <p className="problem-lead type-body">{PROBLEM.lead}</p>
      </FadeIn>

      <div className="problem-grid nt-grid-fade">
        <FadeIn>
          <Column heading={PROBLEM.beforeHeading} steps={PROBLEM.before} variant="before" />
        </FadeIn>
        <FadeIn delay={100}>
          <Column heading={PROBLEM.afterHeading} steps={PROBLEM.after} variant="after" />
        </FadeIn>
      </div>

      <FadeIn>
        <p className="problem-closing">{PROBLEM.closing}</p>
      </FadeIn>
    </Section>
  )
}
