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
            Is an AI-powered creative operations assistant for professional video creators. Integrated directly into leading editing software, it automates repetitive and administrative tasks—giving creators back valuable time to focus on creativity and growth.
            </p>
            <p>
            We believe creators should spend their time creating, not managing assets or chasing feedback. Nice Touch blends seamlessly into existing workflows, empowering users to streamline operations, unlock productivity, and reclaim their creative freedom.
            </p>
            <p>Our mission is simple: help creators thrive by reducing complexity and friction in the creative process. By providing intelligent automation and intuitive tools, we aim to enable creators everywhere to scale their impact, profitability, and creative expression.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoOverlay;
