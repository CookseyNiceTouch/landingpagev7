import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import IntegrationCard from '../../components/cards/IntegrationCard'
import GetAppBlock from '../../components/shared/GetAppBlock'
import SEOHead from '../../components/shared/SEOHead'
import premiereProIcon from '../../assets/images/premiere-pro-icon.png'
import davinciResolveIcon from '../../assets/images/davinci-resolve-icon.png'
import { content } from '../../data/content'
import { seoData } from '../../data/seo'
import { generateFAQSchema } from '../../utils/structuredData'

function IntegrationsHub(): ReactElement {
  const integrationsContent = content.integrations
  const integrationsSEO = seoData.integrations

  return (
    <PageLayout>
      <SEOHead
        title={integrationsSEO.title}
        description={integrationsSEO.description}
        canonicalUrl={integrationsSEO.canonicalUrl}
        ogImage={integrationsSEO.ogImage}
        structuredData={generateFAQSchema(integrationsContent.faq)}
      />

      <div className="integrations-hub-page container-narrow">
        {/* Hero */}
        <section className="page-hero">
          <h1 className="page-title">{integrationsContent.hero.h1}</h1>
          <p className="page-description">{integrationsContent.hero.description}</p>
        </section>

        {/* Integrations List */}
        <section className="integrations-list">
          <div className="integrations-grid">
            <IntegrationCard
              icon={premiereProIcon}
              title={integrationsContent.premiere.title}
              description={integrationsContent.premiere.description}
              features={integrationsContent.premiere.features}
              url={integrationsContent.premiere.url}
            />
            <IntegrationCard
              icon={davinciResolveIcon}
              title={integrationsContent.resolve.title}
              description={integrationsContent.resolve.description}
              features={integrationsContent.resolve.features}
              url={integrationsContent.resolve.url}
            />
          </div>
        </section>

        {/* General Compatibility */}
        <section className="product-section">
          <h2 className="section-heading">{integrationsContent.compatibility.heading}</h2>
          <p>{integrationsContent.compatibility.os}</p>
          <p>{integrationsContent.compatibility.access}</p>
          <Link to="/security" className="section-link">
            Security and data →
          </Link>
        </section>

        {/* FAQ */}
        <section className="product-section faq-section">
          <h2 className="section-heading">General FAQ</h2>
          <div className="faq-list">
            {integrationsContent.faq.map((item, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-question">{item.question}</summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Get App Block */}
        <GetAppBlock />
      </div>
    </PageLayout>
  )
}

export default IntegrationsHub




