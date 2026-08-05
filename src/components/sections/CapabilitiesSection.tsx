import type { ReactElement } from 'react'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/ui/FadeIn'
import { CAPABILITIES, SECTION_TITLES } from '@/data/home'

export default function CapabilitiesSection(): ReactElement {
  return (
    <Section
      eyebrow="Capabilities"
      title={SECTION_TITLES.capabilities}
      width="content"
    >
      <div className="cap-grid nt-grid-fade">
        {CAPABILITIES.map((tile, i) => (
          <FadeIn
            key={tile.heading}
            delay={i * 60}
            className={tile.span ? `cap-grid__item--span${tile.span}` : ''}
          >
            <div className={`nt-card cap-tile${tile.feature ? ' cap-tile--feature' : ''}`}>
              <h3 className="cap-tile__heading">{tile.heading}</h3>
              <p className="cap-tile__body">{tile.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
