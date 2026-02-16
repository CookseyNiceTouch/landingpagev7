import { useState, type ReactElement, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import SEOHead from '../components/shared/SEOHead'
import { content } from '../data/content'
import { seoData } from '../data/seo'

function Contact(): ReactElement {
  const contactContent = content.contact
  const contactSEO = seoData.contact
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Form submission would be handled here
    console.log('Form submitted:', formState)
  }

  return (
    <PageLayout>
      <SEOHead
        title={contactSEO.title}
        description={contactSEO.description}
        canonicalUrl={contactSEO.canonicalUrl}
        ogImage={contactSEO.ogImage}
      />

      <div className="contact-page container-narrow">
        {/* Hero */}
        <section className="page-hero">
          <h1 className="page-title">{contactContent.hero.h1}</h1>
          <p className="page-description">{contactContent.hero.description}</p>
        </section>

        {/* Direct Email */}
        <section className="product-section">
          <p className="contact-email-display">
            Email us directly at{' '}
            <a href={`mailto:${contactContent.email}`} className="email-link">
              {contactContent.email}
            </a>
          </p>
        </section>

        {/* Contact Form */}
        <section className="product-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
                rows={6}
              />
            </div>

            <button type="submit" className="form-submit">
              Send Message
            </button>
          </form>
        </section>

        {/* Expectations */}
        <section className="product-section">
          <p className="contact-expectations">{contactContent.expectations}</p>
          <p>
            {contactContent.securityNote}{' '}
            <Link to="/security" className="inline-link">
              Visit our security page
            </Link>
            .
          </p>
        </section>
      </div>
    </PageLayout>
  )
}

export default Contact




