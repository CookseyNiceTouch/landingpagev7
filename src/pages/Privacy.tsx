import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { PRIVACY_HERO, PRIVACY_SECTIONS, PRIVACY_CONTACT } from '@/data/privacy'

export default function Privacy(): ReactElement {
  return (
    <div className="content-page">
      <SEO
        title="Privacy Policy"
        description="Nice Touch Group Ltd privacy policy. Explains how we collect, use, and protect your personal data in compliance with UK GDPR."
        path="/privacy"
      />

      <section className="content-hero">
        <FadeIn>
          <h1 className="content-hero-heading">{PRIVACY_HERO.heading}</h1>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="content-hero-subtitle">{PRIVACY_HERO.subtitle}</p>
        </FadeIn>
        <FadeIn delay={120}>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
            {PRIVACY_HERO.updated}
          </p>
        </FadeIn>
      </section>

      <section className="content-block" style={{ maxWidth: '52rem' }}>
        {PRIVACY_SECTIONS.map((section, i) => (
          <FadeIn key={section.heading} delay={i * 40}>
            <div style={{ marginBottom: '3rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  letterSpacing: '-0.01em',
                  color: 'var(--color-yellow)',
                  marginBottom: '0.875rem',
                }}
              >
                {section.heading}
              </h2>

              {section.body && (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.55)',
                    marginBottom: section.items ? '0.875rem' : 0,
                  }}
                >
                  {section.body}
                </p>
              )}

              {section.items && (
                <ul className="content-capability-list">
                  {section.items.map((item) => (
                    <li key={item} className="content-capability-item">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.rows && (
                <div className="tech-table" style={{ marginTop: '1rem' }}>
                  {section.rows.map((row) => (
                    <div key={row.label} className="tech-row">
                      <span className="tech-label">{row.label}</span>
                      <span className="tech-value">{row.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </section>

      <FadeIn>
        <div
          className="content-cta"
          style={{ paddingBlock: '1rem 5rem', pointerEvents: 'auto' }}
        >
          <div
            className="content-callout"
            style={{ maxWidth: '52rem', width: '100%', textAlign: 'left' }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--color-yellow)', marginBottom: '0.5rem', fontSize: '0.875rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {PRIVACY_CONTACT.heading}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', marginBottom: '1.25rem' }}>
              {PRIVACY_CONTACT.body}
            </p>
            <Button
              as="a"
              href={PRIVACY_CONTACT.requestFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="md"
            >
              {PRIVACY_CONTACT.requestFormLabel}
            </Button>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.35)', marginTop: '1.5rem' }}>
              {PRIVACY_CONTACT.ico}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.75rem' }}>
              {PRIVACY_CONTACT.company} &mdash; {PRIVACY_CONTACT.registration}
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
