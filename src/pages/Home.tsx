import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import { SECTION_TITLES, FAQ_ITEMS } from '@/data/home'
import SectionTitle from '@/components/ui/SectionTitle'
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
        description="Nice Touch is an AI-powered workflow and edit assistant for professional video teams, designed to work inside DaVinci Resolve and Adobe Premiere Pro."
        path="/"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Nice Touch',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Windows, macOS',
            description:
              'AI-powered workflow and edit assistant for professional video teams.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          },
        ]}
      />
      <HeroSection />
      <DemoSection />
      <SectionTitle>{SECTION_TITLES.multicam}</SectionTitle>
      <MulticamSection />
      <SectionTitle>{SECTION_TITLES.workflows}</SectionTitle>
      <WorkflowsSection />
      <SectionTitle>{SECTION_TITLES.pricing}</SectionTitle>
      <HomePricingSection />
      <SectionTitle>{SECTION_TITLES.faq}</SectionTitle>
      <FaqSection />
      <SectionTitle>{SECTION_TITLES.security}</SectionTitle>
      <SecuritySection />
    </>
  )
}
