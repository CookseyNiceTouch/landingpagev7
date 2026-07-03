import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import Button from '@/components/ui/Button'
import FaqSection from '@/components/sections/FaqSection'
import { OPEN_TRY_NOW } from '@/components/layout/Header'
import { faqPageSchema } from '@/data/home'
import type { Vertical } from '@/data/verticals'

/** Shared template for the dialogue-led vertical landing pages. */
export default function VerticalLanding({ data }: { data: Vertical }): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        path={data.slug}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Nice Touch',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Windows, macOS',
            description: data.hero.subtitle,
          },
          faqPageSchema(data.faq),
        ]}
      />

      <section className="content-hero">
        <FadeIn>
          <h1 className="content-hero-heading">{data.hero.heading}</h1>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="content-hero-subtitle">{data.hero.subtitle}</p>
        </FadeIn>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">{data.painHeading}</h2>
        </FadeIn>
        <div className="content-prose">
          {data.pain.map((para, i) => (
            <FadeIn key={i} delay={i * 60}>
              <p className="content-prose-text">{para}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">{data.helpsHeading}</h2>
        </FadeIn>
        <div className="content-card-grid content-card-grid--2col">
          {data.helps.map((help, i) => (
            <FadeIn key={help.heading} delay={i * 60}>
              <PixelCard>
                <div className="pixel-card-content">
                  <h3 className="content-card-heading">{help.heading}</h3>
                  <p className="content-card-body">{help.body}</p>
                </div>
              </PixelCard>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">Frequently asked questions</h2>
        </FadeIn>
        <FaqSection items={data.faq} />
      </section>

      <FadeIn>
        <div className="content-cta">
          <p className="content-cta-text">See it on your own footage.</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_TRY_NOW))}
            >
              Try Free Now
            </Button>
            <Button as="a" href="/pricing" variant="secondary" size="lg">
              View Pricing
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
