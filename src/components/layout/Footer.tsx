import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/data/social'
import { NAV_ITEMS, isNavGroup } from '@/data/navigation'

export default function Footer(): ReactElement {
  const year = new Date().getFullYear()

  const productLinks = NAV_ITEMS.find((item) => isNavGroup(item) && item.label === 'Product')
  const companyLinks = NAV_ITEMS.find((item) => isNavGroup(item) && item.label === 'Company')

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-brand-name">Nice Touch</span>
            <span className="footer-brand-tagline">Your AI Video Edit Assistant</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer-contact-link">
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="footer-link-columns">
            {productLinks && isNavGroup(productLinks) && (
              <div className="footer-link-column">
                <span className="footer-column-heading">Product</span>
                {productLinks.children.map((link) => (
                  <Link key={link.href} to={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
                <Link to="/pricing" className="footer-link">Pricing</Link>
                <Link to="/download" className="footer-link">Download</Link>
              </div>
            )}

            {companyLinks && isNavGroup(companyLinks) && (
              <div className="footer-link-column">
                <span className="footer-column-heading">Company</span>
                {companyLinks.children.map((link) => (
                  <Link key={link.href} to={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
                <Link to="/newsletter" className="footer-link">Newsletter</Link>
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              </div>
            )}

            <div className="footer-link-column">
              <span className="footer-column-heading">Connect</span>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          &copy; {year} Nice Touch. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
