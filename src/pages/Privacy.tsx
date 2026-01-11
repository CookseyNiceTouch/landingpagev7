import type { ReactElement } from 'react'
import PageLayout from '../components/layout/PageLayout'
import SEOHead from '../components/shared/SEOHead'
import { content } from '../data/content'
import { seoData } from '../data/seo'

function Privacy(): ReactElement {
  const privacyContent = content.privacy
  const privacySEO = seoData.privacy

  return (
    <PageLayout>
      <SEOHead
        title={privacySEO.title}
        description={privacySEO.description}
        canonicalUrl={privacySEO.canonicalUrl}
        ogImage={privacySEO.ogImage}
      />

      <div className="legal-page container-narrow">
        {/* Hero */}
        <section className="page-hero">
          <h1 className="page-title">{privacyContent.hero.h1}</h1>
          <p className="page-description">{privacyContent.hero.description}</p>
        </section>

        {/* Content */}
        <section className="product-section legal-content">
          <p>{privacyContent.content}</p>
        </section>
      </div>
    </PageLayout>
  )
}

export default Privacy

