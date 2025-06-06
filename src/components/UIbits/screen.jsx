import React from 'react';
import './screen.css';

/**
 * Screen Component - Display screen with black background and border
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {number} props.widthMultiplier - Width multiplier (default: 1)
 * @param {number} props.heightMultiplier - Height multiplier (default: 1)
 * @param {string} props.image - Image URL to display on screen
 * @param {string} props.imageAlt - Alt text for image
 */
const Screen = ({ 
  className = '',
  style = {},
  image,
  imageAlt = '',
  children,
  ...props 
}) => {
  // No JavaScript sizing - all handled by CSS classes now

  return (
    <div 
      className={`screen ${className}`}
      style={style}
      {...props}
    >
      <div className="screen-border">
        <div className="screen-display">
          {children ? (
            children
          ) : image ? (
            <img 
              src={image} 
              alt={imageAlt}
              className="screen-image"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Screen;
