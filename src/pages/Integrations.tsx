import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import Button from '@/components/ui/Button'
import premiereProIcon from '@/assets/images/premiere-pro-icon.png'
import davinciResolveIcon from '@/assets/images/davinci-resolve-icon.png'
import {
  INTEGRATIONS_HERO,
  INTEGRATIONS_HOW,
  INTEGRATION_CAPABILITIES,
  INTEGRATION_NLE_NOTE,
} from '@/data/integrations'

export default function Integrations(): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title="Integrations — DaVinci Resolve and Premiere Pro"
        description="Nice Touch works directly inside DaVinci Resolve and Adobe Premiere Pro. No file moving, no round-tripping — edit actions execute inside your open project in real time."
        path="/integrations"
      />

      <section className="content-hero">
        <FadeIn>
          <h1 className="content-hero-heading">{INTEGRATIONS_HERO.heading}</h1>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="content-hero-subtitle">{INTEGRATIONS_HERO.subtitle}</p>
        </FadeIn>
        <FadeIn delay={160}>
          <div className="integration-nle-row">
            <span className="integration-nle-label">Works natively inside</span>
            <div className="integration-nle-items">
              <div className="integration-nle-item">
                <img src={premiereProIcon} alt="Adobe Premiere Pro" />
                <span>Adobe Premiere Pro</span>
              </div>
              <div className="integration-nle-item">
                <img src={davinciResolveIcon} alt="DaVinci Resolve" />
                <span>DaVinci Resolve</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">{INTEGRATIONS_HOW.heading}</h2>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="content-callout">
            <p>{INTEGRATIONS_HOW.body}</p>
          </div>
        </FadeIn>
      </section>

      <section className="content-block">
        <div className="content-card-grid content-card-grid--2col">
          {INTEGRATION_CAPABILITIES.map((cap, i) => (
            <FadeIn key={cap.heading} delay={i * 80}>
              <PixelCard>
                <div className="pixel-card-content">
                  <h3 className="content-card-heading">{cap.heading}</h3>
                  <p className="content-card-body">{cap.body}</p>
                </div>
              </PixelCard>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="content-block">
        <FadeIn>
          <div className="content-callout">
            <p>{INTEGRATION_NLE_NOTE}</p>
          </div>
        </FadeIn>
      </section>

      <FadeIn>
        <div className="content-cta">
          <p className="content-cta-text">
            See all the features Nice Touch brings to your editing workflow.
          </p>
          <Button as="a" href="/features" variant="primary" size="lg">
            Explore Features
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
