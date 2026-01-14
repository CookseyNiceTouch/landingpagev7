import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import SEOHead from '../components/shared/SEOHead'
import { content } from '../data/content'
import { seoData } from '../data/seo'

function Security(): ReactElement {
  const securityContent = content.security
  const securitySEO = seoData.security

  return (
    <PageLayout>
      <SEOHead
        title={securitySEO.title}
        description={securitySEO.description}
        canonicalUrl={securitySEO.canonicalUrl}
        ogImage={securitySEO.ogImage}
      />

      <div className="security-page container-narrow">
        {/* Hero */}
        <section className="page-hero">
          <h1 className="page-title">{securityContent.hero.h1}</h1>
          <p className="page-description">{securityContent.hero.description}</p>
        </section>

        {/* What We Access */}
        <section className="product-section">
          <h2 className="section-heading">{securityContent.whatWeAccess.heading}</h2>
          <p>{securityContent.whatWeAccess.content}</p>
        </section>

        {/* What We Store */}
        <section className="product-section">
          <h2 className="section-heading">{securityContent.whatWeStore.heading}</h2>
          <p>{securityContent.whatWeStore.content}</p>
        </section>

        {/* Where Processing Happens */}
        <section className="product-section">
          <h2 className="section-heading">{securityContent.whereProcessing.heading}</h2>
          <p>{securityContent.whereProcessing.content}</p>
        </section>

        {/* Access Control */}
        <section className="product-section">
          <h2 className="section-heading">{securityContent.accessControl.heading}</h2>
          <p>{securityContent.accessControl.content}</p>
        </section>

        {/* Contact Path */}
        <section className="product-section">
          <p>{securityContent.contactPath}</p>
          <Link to="/contact" className="section-link">
            Contact us
          </Link>
        </section>
      </div>
    </PageLayout>
  )
}

export default Security



