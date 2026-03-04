import type { ReactElement } from 'react'
import { SECTION_TITLES } from '@/data/home'
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
      <HeroSection />
      <DemoSection />
      <SectionTitle>{SECTION_TITLES.multicam}</SectionTitle>
      <MulticamSection />
      <SectionTitle>{SECTION_TITLES.workflows}</SectionTitle>
      <WorkflowsSection />
      <SectionTitle>{SECTION_TITLES.pricing}</SectionTitle>
      <HomePricingSection />
      <FaqSection />
      <SectionTitle>{SECTION_TITLES.security}</SectionTitle>
      <SecuritySection />
    </>
  )
}
