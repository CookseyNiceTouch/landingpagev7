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
  widthMultiplier = 1,
  heightMultiplier = 1,
  image,
  imageAlt = '',
  ...props 
}) => {
  // Base dimensions
  const baseWidth = 5; // 5rem
  const baseHeight = 5; // 5rem
  
  // Calculate actual dimensions accounting for 4px gaps between units
  const screenWidth = baseWidth * widthMultiplier + (widthMultiplier - 1) * 0.25; // 0.25rem = 4px
  const screenHeight = baseHeight * heightMultiplier + (heightMultiplier - 1) * 0.25;
  
  const screenStyle = {
    '--screen-width': `${screenWidth}rem`,
    '--screen-height': `${screenHeight}rem`,
    ...style
  };

  return (
    <div 
      className={`screen ${className}`}
      style={screenStyle}
      {...props}
    >
      <div className="screen-border">
        <div className="screen-display">
          {image && (
            <img 
              src={image} 
              alt={imageAlt}
              className="screen-image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Screen;
