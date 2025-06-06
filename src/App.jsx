import React, { useState } from 'react'
import './App.css'
import Device from './components/device'

function App() {
  // Default to first feature
  const [currentFeature, setCurrentFeature] = useState({
    title: "Chat with your AI edit assistant.",
    description: "Tell it to organize your timeline, apply a rough grade, or build out a draft sequence, it responds instantly. Automate repetitive tasks",
    artboard: "AI_edit_assistant"
  });
  
  const [isContentFading, setIsContentFading] = useState(false);

  const handleFeatureChange = (feature) => {
    // Start fade out
    setIsContentFading(true);
    
    // After fade out completes, update content and fade in
    setTimeout(() => {
      setCurrentFeature(feature);
      setIsContentFading(false);
    }, 100); // Match CSS transition duration
  };

  return (
    <div className="app">
      {/* Corner screws */}
      <div className="corner-screws">
        <img src="/Screw.png" alt="" className="screw top-left" />
        <img src="/Screw.png" alt="" className="screw top-right" />
        <img src="/Screw.png" alt="" className="screw bottom-left" />
        <img src="/Screw.png" alt="" className="screw bottom-right" />
      </div>



      {/* Page wrapper for centering */}
      <div className="page-wrapper">
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
              <Device onFeatureChange={handleFeatureChange} />
            </div>

            {/* Right section - feature content */}
            <div className={`feature-container ${isContentFading ? 'fading' : ''}`}>
              <h3 className="feature-title">{currentFeature.title}</h3>
              <p className="feature-description">
                {currentFeature.description}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
