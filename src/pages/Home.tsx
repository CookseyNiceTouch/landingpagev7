import { useState } from 'react'
import type { ReactElement } from 'react'
import GetAppModal from '@/components/GetAppModal'
import HeroSection from '@/components/home/HeroSection'
import StepsSection from '@/components/home/StepsSection'
import CopySection from '@/components/home/CopySection'
import MulticamSection from '@/components/home/MulticamSection'
import WorkflowsSection from '@/components/home/WorkflowsSection'
import HomePricingSection from '@/components/home/HomePricingSection'

export default function Home(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <HeroSection onCtaClick={() => setIsModalOpen(true)} />
      <StepsSection />
      <CopySection />
      <MulticamSection />
      <WorkflowsSection />
      <HomePricingSection />
      <GetAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
