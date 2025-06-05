import React, { useState, useEffect } from 'react';
import MailerLiteForm from './mailerlite/MailerLiteForm';
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

  useEffect(() => {
    // Override the MailerLite success callback when modal is open
    if (isOpen) {
      const originalCallback = window.ml_webform_success_24164656;
      
      window.ml_webform_success_24164656 = function() {
        // Call original callback first
        if (originalCallback) {
          originalCallback();
        }
        
        // Then handle modal-specific success
        setTimeout(() => {
          handleClose();
        }, 2000);
      };

      return () => {
        // Restore original callback when modal closes
        window.ml_webform_success_24164656 = originalCallback;
      };
    }
  }, [isOpen]);

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
    <div className={`signup-modal-overlay ${isAnimating ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="signup-modal minimal-mailer-form">
        <MailerLiteForm />
      </div>
    </div>
  );
};

export default SignupModal; 