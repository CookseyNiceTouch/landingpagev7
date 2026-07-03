import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import Button from '@/components/ui/Button'
import FaqSection from '@/components/sections/FaqSection'
import HubSpotForm from '@/components/ui/HubSpotForm'
import { OPEN_TRY_NOW } from '@/components/layout/Header'
import { faqPageSchema } from '@/data/home'
import { FOR_TEAMS_HERO, TEAM_VALUE, TEAM_FAQ, TEAM_ENQUIRY_FORM_ID } from '@/data/for-teams'

export default function ForTeams(): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title="For Teams"
        description="Team licensing for Nice Touch — the AI edit assistant for post-production teams. Consistent first passes across every editor, faster time to first cut, and pooled usage inside Premiere Pro and DaVinci Resolve. Talk to us about your team."
        path="/for-teams"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Nice Touch',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Windows, macOS',
            description:
              'AI edit assistant for post-production teams. Consistent, faster first passes across every editor inside DaVinci Resolve and Adobe Premiere Pro.',
          },
          faqPageSchema(TEAM_FAQ),
        ]}
      />

      <section className="content-hero">
        <FadeIn>
          <h1 className="content-hero-heading">{FOR_TEAMS_HERO.heading}</h1>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="content-hero-subtitle">{FOR_TEAMS_HERO.subtitle}</p>
        </FadeIn>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">Why teams bring in Nice Touch</h2>
        </FadeIn>
        <div className="content-card-grid">
          {TEAM_VALUE.map((item, i) => (
            <FadeIn key={item.heading} delay={i * 60}>
              <PixelCard>
                <div className="pixel-card-content">
                  <h3 className="content-card-heading">{item.heading}</h3>
                  <p className="content-card-body">{item.body}</p>
                </div>
              </PixelCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Enquiry form */}
      <section className="content-block" id="team-enquiry">
        <FadeIn>
          <h2 className="content-block-heading">Talk to us about your team</h2>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="content-hero-subtitle" style={{ marginBottom: '2rem' }}>
            Tell us a little about your team and how you work, and we&rsquo;ll be in touch about team licensing and getting your editors set up.
          </p>
        </FadeIn>
        <FadeIn delay={120}>
          <div className="mx-auto w-[min(640px,92%)] rounded-lg border-2 border-border bg-black/20 p-[clamp(20px,2.5vw,40px)]">
            <HubSpotForm formId={TEAM_ENQUIRY_FORM_ID} />
          </div>
        </FadeIn>
      </section>

      {/* FAQ */}
      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">Frequently asked questions</h2>
        </FadeIn>
        <FaqSection items={TEAM_FAQ} />
      </section>

      <FadeIn>
        <div className="content-cta">
          <p className="content-cta-text">Want to try it yourself first?</p>
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
