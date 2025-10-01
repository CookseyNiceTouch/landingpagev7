import React, { useState, useEffect } from 'react';
import './DownloadModal.css';

const DownloadModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [releaseData, setReleaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Fetch release data when component mounts
  useEffect(() => {
    const fetchReleaseData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/downloads/latest-staging.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch release data: ${response.status}`);
        }
        
        const data = await response.json();
        setReleaseData(data);
      } catch (err) {
        console.error('Error fetching release data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReleaseData();
  }, []);

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
    if (!releaseData) {
      console.error('Release data not available');
      return;
    }

    const platformData = releaseData.platforms[platform];
    
    if (!platformData) {
      console.error(`Platform ${platform} not found in release data`);
      return;
    }

    if (!platformData.available || !platformData.download_url) {
      console.log(`Download not available for platform: ${platform}`);
      return;
    }

    // Open download in new tab
    window.open(platformData.download_url, '_blank');
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
          {loading ? (
            <div className="loading-state">
              <p>Loading release information...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>Error loading release data: {error}</p>
              <p className="download-subtitle">Please try again later</p>
            </div>
          ) : releaseData ? (
            <>
              <p className="download-subtitle">
                {releaseData.release_name} - Choose your platform to get started
              </p>
              
              <div className="platform-buttons">
                {Object.entries(releaseData.platforms).map(([platformKey, platformData]) => {
                  const platformIcons = {
                    windows: '💻',
                    macos: '🍎',
                    linux: '🐧'
                  };
                  
                  const platformNames = {
                    windows: 'Windows',
                    macos: 'macOS',
                    linux: 'Linux'
                  };

                   return (
                     <div key={platformKey} className={`platform-button-container ${!platformData.available ? 'coming-soon' : ''} ${platformKey === 'windows' ? 'beta' : ''}`}>
                       <button 
                         className="platform-button" 
                         onClick={() => handleDownload(platformKey)}
                         disabled={!platformData.available}
                       >
                         <div className="platform-icon">{platformIcons[platformKey]}</div>
                         <div className="platform-info">
                           <span className="platform-name">{platformNames[platformKey]}</span>
                           <span className="platform-detail">
                             {platformData.requirements}
                             {platformData.available && platformData.size && ` • ${platformData.size}`}
                           </span>
                         </div>
                       </button>
                       {!platformData.available && platformData.coming_soon && (
                         <div className="coming-soon-overlay">
                           <span>Coming Soon</span>
                         </div>
                       )}
                       {platformKey === 'windows' && platformData.available && (
                         <div className="beta-overlay">
                           <span>Beta</span>
                         </div>
                       )}
                     </div>
                   );
                })}
              </div>
            </>
          ) : (
            <p className="download-subtitle">No release data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
