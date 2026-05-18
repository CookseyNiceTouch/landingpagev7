import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import Container from '@/components/ui/Container'
import FadeIn from '@/components/ui/FadeIn'
import PressHero from '@/components/press/PressHero'
import PressVideo from '@/components/press/PressVideo'
import ProductShots from '@/components/press/ProductShots'
import PressReleaseBlock from '@/components/press/PressReleaseBlock'
import PullQuote from '@/components/press/PullQuote'
import Factsheet from '@/components/press/Factsheet'
import GalleryGrid from '@/components/press/GalleryGrid'
import AboutBlock from '@/components/press/AboutBlock'
import CoverageGrid from '@/components/press/CoverageGrid'
import PressContact from '@/components/press/PressContact'
import TodoPlaceholder from '@/components/press/TodoPlaceholder'
import { PULL_QUOTES } from '@/data/press'

export default function Press(): ReactElement {
  return (
    <div className="flex-1 flex flex-col items-center gap-[clamp(40px,5vw,72px)] p-[clamp(24px,4vw,96px)] px-4 sm:px-10 pointer-events-none">
      <SEO
        title="Press Kit"
        description="Press kit for Nice Touch V2 — press release, factsheet, hi-res imagery, founder bios and B-roll. The AI edit assistant for professional video post-production teams."
        path="/press"
      />

      <PressHero />

      <Container size="lg">
        <div className="flex flex-col gap-[clamp(40px,5vw,72px)]">
          <PressVideo />

          <ProductShots />

          <PressReleaseBlock />

          <FadeIn className="w-full">
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">
                  Pull quotes
                </h2>
                <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/55">
                  Sized for clean screenshots. Use either as-is.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(12px,1.5vw,20px)]">
                <PullQuote quote={PULL_QUOTES.founder} accent="pink" />
                {PULL_QUOTES.customer ? (
                  <PullQuote quote={PULL_QUOTES.customer} accent="yellow" />
                ) : (
                  <TodoPlaceholder label="Customer pull quote">
                    Pulls from{' '}
                    <code className="font-mono text-yellow">PRESS_RELEASE.customerQuote</code> once
                    set in <code className="font-mono text-yellow">src/data/press.ts</code>.
                  </TodoPlaceholder>
                )}
              </div>
            </section>
          </FadeIn>

          <Factsheet />

          <GalleryGrid />

          <AboutBlock />

          <CoverageGrid />

          <PressContact />
        </div>
      </Container>
    </div>
  )
}
