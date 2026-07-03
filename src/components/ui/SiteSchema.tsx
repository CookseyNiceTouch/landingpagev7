import { Helmet } from 'react-helmet-async'
import type { ReactElement } from 'react'
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/data/social'

const BASE_URL = 'https://nicetouch.app'

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Nice Touch',
  legalName: 'Nice Touch Group Ltd',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.png`,
  email: CONTACT_EMAIL,
  description:
    'Nice Touch builds an AI edit assistant for dialogue-led video editors and post-production teams — handling the footage trawl, string-out, and first-pass rough cut inside DaVinci Resolve and Adobe Premiere Pro, while the editor keeps the creative calls.',
  sameAs: SOCIAL_LINKS.map((s) => s.href),
}

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Nice Touch',
  url: BASE_URL,
  publisher: { '@id': `${BASE_URL}/#organization` },
}

/** Site-wide Organization + WebSite JSON-LD, rendered once from the Layout. */
export default function SiteSchema(): ReactElement {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(ORGANIZATION)}</script>
      <script type="application/ld+json">{JSON.stringify(WEBSITE)}</script>
    </Helmet>
  )
}
