import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import PixelCard from '@/components/ui/PixelCard'
import Button from '@/components/ui/Button'
import {
  ABOUT_HERO,
  TEAM,
  NOT_LIST,
} from '@/data/about'

export default function About(): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title="About"
        description="Nice Touch is an early-stage, founder-led SaaS company building AI-powered workflow tools for professional video post-production teams."
        path="/about"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Nice Touch',
          url: 'https://nicetouch.app',
          description: ABOUT_HERO.subtitle,
        }}
      />

      <section className="content-hero">
        <FadeIn>
          <h1 className="content-hero-heading">{ABOUT_HERO.heading}</h1>
        </FadeIn>
      </section>


      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">The team</h2>
        </FadeIn>
        <div className="content-card-grid">
          {TEAM.map((member, i) => (
            <FadeIn key={member.name} delay={i * 80}>
              <PixelCard>
                <div className="pixel-card-content">
                  <div className="team-card-name">{member.name}</div>
                  <div className="team-card-role">{member.role}</div>
                  <p className="team-card-desc">{member.description}</p>
                </div>
              </PixelCard>
            </FadeIn>
          ))}
        </div>
      </section>


      <section className="content-block">
        <FadeIn>
          <h2 className="content-block-heading">What Nice Touch is not</h2>
        </FadeIn>
        <div className="content-not-list">
          {NOT_LIST.map((item, i) => (
            <FadeIn key={item} delay={i * 60}>
              <div className="content-not-item">{item}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      <FadeIn>
        <div className="content-cta">
          <p className="content-cta-text">
            Want to learn more about what Nice Touch can do?
          </p>
          <Button as="a" href="/features" variant="primary" size="lg">
            Explore Features
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
