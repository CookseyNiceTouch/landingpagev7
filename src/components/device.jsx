import React, { useState } from 'react';
import SquareButton from './UIbits/sqbutton';
import Speaker from './UIbits/speaker';
import Screen from './UIbits/screen';
import Knob from './UIbits/Knob';
import SignupModal from './SignupModal';
import './device.css';

const Device = () => {
  const [selectedButton, setSelectedButton] = useState(1); // Track which selector button is active
  const [knobAngle, setKnobAngle] = useState(0); // Track knob rotation
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // Track signup modal state

  const handleButtonClick = (buttonId) => {
    if (buttonId === 'signup') {
      setIsSignupModalOpen(true);
    } else {
      console.log(`Button ${buttonId} clicked`);
    }
  };

  const handleSelectorClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
    console.log(`Selector button ${buttonNumber} selected`);
  };

  const handleDiscordClick = () => {
    window.open('https://discord.com/invite/jpp3mQUCYN', '_blank');
  };

  const handleKnobChange = (angle) => {
    setKnobAngle(angle);
    // Map angle (-180 to 180) to hue (0 to 360)
    const hue = ((angle + 180) / 360) * 360;
    // Set CSS custom property on document root
    document.documentElement.style.setProperty('--page-hue', hue);
  };

  return (
    <div className="device-casing">
      <div className="device-content">
        
        {/* Main layout container */}
        <div className="device-main-layout">
          
          {/* Left section: Speaker grille */}
          <div className="device-left-section">
            <Speaker 
              widthMultiplier={1}
              heightMultiplier={4}
              columns={4}
              rows={16}
              className="device-speaker-main"
            />
          </div>

          {/* Center-left section: Selector buttons 1-8 */}
          <div className="device-selector-section">
            <div className="selector-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <SquareButton
                  key={num}
                  onClick={() => handleSelectorClick(num)}
                  text={num.toString()}
                  className={`device-selector-button ${selectedButton === num ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Center-right section: Main screen */}
          <div className="device-screen-section">
            <Screen 
              image="rivestills/AI_edit_assistant.png"
              imageAlt="Main Display"
              widthMultiplier={4}
              heightMultiplier={4}
              className="device-main-screen"
            />
          </div>

        </div>

        {/* Bottom section: Control row */}
        <div className="device-bottom-section">
          <div className="device-bottom-row">
            
            <Knob 
              widthMultiplier={1}
              heightMultiplier={1}
              className="device-main-knob"
              indicatorAngle={knobAngle}
              onChange={handleKnobChange}
            />
            
            <SquareButton 
              onClick={() => handleButtonClick('info')}
              text="info"
              widthMultiplier={2}
              className="device-info-button"
            />
            
            <SquareButton 
              onClick={() => handleDiscordClick()}
              image="discord-logo.png"
              widthMultiplier={2}
              className="device-discord-button"
            />
            
            <SquareButton 
              onClick={() => handleButtonClick('signup')}
              text="Sign Up"
              variant="orange"
              widthMultiplier={2}
              className="device-signup-button"
            />
            
          </div>
        </div>

      </div>
      
      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </div>
  );
};

export default Device;
