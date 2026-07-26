import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
import { SECURITY_POINTS, SECTION_TITLES } from '@/data/home'

export default function SecurityBar(): ReactElement {
  return (
    <Section
      eyebrow="Security"
      title={SECTION_TITLES.security}
      width="content"
      spacing="md"
      className="sec-bar"
    >
      <div className="sec-bar__grid nt-grid-fade">
        {SECURITY_POINTS.map((point, i) => (
          <FadeIn key={point.heading} delay={i * 70}>
            <div className="sec-bar__item">
              <h3 className="sec-bar__heading">
                <svg
                  className="sec-bar__check"
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8.5l3.5 3.5L13 5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {point.heading}
              </h3>
              <p className="sec-bar__body">{point.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <Link to="/security/" className="sec-bar__link">
          Read how we handle your footage
        </Link>
      </FadeIn>
    </Section>
  )
}
