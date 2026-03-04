import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import niceTouchLogo from '@/assets/images/nice-touch-logo.png'
import { NAV_LINKS } from '@/data/navigation'
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/data/social'

export default function Header(): ReactElement {
  return (
    <header className="site-header">
      <a href="/" className="header-logo" aria-label="Nice Touch Home">
        <img src={niceTouchLogo} alt="Nice Touch" className="header-logo-image" />
      </a>

      <div className="header-actions">
        <nav className="header-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} to={link.href} className="header-nav-link">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <span className="header-divider" aria-hidden="true">|</span>

        <a href={`mailto:${CONTACT_EMAIL}`} className="header-contact-link">
          Contact Us
        </a>

        <span className="header-divider" aria-hidden="true">|</span>

        <nav className="header-social-nav" aria-label="Social media links">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="header-social-link"
              aria-label={social.label}
            >
              <img src={social.icon} alt="" className="header-social-icon" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
