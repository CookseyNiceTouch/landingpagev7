import { useState, useRef, useEffect, type ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import niceTouchLogo from '@/assets/images/nice-touch-logo.png'
import { NAV_ITEMS, isNavGroup } from '@/data/navigation'
import type { NavGroup, NavLink as NavLinkData } from '@/data/navigation'
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/data/social'

function DropdownMenu({ group }: { group: NavGroup }): ReactElement {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  const show = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const hide = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return (
    <div
      ref={containerRef}
      className="header-dropdown"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        className="header-nav-link header-dropdown-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={show}
        onBlur={hide}
      >
        {group.label}
        <svg className="header-dropdown-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="header-dropdown-panel">
          {group.children.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className="header-dropdown-link"
              onClick={() => setOpen(false)}
              onFocus={show}
              onBlur={hide}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

function renderNavItem(item: NavLinkData | NavGroup): ReactElement {
  if (isNavGroup(item)) {
    return <DropdownMenu key={item.label} group={item} />
  }
  return (
    <NavLink key={item.href} to={item.href} className="header-nav-link">
      {item.label}
    </NavLink>
  )
}

export default function Header(): ReactElement {
  return (
    <header className="site-header">
      <a href="/" className="header-logo" aria-label="Nice Touch Home">
        <img src={niceTouchLogo} alt="Nice Touch" className="header-logo-image" />
      </a>

      <div className="header-actions">
        <nav className="header-nav" aria-label="Main navigation">
          {NAV_ITEMS.map(renderNavItem)}
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
