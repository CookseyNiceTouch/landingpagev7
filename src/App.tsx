import { useEffect, useState } from 'react'
import './App.css'
import LiquidEther from './backgrounds/LiquidEther'

// Icons
import discordIcon from './assets/icons/discord.svg'
import linkedinIcon from './assets/icons/linkedin.svg'
import youtubeIcon from './assets/icons/youtube.svg'
import appleIcon from './assets/icons/apple.svg'
import windowsIcon from './assets/icons/windows.svg'

// Images
import niceTouchLogo from './assets/images/nice-touch-logo.png'
import premiereProIcon from './assets/images/premiere-pro-icon.png'
import davinciResolveIcon from './assets/images/davinci-resolve-icon.png'

// Release data types
interface PlatformRelease {
  platform: string
  latestVersion: string
  minSupportedVersion: string
  releaseNotesUrl: string
  downloadUrl: string
}

interface ReleasesData {
  win: PlatformRelease
  mac: PlatformRelease
  linux: PlatformRelease
}

const RELEASES_URL = 'https://raw.githubusercontent.com/CookseyNiceTouch/nice-touch-app-releases/main/nice-touch-releases.json'

function App() {
  const [releases, setReleases] = useState<ReleasesData | null>(null)

  useEffect(() => {
    fetch(RELEASES_URL)
      .then(res => res.json())
      .then((data: ReleasesData) => setReleases(data))
      .catch(err => console.error('Failed to fetch releases:', err))
  }, [])

  const macDownloadUrl = releases?.mac?.downloadUrl || '#'
  const winDownloadUrl = releases?.win?.downloadUrl || '#'

  return (
    <div className="landing-page">
      {/* Background */}
      <LiquidEther
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Header */}
      <header className="header">
        <a href="/" className="logo-link" aria-label="Nice Touch Home">
          <img
            src={niceTouchLogo}
            alt="Nice Touch"
            className="header-logo"
          />
        </a>

        <div className="header-right">
          <a href="mailto:contact@nicetouch.app" className="contact-email">
            contact@nicetouch.app
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

      {/* Hero Section */}
      <main className="hero">
        <section className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Nice Touch</span>
            <span className="subtitle">Your Always Available AI Video Edit Assistant</span>
          </h1>

          {/* App Badges */}
          <div className="app-badges">
            <img
              src={premiereProIcon}
              alt="Adobe Premiere Pro"
              className="badge-icon"
            />
            <img
              src={davinciResolveIcon}
              alt="DaVinci Resolve"
              className="badge-icon"
            />
          </div>

          {/* Download Section */}
          <div className="download-section">
            <div className="download-card">
              <h2 className="download-title">Download The App</h2>
              <div className="platform-buttons">
                <a
                  href={macDownloadUrl}
                  className="platform-button"
                  aria-label={`Download for macOS${releases?.mac ? ` v${releases.mac.latestVersion}` : ''}`}
                >
                  <img src={appleIcon} alt="" className="platform-icon" />
                </a>
                <a
                  href={winDownloadUrl}
                  className="platform-button"
                  aria-label={`Download for Windows${releases?.win ? ` v${releases.win.latestVersion}` : ''}`}
                >
                  <img src={windowsIcon} alt="" className="platform-icon" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Media */}
        <section className="hero-media">
          <div className="media-panel">
            <iframe
              className="hero-video"
              src="https://www.youtube.com/embed/7R0qvQPC96w?autoplay=0&mute=1&controls=1&rel=0"
              title="Nice Touch Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              allowFullScreen
            />
            <div className="play-button-overlay">
              <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
