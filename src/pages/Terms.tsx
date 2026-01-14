import type { ReactElement } from 'react'
import PageLayout from '../components/layout/PageLayout'
import SEOHead from '../components/shared/SEOHead'
import { content } from '../data/content'
import { seoData } from '../data/seo'

function Terms(): ReactElement {
  const termsContent = content.terms
  const termsSEO = seoData.terms

  return (
    <PageLayout>
      <SEOHead
        title={termsSEO.title}
        description={termsSEO.description}
        canonicalUrl={termsSEO.canonicalUrl}
        ogImage={termsSEO.ogImage}
      />

      <div className="legal-page container-narrow">
        {/* Hero */}
        <section className="page-hero">
          <h1 className="page-title">{termsContent.hero.h1}</h1>
          <p className="page-description">{termsContent.hero.description}</p>
        </section>

        {/* Content */}
        <section className="product-section legal-content">
          <p>{termsContent.content}</p>
        </section>
      </div>
    </PageLayout>
  )
}

export default Terms



