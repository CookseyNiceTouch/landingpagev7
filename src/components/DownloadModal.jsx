import React, { useState, useEffect } from 'react';
import './DownloadModal.css';

const DownloadModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to trigger the opening animation
      setTimeout(() => setIsAnimating(true), 10);
    } else if (isVisible) {
      // Start closing animation
      setIsAnimating(false);
      // Hide modal after animation completes
      setTimeout(() => setIsVisible(false), 400);
    }
  }, [isOpen, isVisible]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 400); // Match animation duration
  };

  const handleDownload = (platform) => {
    if (platform === 'windows') {
      // Open Windows download in new tab
      window.open('https://nt-object-storage-nq3a0.sevalla.storage/Nice%20Touch-Windows-0.0.0-Setup-OneClick.msi', '_blank');
    } else {
      // TODO: Handle other platforms when available
      console.log(`Download requested for platform: ${platform}`);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`download-modal-overlay ${isAnimating ? 'open' : ''}`} onClick={handleOverlayClick}>
      <button className="modal-close-button" onClick={handleClose} aria-label="Close modal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div className="download-modal">
        <div className="download-content">
          <h3 className="download-title">Download Nice Touch</h3>
          <p className="download-subtitle">Choose your platform to get started</p>
          
          <div className="platform-buttons">
            <div className="platform-button-container">
              <button className="platform-button" onClick={() => handleDownload('windows')}>
                <div className="platform-icon">💻</div>
                <div className="platform-info">
                  <span className="platform-name">Windows</span>
                  <span className="platform-detail">Windows 10+</span>
                </div>
              </button>
            </div>

            <div className="platform-button-container coming-soon">
              <button className="platform-button" disabled>
                <div className="platform-icon">🍎</div>
                <div className="platform-info">
                  <span className="platform-name">macOS</span>
                  <span className="platform-detail">macOS 11+</span>
                </div>
              </button>
              <div className="coming-soon-overlay">
                <span>Coming Soon</span>
              </div>
            </div>

            <div className="platform-button-container coming-soon">
              <button className="platform-button" disabled>
                <div className="platform-icon">🐧</div>
                <div className="platform-info">
                  <span className="platform-name">Linux</span>
                  <span className="platform-detail">Ubuntu 20.04+</span>
                </div>
              </button>
              <div className="coming-soon-overlay">
                <span>Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
