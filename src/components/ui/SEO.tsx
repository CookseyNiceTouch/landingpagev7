import { Helmet } from 'react-helmet-async'
import type { ReactElement } from 'react'

const SITE_NAME = 'Nice Touch'
const BASE_URL = 'https://nicetouch.app'

interface SEOProps {
  title: string
  description: string
  path: string
  /**
   * Path under `/public` (e.g. `/og/transcribe.png`) or an absolute URL.
   * When provided, emits `og:image`, `twitter:image`, and switches the
   * Twitter card to `summary_large_image`.
   */
  image?: string
  imageAlt?: string
  /** Encourage Google to use a large image preview in SERPs. */
  largeImagePreview?: boolean
  /** Origins to preconnect (DNS + TLS handshake) for this page only. */
  preconnect?: string[]
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
}

function absoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) return value
  return `${BASE_URL}${value.startsWith('/') ? '' : '/'}${value}`
}

export default function SEO({
  title,
  description,
  path,
  image,
  imageAlt,
  largeImagePreview,
  preconnect,
  structuredData,
}: SEOProps): ReactElement {
  const fullTitle = path === '/' ? `${SITE_NAME} — Your AI Edit Assistant` : `${title} | ${SITE_NAME}`
  const url = `${BASE_URL}${path}`
  const imageUrl = image ? absoluteUrl(image) : undefined

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {largeImagePreview && (
        <meta name="robots" content="max-image-preview:large" />
      )}

      {preconnect?.map((origin) => (
        <link key={origin} rel="preconnect" href={origin} crossOrigin="" />
      ))}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      {imageUrl && (
        <meta property="og:image" content={imageUrl} />
      )}
      {imageUrl && <meta property="og:image:width" content="1200" />}
      {imageUrl && <meta property="og:image:height" content="630" />}
      {imageUrl && imageAlt && (
        <meta property="og:image:alt" content={imageAlt} />
      )}

      <meta
        name="twitter:card"
        content={imageUrl ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {imageUrl && imageAlt && (
        <meta name="twitter:image:alt" content={imageAlt} />
      )}

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
