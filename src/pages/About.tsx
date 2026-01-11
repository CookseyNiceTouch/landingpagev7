import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import GetAppBlock from '../components/shared/GetAppBlock'
import SEOHead from '../components/shared/SEOHead'
import { content } from '../data/content'
import { seoData } from '../data/seo'

function About(): ReactElement {
  const aboutContent = content.about
  const aboutSEO = seoData.about

  return (
    <PageLayout>
      <SEOHead
        title={aboutSEO.title}
        description={aboutSEO.description}
        canonicalUrl={aboutSEO.canonicalUrl}
        ogImage={aboutSEO.ogImage}
      />

      <div className="about-page container-narrow">
        {/* Hero */}
        <section className="page-hero">
          <h1 className="page-title">{aboutContent.hero.h1}</h1>
          <p className="page-description">{aboutContent.hero.description}</p>
        </section>

        {/* Why We Built It */}
        <section className="product-section">
          <h2 className="section-heading">{aboutContent.why.heading}</h2>
          <p>{aboutContent.why.content}</p>
        </section>

        {/* Who It's For */}
        <section className="product-section">
          <h2 className="section-heading">{aboutContent.whoFor.heading}</h2>
          <p>{aboutContent.whoFor.content}</p>
        </section>

        {/* Team */}
        <section className="product-section">
          <h2 className="section-heading">{aboutContent.team.heading}</h2>
          <p>{aboutContent.team.content}</p>
        </section>

        {/* Links */}
        <section className="product-section">
          <div className="about-links">
            {aboutContent.links.map((link, index) => (
              <Link key={index} to={link.url} className="section-link">
                {link.text}
              </Link>
            ))}
          </div>
        </section>

        {/* Get App Block */}
        <GetAppBlock />
      </div>
    </PageLayout>
  )
}

export default About

