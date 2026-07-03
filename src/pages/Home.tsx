import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import { SECTION_TITLES, FAQ_ITEMS, faqPageSchema } from '@/data/home'
import { TESTIMONIALS } from '@/data/features'
import SectionTitle from '@/components/ui/SectionTitle'
import FadeIn from '@/components/ui/FadeIn'
import HeroSection from '@/components/sections/HeroSection'
import DemoSection from '@/components/sections/DemoSection'
import MulticamSection from '@/components/sections/MulticamSection'
import WorkflowsSection from '@/components/sections/WorkflowsSection'
import HomePricingSection from '@/components/sections/HomePricingSection'
import FaqSection from '@/components/sections/FaqSection'
import SecuritySection from '@/components/sections/SecuritySection'

export default function Home(): ReactElement {
  return (
    <>
      <SEO
        title="Nice Touch"
        description="Not every part of the edit needs an editor. Nice Touch knows which parts do — handling the footage trawl, string-out, and first-pass rough cut inside Adobe Premiere Pro and DaVinci Resolve, so you spend your time on the creative decisions."
        path="/"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Nice Touch',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Windows, macOS',
            description:
              'AI edit assistant for dialogue-led video editors. Handles the footage trawl, string-out, and first-pass rough cut inside Adobe Premiere Pro and DaVinci Resolve, leaving the creative decisions to the editor.',
          },
          faqPageSchema(FAQ_ITEMS),
        ]}
      />
      <HeroSection />
      <DemoSection />

      {/* Quote: first port of call / project knowledge */}
      <FadeIn className="flex justify-center">
        <figure className="home-quote">
          <span className="home-quote__mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="home-quote__text">
            {TESTIMONIALS[1].quote}
          </blockquote>
          <figcaption className="home-quote__footer">
            <span className="home-quote__role">{TESTIMONIALS[1].role}</span>
            <span className="home-quote__company">{TESTIMONIALS[1].company}</span>
          </figcaption>
        </figure>
      </FadeIn>

      <SectionTitle>{SECTION_TITLES.multicam}</SectionTitle>
      <MulticamSection />
      <SectionTitle>{SECTION_TITLES.workflows}</SectionTitle>
      <WorkflowsSection />

      {/* Quote: hours of footage / manual review */}
      <FadeIn className="flex justify-center">
        <figure className="home-quote">
          <span className="home-quote__mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="home-quote__text">
            {TESTIMONIALS[0].quote}
          </blockquote>
          <figcaption className="home-quote__footer">
            <span className="home-quote__role">{TESTIMONIALS[0].role}</span>
            <span className="home-quote__company">{TESTIMONIALS[0].company}</span>
          </figcaption>
        </figure>
      </FadeIn>
      <SectionTitle>{SECTION_TITLES.pricing}</SectionTitle>
      <HomePricingSection />
      <SectionTitle>{SECTION_TITLES.faq}</SectionTitle>
      <FaqSection />
      <SectionTitle>{SECTION_TITLES.security}</SectionTitle>
      <SecuritySection />
    </>
  )
}
