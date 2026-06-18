import { useState, useRef, useEffect, useCallback, type ReactElement } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import niceTouchLogo from '@/assets/images/nice-touch-logo.webp'
import { NAV_ITEMS, isNavGroup } from '@/data/navigation'
import type { NavGroup, NavLink as NavLinkData } from '@/data/navigation'
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/data/social'
import TryNowModal from '@/components/ui/TryNowModal'

export const OPEN_TRY_NOW = 'open-try-now-modal'

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

function MobileNav({ isOpen, onClose, onTryNow }: { isOpen: boolean; onClose: () => void; onTryNow: () => void }): ReactElement | null {
  const location = useLocation()

  useEffect(() => { onClose() }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <div className={`mobile-nav-overlay ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {NAV_ITEMS.map((item) => {
          if (isNavGroup(item)) {
            return (
              <div key={item.label} className="mobile-nav-group">
                <span className="mobile-nav-group-label">{item.label}</span>
                {item.children.map((link) => (
                  <NavLink key={link.href} to={link.href} className="mobile-nav-link" onClick={onClose}>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )
          }
          return (
            <NavLink key={item.href} to={item.href} className="mobile-nav-link" onClick={onClose}>
              {item.label}
            </NavLink>
          )
        })}

        <div className="mobile-nav-divider" />

        <button
          className="mobile-nav-try-now"
          onClick={() => { onClose(); onTryNow() }}
        >
          Try Free Now
        </button>

        <a href={`mailto:${CONTACT_EMAIL}`} className="mobile-nav-link" onClick={onClose}>
          Contact Us
        </a>
      </nav>
    </div>
  )
}

export default function Header(): ReactElement {
  const [modalOpen, setModalOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const handler = () => setModalOpen(true)
    window.addEventListener(OPEN_TRY_NOW, handler)
    return () => window.removeEventListener(OPEN_TRY_NOW, handler)
  }, [])

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), [])

  return (
    <>
      <header className="site-header">
        <a href="/" className="header-logo" aria-label="Nice Touch Home">
          <img src={niceTouchLogo} alt="Nice Touch" className="header-logo-image" />
        </a>

        <div className="header-actions">
          <nav className="header-nav" aria-label="Main navigation">
            {NAV_ITEMS.map(renderNavItem)}
          </nav>

          <span className="header-divider" aria-hidden="true">|</span>

          <button
            className="header-try-now-btn"
            onClick={() => setModalOpen(true)}
          >
            Try Free Now
          </button>

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

          {/* Hamburger — visible below 768px */}
          <button
            className="header-hamburger"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            <span className={`hamburger-line ${mobileNavOpen ? 'is-open' : ''}`} />
            <span className={`hamburger-line ${mobileNavOpen ? 'is-open' : ''}`} />
            <span className={`hamburger-line ${mobileNavOpen ? 'is-open' : ''}`} />
          </button>
        </div>
      </header>

      <MobileNav
        isOpen={mobileNavOpen}
        onClose={closeMobileNav}
        onTryNow={() => setModalOpen(true)}
      />

      <TryNowModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
