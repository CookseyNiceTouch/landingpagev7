import React from 'react';
import './sqbutton.css';

/**
 * SquareButton Component - Simple grey button with layered design
 * 
 * @param {Object} props - Component props
 * @param {function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {number} props.widthMultiplier - Width multiplier (default: 1)
 * @param {number} props.heightMultiplier - Height multiplier (default: 1)
 * @param {string} props.text - Text to display on button
 * @param {string} props.image - Image URL to display on button
 * @param {string} props.imageAlt - Alt text for image
 * @param {string} props.variant - Button variant: 'default' or 'orange' (default: 'default')
 */
const SquareButton = ({ 
  onClick,
  className = '',
  style = {},
  text,
  image,
  imageAlt = '',
  variant = 'default',
  ...props 
}) => {
  // No JavaScript sizing - all handled by CSS classes now

  return (
    <button 
      className={`sq-button ${variant === 'orange' ? 'sq-button--orange' : ''} ${className}`}
      onClick={onClick}
      style={style}
      {...props}
    >
      
        <div className="sq-button-base">
          <div className="sq-button-circle">
            {/* Button content - text or image */}
            <div className="sq-button-content">
              {image && (
                <img 
                  src={image} 
                  alt={imageAlt}
                  className="sq-button-image"
                />
              )}
              {text && !image && (
                <span className="sq-button-text">{text}</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Pressed state overlay - matches base layer exactly */}
        <div className="sq-button-pressed-overlay">
          <div className="sq-button-pressed-circle">
          </div>
        </div>
      
    </button>
  );
};

export default SquareButton;
