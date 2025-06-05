import React, { useState, useEffect } from 'react';
import MailerLiteModalForm from './mailerlite/MailerLiteModalForm';
import './SignupModal.css';

const SignupModal = ({ isOpen, onClose }) => {
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

  const handleSuccess = () => {
    // Close modal after showing success message
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div className={`signup-modal-overlay ${isAnimating ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="signup-modal">
        <MailerLiteModalForm 
          onClose={handleClose}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
};

export default SignupModal; 