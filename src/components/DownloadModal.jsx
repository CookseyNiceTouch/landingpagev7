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
        // Fetch from public releases JSON in the releases repo
        const RELEASES_JSON_URL = 'https://raw.githubusercontent.com/CookseyNiceTouch/nice-touch-app-releases/main/nice-touch-releases.json';
        const response = await fetch(RELEASES_JSON_URL, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch release data: ${response.status}`);
        }
        
        const source = await response.json();

        // Map the public JSON { win|mac|linux } into the modal's expected shape
        const pickVersion = () => source?.win?.latestVersion || source?.mac?.latestVersion || source?.linux?.latestVersion || null;
        const pickNotesUrl = () => source?.win?.releaseNotesUrl || source?.mac?.releaseNotesUrl || source?.linux?.releaseNotesUrl || null;

        const version = pickVersion();
        const htmlUrl = pickNotesUrl();
        const mapped = {
          version,
          tag_name: version ? `v${version}` : null,
          release_name: version ? `Nice Touch ${version}` : 'Nice Touch',
          description: '',
          published_at: null,
          html_url: htmlUrl,
          platforms: {
            windows: {
              available: !!source?.win?.downloadUrl,
              download_url: source?.win?.downloadUrl || null,
              filename: source?.win?.downloadUrl ? decodeURIComponent(new URL(source.win.downloadUrl).pathname.split('/').pop() || '') : null,
              size: null,
              requirements: 'Windows 10+',
              ...(source?.win?.downloadUrl ? {} : { coming_soon: true })
            },
            macos: {
              available: !!source?.mac?.downloadUrl,
              download_url: source?.mac?.downloadUrl || null,
              filename: source?.mac?.downloadUrl ? decodeURIComponent(new URL(source.mac.downloadUrl).pathname.split('/').pop() || '') : null,
              size: null,
              requirements: 'macOS 11+',
              ...(source?.mac?.downloadUrl ? {} : { coming_soon: true })
            },
            linux: {
              available: !!source?.linux?.downloadUrl,
              download_url: source?.linux?.downloadUrl || null,
              filename: source?.linux?.downloadUrl ? decodeURIComponent(new URL(source.linux.downloadUrl).pathname.split('/').pop() || '') : null,
              size: null,
              requirements: 'Ubuntu 20.04+',
              ...(source?.linux?.downloadUrl ? {} : { coming_soon: true })
            }
          },
          github_release: {
            api_url: 'https://github.com/CookseyNiceTouch/nice-touch-app-releases',
            auto_update: true,
            last_synced: new Date().toISOString()
          }
        };

        setReleaseData(mapped);
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
                {Object.entries(releaseData.platforms)
                  .filter(([platformKey]) => platformKey !== 'linux') // Hide Linux for now
                  .map(([platformKey, platformData]) => {
                  const platformIcons = {
                    windows: '💻',
                    macos: '🍎'
                  };
                  
                  const platformNames = {
                    windows: 'Windows',
                    macos: 'macOS'
                  };

                   return (
                     <div key={platformKey} className={`platform-button-container ${!platformData.available ? 'coming-soon' : ''} ${(platformKey === 'windows' || platformKey === 'macos') ? 'beta' : ''}`}>
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
                       {(platformKey === 'windows' || platformKey === 'macos') && platformData.available && (
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
