import type { ReactElement } from 'react'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
import { DEMO_STEPS, SECTION_TITLES } from '@/data/home'
import analysisShot from '@/assets/images/productshots/analysis.png'
import cutQuestionsShot from '@/assets/images/productshots/cut-questions.png'
import generatingShot from '@/assets/images/productshots/generating.png'
import timelineShot from '@/assets/images/productshots/timeline.webp'

/** Indexed against DEMO_STEPS. `null` renders as the closing text block. */
const STEP_SHOTS: (string | null)[] = [
  analysisShot,     // 01 Analyse your footage
  cutQuestionsShot, // 02 Answer a few questions about the cut
  generatingShot,   // 03 Generate your edit
  timelineShot,     // 04 Review and refine
]

export default function HowItWorksSection(): ReactElement {
  return (
    <Section
      eyebrow="How it works"
      title={SECTION_TITLES.howItWorks}
      subtitle="It reads what you already have — the footage, the brief, the notes — then builds on it inside the NLE you're already in."
      width="content"
    >
      <div className="hiw-steps">
        {DEMO_STEPS.map((step, i) => {
          const shot = STEP_SHOTS[i]
          const number = String(i + 1).padStart(2, '0')

          if (!shot) {
            return (
              <FadeIn key={step.heading}>
                <div className="nt-card hiw-closing">
                  <span className="hiw-row__number">{number}</span>
                  <h3 className="hiw-row__heading">{step.heading}</h3>
                  <p className="hiw-row__body">{step.body}</p>
                </div>
              </FadeIn>
            )
          }

          return (
            <FadeIn key={step.heading}>
              <div className={`hiw-row${i % 2 === 1 ? ' hiw-row--reversed' : ''}`}>
                <div className="hiw-row__meta">
                  <span className="hiw-row__number">{number}</span>
                  <h3 className="hiw-row__heading">{step.heading}</h3>
                  <p className="hiw-row__body">{step.body}</p>
                </div>
                <div className="hiw-row__media">
                  <img
                    src={shot}
                    alt={`${step.heading} — Nice Touch running inside Premiere Pro and DaVinci Resolve`}
                    loading="lazy"
                    className="hiw-shot"
                  />
                </div>
              </div>
            </FadeIn>
          )
        })}
      </div>
    </Section>
  )
}
