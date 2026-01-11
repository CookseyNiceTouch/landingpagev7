import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import discordIcon from '../../assets/icons/discord.svg'
import linkedinIcon from '../../assets/icons/linkedin.svg'
import youtubeIcon from '../../assets/icons/youtube.svg'

function Footer(): ReactElement {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-grid">
          {/* Product Column */}
          <div className="footer-column">
            <h3 className="footer-column-title">Product</h3>
            <nav className="footer-links">
              <Link to="/product" className="footer-link">Product</Link>
              <Link to="/integrations" className="footer-link">Integrations</Link>
              <Link to="/workflows" className="footer-link">Workflows</Link>
              <Link to="/pricing" className="footer-link">Pricing</Link>
            </nav>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h3 className="footer-column-title">Company</h3>
            <nav className="footer-links">
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/security" className="footer-link">Security</Link>
            </nav>
          </div>

          {/* Legal Column */}
          <div className="footer-column">
            <h3 className="footer-column-title">Legal</h3>
            <nav className="footer-links">
              <Link to="/privacy" className="footer-link">Privacy</Link>
              <Link to="/terms" className="footer-link">Terms</Link>
            </nav>
          </div>

          {/* Social Column */}
          <div className="footer-column">
            <h3 className="footer-column-title">Connect</h3>
            <nav className="footer-social-icons">
              <a
                href="https://www.linkedin.com/company/oohnicetouch/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn"
              >
                <img src={linkedinIcon} alt="" />
              </a>
              <a
                href="https://www.youtube.com/@NiceTouch318"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="YouTube"
              >
                <img src={youtubeIcon} alt="" />
              </a>
              <a
                href="https://discord.gg/un462urQKv"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Discord"
              >
                <img src={discordIcon} alt="" />
              </a>
            </nav>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Nice Touch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

