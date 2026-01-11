import type { ReactElement } from 'react'
import PageLayout from '../components/layout/PageLayout'
import GetAppBlock from '../components/shared/GetAppBlock'
import SEOHead from '../components/shared/SEOHead'
import { content } from '../data/content'
import { seoData } from '../data/seo'

function Pricing(): ReactElement {
  const pricingContent = content.pricing
  const pricingSEO = seoData.pricing

  return (
    <PageLayout>
      <SEOHead
        title={pricingSEO.title}
        description={pricingSEO.description}
        canonicalUrl={pricingSEO.canonicalUrl}
        ogImage={pricingSEO.ogImage}
      />

      <div className="pricing-page container-narrow">
        {/* Hero */}
        <section className="page-hero">
          <h1 className="page-title">{pricingContent.hero.h1}</h1>
          <p className="page-description">{pricingContent.hero.description}</p>
        </section>

        {/* Plans */}
        <section className="pricing-section">
          <div className="pricing-plans">
            {pricingContent.plans.map((plan, index) => (
              <div key={index} className="pricing-plan card">
                <h2 className="plan-name">{plan.name}</h2>
                <p className="plan-audience">{plan.whoFor}</p>
                <ul className="plan-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
                <button className="get-app-button plan-cta">
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="product-section faq-section">
          <h2 className="section-heading">Pricing FAQ</h2>
          <div className="faq-list">
            {pricingContent.faq.map((item, index) => (
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

export default Pricing

