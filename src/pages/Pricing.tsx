import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FaqSection from '@/components/sections/FaqSection'
import ClosingCta from '@/components/sections/ClosingCta'
import PricingPlanCards from '@/components/ui/PricingPlanCards'
import { PLANS, PRICING_FAQ } from '@/data/pricing'
import { faqPageSchema } from '@/data/home'

export default function Pricing(): ReactElement {
  return (
    <div className="flex-1 flex flex-col items-center gap-12 py-16 px-4 sm:px-10 lg:px-16 pointer-events-none">
      <SEO
        title="Pricing — Plans for Editors & Teams"
        description="Simple, usage-based pricing for Nice Touch. Plans for solo editors through to post-production teams — pay for the footage you run through the AI edit assistant, with monthly and annual options."
        path="/pricing"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Nice Touch',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Windows, macOS',
            url: 'https://nicetouch.app/pricing/',
            description:
              'AI-powered workflow and edit assistant for professional video teams, working inside DaVinci Resolve and Adobe Premiere Pro.',
            offers: PLANS.filter((plan) => plan.pricing).map((plan) => ({
              '@type': 'Offer',
              name: `${plan.name} (monthly)`,
              price: String(plan.pricing!.gbp.monthly),
              priceCurrency: 'GBP',
              category: 'subscription',
              url: 'https://nicetouch.app/pricing/',
            })),
          },
          faqPageSchema(PRICING_FAQ),
        ]}
      />
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="type-eyebrow">Pricing</span>
        <h1 className="type-title text-center max-w-[36rem]">
          Pay for what you use, pay less the more you create.
        </h1>
        <p className="m-0 type-body max-w-[28rem] text-center">
          Monthly or annual. Cancel any time. Add-on packs let you top up without upgrading.
        </p>
      </div>

      <PricingPlanCards enterpriseHref="/for-teams/" enterpriseLabel="Talk to us" />

      <div className="flex flex-col items-center gap-8 w-full max-w-[1360px] pointer-events-auto">
        <h2 className="m-0 text-2xl font-semibold text-white text-center">
          Frequently asked questions
        </h2>
        <FaqSection items={PRICING_FAQ} />
      </div>

      <ClosingCta
        heading="Still deciding?"
        body="Try Nice Touch on a real project first. You can pick a plan once you have seen what it does with your own footage."
        secondary={{ label: 'See Features', href: '/features/' }}
      />
    </div>
  )
}
