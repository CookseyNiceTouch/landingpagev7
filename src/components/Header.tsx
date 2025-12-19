import type { ReactElement } from 'react'
import niceTouchLogo from '../assets/images/nice-touch-logo.png'
import discordIcon from '../assets/icons/discord.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import youtubeIcon from '../assets/icons/youtube.svg'

function Header(): ReactElement {
  return (
    <header className="header">
      <a href="/" className="logo-link" aria-label="Nice Touch Home">
        <img src={niceTouchLogo} alt="Nice Touch" className="header-logo" />
      </a>

      <div className="header-right">
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
      </div>
    </header>
  )
}

export default Header

