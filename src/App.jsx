import React, { useState, useEffect } from 'react'
import './App.css'
import Device from './components/device'
import SignupModal from './components/SignupModal'
import InfoOverlay from './components/infooverlay'

function App() {
  // Default to first feature
  const [currentFeature, setCurrentFeature] = useState({
    title: "Chat with your AI edit assistant.",
    description: "Tell it to organize your timeline, apply a rough grade, or build out a draft sequence, it responds instantly. Automate repetitive tasks",
    artboard: "AI_edit_assistant"
  });
  
  const [isContentFading, setIsContentFading] = useState(false);
  const [isContentEntering, setIsContentEntering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isInfoOverlayOpen, setIsInfoOverlayOpen] = useState(false);

  // Enable transitions after initial page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500); // After initial animation completes (0.7s delay + 0.8s duration)
    
    return () => clearTimeout(timer);
  }, []);

  const handleFeatureChange = (feature, direction = 'down') => {
    console.log(`handleFeatureChange called: "${feature.title}" direction: ${direction}, current: "${currentFeature.title}"`);
    console.log(`Current states - fading: ${isContentFading}, entering: ${isContentEntering}`);
    
    // If currently animating, immediately update to new feature and restart animation
    if (isContentFading || isContentEntering) {
      console.log(`Animation in progress - interrupting and restarting with new feature`);
      setCurrentFeature(feature);
      setIsContentFading(direction);
      setIsContentEntering(false);
      
      // Start fresh animation
      setTimeout(() => {
        setIsContentFading(false);
        setIsContentEntering(direction);
        
        setTimeout(() => {
          setIsContentEntering(false);
        }, 300);
      }, 300);
      return;
    }
    
    // Only animate if content is different - compare by artboard to be more reliable
    if (feature.artboard === currentFeature.artboard) {
      console.log(`Skipping - same artboard: ${feature.artboard}`);
      return;
    }
    
    console.log(`Feature changing from "${currentFeature.title}" to "${feature.title}" direction: ${direction}`);
    
    // Step 1: Trigger fade out in the scroll direction
    setIsContentFading(direction); // Pass direction instead of boolean
    
    // Step 2: After fade out completes, update content and start fade in
    setTimeout(() => {
      setCurrentFeature(feature);
      setIsContentFading(false);
      setIsContentEntering(direction); // Pass direction for entering animation
      
      // Step 3: Remove entering state after fade in completes
      setTimeout(() => {
        setIsContentEntering(false);
      }, 300);
    }, 300); // Match CSS transition duration
  };

  const handleModalOpen = (modalType) => {
    if (modalType === 'signup') {
      setIsSignupModalOpen(true);
    } else if (modalType === 'info') {
      setIsInfoOverlayOpen(true);
    }
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
            <Device onFeatureChange={handleFeatureChange} onModalOpen={handleModalOpen} />
          </div>

                      {/* Right section - feature content */}
          <div className={`feature-container ${isContentFading ? `fading-${isContentFading}` : ''} ${isContentEntering ? `entering-${isContentEntering}` : ''} ${isLoaded ? 'loaded' : ''}`}>
            <h3 className="feature-title">{currentFeature.title}</h3>
            <p className="feature-description">
              {currentFeature.description}
            </p>
          </div>
          </section>
        </div>
      </div>

      {/* Modals at app level for full-screen coverage */}
      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
      
      <InfoOverlay 
        isOpen={isInfoOverlayOpen}
        onClose={() => setIsInfoOverlayOpen(false)}
      />
    </div>
  )
}

export default App
