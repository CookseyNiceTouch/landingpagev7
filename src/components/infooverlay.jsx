import React, { useState, useEffect } from 'react';
import './infooverlay.css';

const InfoOverlay = ({ isOpen, onClose }) => {
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

  if (!isVisible) return null;

  return (
    <div className={`info-modal-overlay ${isAnimating ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="info-modal">
        <div className="info-content">
          <h3 className="info-title">Nice Touch</h3>
          <div className="info-text">
            <p>
              Nice Touch is the operating system designed specifically for creators. We understand that your creative workflow is unique, complex, and constantly evolving—that's why we built an AI assistant that actually gets it.
            </p>
            <p>
              Instead of forcing you to learn new tools, Nice Touch integrates seamlessly with your existing setup. Whether you're editing in Premiere, DaVinci, or After Effects, our AI becomes your intelligent copilot, automating the tedious stuff so you can focus on what matters: creating.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoOverlay;
