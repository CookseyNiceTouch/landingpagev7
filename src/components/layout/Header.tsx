import { useState, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../../contexts/ModalContext'
import niceTouchLogo from '../../assets/images/nice-touch-logo.png'
import discordIcon from '../../assets/icons/discord.svg'
import linkedinIcon from '../../assets/icons/linkedin.svg'
import youtubeIcon from '../../assets/icons/youtube.svg'

function Header(): ReactElement {
  const { openGetAppModal } = useModal()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <Link to="/" className="logo-link" aria-label="Nice Touch Home">
        <img src={niceTouchLogo} alt="Nice Touch" className="header-logo" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="header-nav">
        <Link to="/product" className="nav-link">Product</Link>
        <Link to="/integrations" className="nav-link">Integrations</Link>
        <Link to="/workflows" className="nav-link">Workflows</Link>
        <Link to="/pricing" className="nav-link">Pricing</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>

      <div className="header-right">
        <button 
          onClick={openGetAppModal}
          className="get-app-button header-cta-btn"
        >
          Get the App
        </button>
        <span className="header-divider">|</span>
        <a href="mailto:cooksey@nicetouch.app" className="contact-email">
          Contact Us
        </a>
        <span className="header-divider">|</span>
        <nav className="social-icons" aria-label="Social media links">
          <a
            href="https://www.linkedin.com/company/oohnicetouch/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn"
          >
            <img src={linkedinIcon} alt="" />
          </a>
          <a
            href="https://www.youtube.com/@NiceTouch318"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="YouTube"
          >
            <img src={youtubeIcon} alt="" />
          </a>
          <a
            href="https://discord.gg/un462urQKv"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Discord"
          >
            <img src={discordIcon} alt="" />
          </a>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/product" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Product
          </Link>
          <Link to="/integrations" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Integrations
          </Link>
          <Link to="/workflows" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Workflows
          </Link>
          <Link to="/pricing" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Pricing
          </Link>
          <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          <button 
            onClick={() => {
              openGetAppModal()
              setIsMobileMenuOpen(false)
            }}
            className="get-app-button mobile-cta-btn"
          >
            Get the App
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
