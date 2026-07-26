import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import Section from '@/components/ui/Section'
import { SECTION_TITLES, FAQ_ITEMS, faqPageSchema } from '@/data/home'
import { PROMO_VIDEO, videoObjectSchema } from '@/data/press'
import HeroSection from '@/components/sections/HeroSection'
import ProofStrip from '@/components/sections/ProofStrip'
import ProblemSection from '@/components/sections/ProblemSection'
import PromoVideoSection from '@/components/sections/PromoVideoSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import PayoffSection from '@/components/sections/PayoffSection'
import CapabilitiesSection from '@/components/sections/CapabilitiesSection'
import AudienceSection from '@/components/sections/AudienceSection'
import TestimonialWall from '@/components/sections/TestimonialWall'
import PricingTeaser from '@/components/sections/PricingTeaser'
import FaqSection from '@/components/sections/FaqSection'
import SecurityBar from '@/components/sections/SecurityBar'
import ClosingCta from '@/components/sections/ClosingCta'

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
          videoObjectSchema(PROMO_VIDEO),
        ]}
      />

      {/* 1. Hook */}
      <HeroSection />

      {/* 2. Credibility, before any pitch */}
      <ProofStrip />

      {/* 3. The cost of the first pass */}
      <ProblemSection />

      {/* 4. See it move */}
      <PromoVideoSection
        video={PROMO_VIDEO}
        heading="See it in action"
        subtitle="From footage to first cut in under a minute — here's Nice Touch running inside Premiere Pro."
      />

      {/* 5. See it work, with real product screenshots */}
      <HowItWorksSection />

      {/* 6. What the editor gets back */}
      <PayoffSection />

      {/* 7. Depth, with multicam leading */}
      <CapabilitiesSection />

      {/* 8. Self-identification into the vertical pages */}
      <AudienceSection />

      {/* 9. Named proof */}
      <TestimonialWall />

      {/* 10. Shape of pricing; the decision happens on /pricing */}
      <PricingTeaser />

      {/* 11. Remaining objections */}
      <Section eyebrow="FAQ" title={SECTION_TITLES.faq} width="content">
        <FaqSection />
      </Section>

      {/* 12. Trust, then the ask */}
      <SecurityBar />
      <ClosingCta />
    </>
  )
}
