import { useState } from 'react'
import type { ReactElement } from 'react'
import Header from '../components/Header'
import GetAppModal from '../components/GetAppModal'
import premiereProIcon from '../assets/images/premiere-pro-icon.png'
import davinciResolveIcon from '../assets/images/davinci-resolve-icon.png'

function Home(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="home-page">
      <Header />
      <main className="hero">
        <section className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Nice Touch</span>
            <span className="subtitle">Your AI Video Edit Assistant</span>
          </h1>

          <div className="app-badges">
            <img src={premiereProIcon} alt="Adobe Premiere Pro" className="badge-icon" />
            <img src={davinciResolveIcon} alt="DaVinci Resolve" className="badge-icon" />
          </div>

          <div className="download-section">
            <button
              className="get-app-button"
              onClick={() => setIsModalOpen(true)}
            >
              Get the App
            </button>
          </div>
        </section>

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
      <GetAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default Home

