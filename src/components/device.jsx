import React from 'react';
import SquareButton from './UIbits/sqbutton';
import './device.css';

const Device = () => {
  const handleButtonClick = (buttonId) => {
    console.log(`Button ${buttonId} clicked`);
  };

  return (
    <div className="device-casing">
      {/* Device content with buttons */}
      <div className="device-content">
        <div className="button-section">
          <div className="button-row">
            <SquareButton 
              onClick={() => handleButtonClick(1)}
              text="Play"
              className="device-button"
            />
            <SquareButton 
              onClick={() => handleButtonClick(2)}
              text="Record"
              widthMultiplier={2}
              className="device-button"
            />
          </div>
          <div className="button-row">
            <SquareButton 
              onClick={() => handleButtonClick(3)}
              text="Stop"
              heightMultiplier={1.5}
              className="device-button"
            />
            <SquareButton 
              onClick={() => handleButtonClick(4)}
              image="discord-logo.png"
              widthMultiplier={1.5}
              heightMultiplier={1.5}
              className="device-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Device;
