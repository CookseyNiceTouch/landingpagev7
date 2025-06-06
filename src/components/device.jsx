import React, { useState } from 'react';
import SquareButton from './UIbits/sqbutton';
import Speaker from './UIbits/speaker';
import Screen from './UIbits/screen';
import Knob from './UIbits/Knob';
import SignupModal from './SignupModal';
import InfoOverlay from './infooverlay';
import RiveAnimation from './rivebits/RiveAnimation';
import './device.css';

const Device = ({ onFeatureChange }) => {
  const [selectedButton, setSelectedButton] = useState(1); // Track which selector button is active
  const [knobAngle, setKnobAngle] = useState(0); // Track knob rotation
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // Track signup modal state
  const [isInfoOverlayOpen, setIsInfoOverlayOpen] = useState(false); // Track info overlay state
  const [isAnimationFading, setIsAnimationFading] = useState(false); // Track animation fade state
  const [lastScrollTime, setLastScrollTime] = useState(0); // Track last scroll time
  const [isScrolling, setIsScrolling] = useState(false); // Track if user is currently scrolling
  const [scrollTimeoutId, setScrollTimeoutId] = useState(null); // Track scroll timeout

  // Features data for different screens and content
  const features = [
    {
      title: "Chat with your AI edit assistant.",
      description: "Tell it to organize your timeline, apply a rough grade, or build out a draft sequence, it responds instantly. Automate repetitive tasks",
      imageSrc: "/rivestills/AI_edit_assistant.png",
      imageAlt: "AI Chat Interface",
      artboard: "AI_edit_assistant"
    },
    {
      title: "Context-Aware Workflow",
      description: "Pull in briefs, transcripts, and notes to give your AI the full picture. Nice Touch builds a contextual understanding of your project - automatically linking relevant tasks, creative direction, and client expectations.",
      imageSrc: "/rivestills/Context_Aware_Workflow.png",
      imageAlt: "Context Aware Workflow",
      artboard: "Context_Aware_Workflow"
    },
    {
      title: "File Management, Sorted",
      description: "From messy imports to ready-to-edit structures. Nice Touch builds clean, synced folder systems for your assets - based on your setup. Set your structure once, and the AI repeats it every time and flexes with your work.",
      imageSrc: "/rivestills/File_Management_Sorted.png",
      imageAlt: "File Management System",
      artboard: "File_Management_Sorted"
    },
    {
      title: "No New Tools to Learn",
      description: "Just powerful shortcuts in the tools you already use. Nice Touch runs alongside Premiere, DaVinci, or After Effects—think of it like superpowers for your current setup.",
      imageSrc: "/rivestills/No_New_Tools_to_Learn.png",
      imageAlt: "Existing Tools Integration",
      artboard: "No_New_Tools_to_Learn"
    },
    {
      title: "Error Spotting Before Export",
      description: "Last-minute glitches? We catch them first. Nice Touch scans for missing media, mismatched framerates, and common export issues.",
      imageSrc: "/rivestills/Error_Spotting_Before_Export.png",
      imageAlt: "Error Detection System",
      artboard: "Error_Spotting_Before_Export"
    },
    {
      title: "Feedback Centralized",
      description: "Emails, links, meetings—we pull it all into one feedback stream. Every comment is linked to timecodes or files. Nothing gets missed.",
      imageSrc: "/rivestills/Feedback_Centralized.png",
      imageAlt: "Centralized Feedback System",
      artboard: "Feedback_Centralized"
    },
    {
      title: "Scalable Metadata Architecture",
      description: "Every asset gets a unique ID and AI-generated, timecoded metadata—enabling agents to understand and work with your media for smarter automation, editing, and reuse.",
      imageSrc: "/rivestills/Scalable_Metadata_Architecture.png",
      imageAlt: "Scalable Metadata Architecture",
      artboard: "Scalable_Metadata_Architecture"
    },
    {
      title: "Privacy & Security First",
      description: "Your work stays yours. Always. Nice Touch is built with strict data privacy in mind. Your files, feedback, and conversations are encrypted and never used to train outside models or shared without your permission.",
      imageSrc: "/rivestills/Privacy_Security_First.png",
      imageAlt: "Privacy & Security",
      artboard: "Privacy_Security_First"
    }
  ];

  // Get current feature based on selected button
  const currentFeature = features[selectedButton - 1];

  // Initialize with first feature on mount
  React.useEffect(() => {
    if (onFeatureChange) {
      onFeatureChange(currentFeature);
    }
  }, []); // Only run on mount

  // Handle scroll events for feature switching
  React.useEffect(() => {
    const handleScroll = (event) => {
      const now = Date.now();
      
      // No debounce - immediate response for tactile feel
      setLastScrollTime(now);
      
      // Start scrolling state - fade out animations immediately
      if (!isScrolling) {
        setIsScrolling(true);
        setIsAnimationFading(true);
      }
      
      // Clear existing scroll timeout
      if (scrollTimeoutId) {
        clearTimeout(scrollTimeoutId);
      }
      
      // Set timeout to detect when scrolling stops
      const timeoutId = setTimeout(() => {
        setIsScrolling(false);
        setIsAnimationFading(false);
      }, 10); // 10ms after last scroll event
      
      setScrollTimeoutId(timeoutId);
      
      const delta = event.deltaY;
      let newButton = selectedButton;
      
      if (delta > 0) {
        // Scrolling down - next feature
        newButton = selectedButton < 8 ? selectedButton + 1 : 1;
      } else {
        // Scrolling up - previous feature
        newButton = selectedButton > 1 ? selectedButton - 1 : 8;
      }
      
      if (newButton !== selectedButton) {
        // Update button state immediately - no animation delays
        setSelectedButton(newButton);
        
        // Update content immediately for tactile feedback
        const selectedFeature = features[newButton - 1];
        if (onFeatureChange) {
          onFeatureChange(selectedFeature);
        }
      }
    };

    // Add scroll listener to window
    window.addEventListener('wheel', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleScroll);
      if (scrollTimeoutId) {
        clearTimeout(scrollTimeoutId);
      }
    };
  }, [selectedButton, isScrolling, scrollTimeoutId]); // Dependencies

  const handleButtonClick = (buttonId) => {
    if (buttonId === 'signup') {
      setIsSignupModalOpen(true);
    } else if (buttonId === 'info') {
      setIsInfoOverlayOpen(true);
    } else {
      console.log(`Button ${buttonId} clicked`);
    }
  };

  const handleSelectorClick = (buttonNumber) => {
    // Don't switch if already selected
    if (selectedButton === buttonNumber) return;
    
    const selectedFeature = features[buttonNumber - 1];
    console.log(`Selector button ${buttonNumber} selected - Artboard: ${selectedFeature.artboard}`);
    
    // For manual button clicks (not scroll), use smooth transitions
    if (!isScrolling) {
      // Start animation fade out
      setIsAnimationFading(true);
      
      // Update button state immediately for visual feedback
      setSelectedButton(buttonNumber);
      
      // Quick transition for manual clicks
      setTimeout(() => {
        // Notify parent component about feature change
        if (onFeatureChange) {
          onFeatureChange(selectedFeature);
        }
        
        // Fade animation back in
        setTimeout(() => {
          setIsAnimationFading(false);
        }, 25);
      }, 75);
    } else {
      // For scroll events, update immediately (handled in scroll handler)
      setSelectedButton(buttonNumber);
      if (onFeatureChange) {
        onFeatureChange(selectedFeature);
      }
    }
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
              widthMultiplier={4}
              heightMultiplier={4}
              className={`device-main-screen ${isAnimationFading ? 'animation-fading' : ''}`}
            >
              <RiveAnimation 
                key={currentFeature.artboard} // Force re-mount when artboard changes
                artboard={currentFeature.artboard}
                fallbackSrc={currentFeature.imageSrc}
                className="screen-rive-animation"
              />
            </Screen>
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
      
      {/* Info Overlay */}
      <InfoOverlay 
        isOpen={isInfoOverlayOpen}
        onClose={() => setIsInfoOverlayOpen(false)}
      />
    </div>
  );
};

export default Device;
