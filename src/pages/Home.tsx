import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../contexts/ModalContext'
import PageLayout from '../components/layout/PageLayout'
import IntegrationCard from '../components/cards/IntegrationCard'
import WorkflowCard from '../components/cards/WorkflowCard'
import GetAppBlock from '../components/shared/GetAppBlock'
import SEOHead from '../components/shared/SEOHead'
import premiereProIcon from '../assets/images/premiere-pro-icon.png'
import davinciResolveIcon from '../assets/images/davinci-resolve-icon.png'
import { content } from '../data/content'
import { seoData } from '../data/seo'
import { generateOrganizationSchema } from '../utils/structuredData'

function Home(): ReactElement {
  const { openGetAppModal } = useModal()
  const homeContent = content.home
  const homeSEO = seoData.home

  return (
    <PageLayout className="home-page">
      <SEOHead
        title={homeSEO.title}
        description={homeSEO.description}
        canonicalUrl={homeSEO.canonicalUrl}
        ogImage={homeSEO.ogImage}
        structuredData={generateOrganizationSchema()}
      />

      {/* Hero Section */}
      <div className="hero">
        <section className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">{homeContent.hero.h1}</span>
            <span className="subtitle">{homeContent.hero.subtitle}</span>
          </h1>

          <div className="app-badges">
            <img src={premiereProIcon} alt="Adobe Premiere Pro" className="badge-icon" />
            <img src={davinciResolveIcon} alt="DaVinci Resolve" className="badge-icon" />
          </div>

          <div className="download-section">
            <button className="get-app-button" onClick={openGetAppModal}>
              Get the App
            </button>
          </div>
        </section>

        <section className="hero-media">
          <div className="media-panel">
            <iframe
              className="hero-video"
              src={homeContent.hero.videoUrl}
              title="Nice Touch Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              allowFullScreen
            />
          </div>
        </section>
      </div>

      {/* Main Content Sections */}
      <div className="home-sections">
        {/* Integrations Preview */}
        <section className="home-section integrations-preview container">
          <h2 className="section-heading">{homeContent.integrationsPreview.heading}</h2>
          <div className="integrations-grid">
            <IntegrationCard
              icon={premiereProIcon}
              title={homeContent.integrationsPreview.premiere.title}
              description={homeContent.integrationsPreview.premiere.description}
              features={['Native panel integration', 'Timeline-aware suggestions', 'Keyboard shortcut support']}
              url={homeContent.integrationsPreview.premiere.url}
            />
            <IntegrationCard
              icon={davinciResolveIcon}
              title={homeContent.integrationsPreview.resolve.title}
              description={homeContent.integrationsPreview.resolve.description}
              features={['Fusion and edit page support', 'Color-aware workflows', 'Marker-based annotations']}
              url={homeContent.integrationsPreview.resolve.url}
            />
          </div>
          <Link to="/integrations" className="section-link">
            View all integrations →
          </Link>
        </section>

        {/* Workflows Preview */}
        <section className="home-section workflows-preview container">
          <h2 className="section-heading">{homeContent.workflowsPreview.heading}</h2>
          <div className="workflows-grid">
            {content.workflows.cards.map((workflow, index) => (
              <WorkflowCard
                key={index}
                title={workflow.title}
                targetAudience={workflow.targetAudience}
                outcome={workflow.outcome}
                features={workflow.features}
                url={workflow.url}
              />
            ))}
          </div>
          <Link to="/workflows" className="section-link">
            {homeContent.workflowsPreview.linkText} →
          </Link>
        </section>

        {/* How It Works */}
        <section className="home-section how-it-works container">
          <h2 className="section-heading">{homeContent.howItWorks.heading}</h2>
          <div className="how-it-works-steps">
            {homeContent.howItWorks.steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{index + 1}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
          <Link to="/product" className="section-link">
            How Nice Touch works →
          </Link>
        </section>

        {/* Who It Is For */}
        <section className="home-section who-for container">
          <h2 className="section-heading">{homeContent.whoItIsFor.heading}</h2>
          <div className="who-for-grid">
            <Link to={homeContent.whoItIsFor.editors.url} className="who-for-card card">
              <h3 className="who-for-title">{homeContent.whoItIsFor.editors.title}</h3>
              <p className="who-for-description">{homeContent.whoItIsFor.editors.description}</p>
            </Link>
            <Link to={homeContent.whoItIsFor.teams.url} className="who-for-card card">
              <h3 className="who-for-title">{homeContent.whoItIsFor.teams.title}</h3>
              <p className="who-for-description">{homeContent.whoItIsFor.teams.description}</p>
            </Link>
          </div>
        </section>

        {/* Trust Block */}
        <section className="home-section trust-block container">
          <h2 className="section-heading">{homeContent.trust.heading}</h2>
          <p className="trust-description">{homeContent.trust.description}</p>
          <div className="trust-links">
            {homeContent.trust.links.map((link, index) => (
              <Link key={index} to={link.url} className="trust-link">
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

export default Home
