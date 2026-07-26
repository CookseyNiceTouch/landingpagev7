import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
import { AUDIENCES, SECTION_TITLES } from '@/data/home'

export default function AudienceSection(): ReactElement {
  return (
    <Section
      eyebrow="Who it's for"
      title={SECTION_TITLES.audiences}
      subtitle="Nice Touch earns its place wherever there is more footage than time — dialogue-led work where the first pass eats the hours you would rather spend on the cut."
      width="content"
    >
      <div className="aud-grid nt-grid-fade">
        {AUDIENCES.map((audience, i) => (
          <FadeIn key={audience.label} delay={i * 60}>
            <Link to={audience.href} className="nt-card aud-card">
              <h3 className="aud-card__label">
                {audience.label}
                <svg
                  className="aud-card__arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h3>
              <p className="aud-card__body">{audience.description}</p>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
