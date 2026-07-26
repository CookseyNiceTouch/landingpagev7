import type { ReactElement } from 'react'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
import { SECTION_TITLES } from '@/data/home'
import { CUSTOMER_QUOTES } from '@/data/press'

export default function TestimonialWall(): ReactElement {
  return (
    <Section eyebrow="Proof" title={SECTION_TITLES.testimonials} width="content">
      <div className="tw-grid nt-grid-fade">
        {CUSTOMER_QUOTES.map((quote, i) => (
          <FadeIn key={quote.attribution} delay={i * 80}>
            <figure className="nt-card tw-card m-0">
              <span className="tw-card__mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="tw-card__quote">{quote.quote}</blockquote>
              <figcaption className="tw-card__footer">
                <span className="tw-card__name">{quote.attribution}</span>
                <span className="tw-card__role">{quote.role}</span>
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
