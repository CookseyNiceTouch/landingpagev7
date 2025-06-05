import React from 'react'
import './App.css'
import Device from './components/device'

function App() {
  return (
    <div className="app">
      {/* Corner screws */}
      <div className="corner-screws">
        <img src="/Screw.png" alt="" className="screw top-left" />
        <img src="/Screw.png" alt="" className="screw top-right" />
        <img src="/Screw.png" alt="" className="screw bottom-left" />
        <img src="/Screw.png" alt="" className="screw bottom-right" />
      </div>

      {/* Main content - vertical flexbox */}
      <div className="main-content">
        {/* Top section - title and subtitle */}
        <section className="header-section">
          <h1 className="main-title">You Create. We Automate</h1>
          <h2 className="subtitle">Nice Touch, the OS for creators.</h2>
        </section>

        {/* Bottom section - horizontal flexbox */}
        <section className="content-section">
          {/* Left section - device with proper casing */}
          <div className="device-container">
            <Device />
          </div>

          {/* Right section - feature content */}
          <div className="feature-container">
            <h3 className="feature-title">Chat with your AI edit assistant.</h3>
            <p className="feature-description">
              Tell it to organize your timeline, apply a rough grade, or build out a draft sequence, 
              it responds instantly.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
