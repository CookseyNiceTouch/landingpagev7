import { useEffect, type ReactElement } from 'react'

interface SEOHeadProps {
  title: string
  description: string
  canonicalUrl: string
  ogImage?: string
  structuredData?: object
}

function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = '/og-default.jpg',
  structuredData,
}: SEOHeadProps): ReactElement {
  useEffect(() => {
    // Set page title
    document.title = title

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let tag = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, name)
        document.head.appendChild(tag)
      }
      
      tag.setAttribute('content', content)
    }

    // Basic meta tags
    setMetaTag('description', description)
    
    // Open Graph tags
    setMetaTag('og:title', title, true)
    setMetaTag('og:description', description, true)
    setMetaTag('og:url', `https://nicetouch.app${canonicalUrl}`, true)
    setMetaTag('og:image', `https://nicetouch.app${ogImage}`, true)
    setMetaTag('og:type', 'website', true)
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', title)
    setMetaTag('twitter:description', description)
    setMetaTag('twitter:image', `https://nicetouch.app${ogImage}`)

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', `https://nicetouch.app${canonicalUrl}`)

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]')
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.setAttribute('type', 'application/ld+json')
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(structuredData)
    }
  }, [title, description, canonicalUrl, ogImage, structuredData])

  return null
}

export default SEOHead

