import { Helmet } from 'react-helmet-async'
import type { ReactElement } from 'react'

const SITE_NAME = 'Nice Touch'
const BASE_URL = 'https://nicetouch.app'

interface SEOProps {
  title: string
  description: string
  path: string
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
}

export default function SEO({ title, description, path, structuredData }: SEOProps): ReactElement {
  const fullTitle = path === '/' ? `${SITE_NAME} — Your AI Edit Assistant` : `${title} | ${SITE_NAME}`
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(
            Array.isArray(structuredData) ? structuredData : [structuredData],
          )}
        </script>
      )}
    </Helmet>
  )
}
