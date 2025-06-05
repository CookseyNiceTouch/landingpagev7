import React from 'react';
import './led.css';

/**
 * Led Component - Figma-accurate 3D LED indicator with HSL color control
 * 
 * @param {Object} props - Component props
 * @param {number} props.size - Size of the LED in pixels (default: 12)
 * @param {number} props.hue - Hue value (0-360) for LED color, defaults to 156 (green)
 * @param {number} props.saturation - Saturation value (0-100) for color intensity, defaults to 100
 * @param {number} props.lightness - Lightness value (0-100) for brightness, defaults to 50
 * @param {number} props.brightness - Brightness multiplier (0-1) for glow intensity, defaults to 1
 * @param {boolean} props.pulsing - Whether the LED should pulse (default: false)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 */
const Led = ({ 
  size = 12,
  hue = 156, // Default green hue
  saturation = 100, // Default full saturation
  lightness = 50, // Default medium lightness
  brightness = 1, // Default full brightness
  pulsing = false,
  className = '', 
  style = {},
  ...props 
}) => {
  // Calculate LED colors using HSL
  const baseSat = Math.max(0, Math.min(100, saturation)); // Clamp between 0-100
  const baseLit = Math.max(0, Math.min(100, lightness)); // Clamp between 0-100
  const brightnessFactor = Math.max(0, Math.min(1, brightness)); // Clamp between 0-1
  
  // LED color behavior: black below 30% brightness, colored above 30%
  let ledLit;
  if (brightnessFactor < 0.3) {
    // Below 30% brightness - LED appears black/off
    ledLit = 5; // Very dark, essentially black
  } else {
    // Above 30% brightness - LED shows color dimmed to match brightness
    // Map 0.3-1.0 brightness range to moderate LED lightness range (avoid washing out to white)
    const adjustedBrightness = (brightnessFactor - 0.3) / 0.7; // Normalize to 0-1
    ledLit = Math.min(65, Math.max(35, 35 + (adjustedBrightness * 30))); // Scale from 35% to 65% lightness max
  }
  
  const glowSat = Math.min(100, baseSat + 20); // Boost saturation for glow
  
  const ledStyle = {
    width: `${size}px`,
    height: `${size}px`,
    // CSS custom properties for dynamic coloring
    '--led-hue': hue,
    '--led-base-color': `hsl(${hue}, ${baseSat}%, ${ledLit}%)`,
    '--led-glow-color': `hsl(${hue}, ${glowSat}%, ${Math.max(50, baseLit)}%)`,
    '--led-glow-rgb': `${hslToRgb(hue, glowSat / 100, Math.max(50, baseLit) / 100).join(', ')}`,
    '--led-brightness': brightnessFactor,
    ...style
  };

  // Build className with modifiers
  const ledClassName = [
    'ui-led',
    pulsing ? 'ui-led--pulsing' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={ledClassName} 
      style={ledStyle}
      {...props}
    >
      <div className="ui-led-circle" />
    </div>
  );
};

// Helper function to convert HSL to RGB for rgba() usage in CSS
function hslToRgb(h, s, l) {
  h /= 360;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hueToRgb(p, q, h + 1/3) * 255);
  const g = Math.round(hueToRgb(p, q, h) * 255);
  const b = Math.round(hueToRgb(p, q, h - 1/3) * 255);
  return [r, g, b];
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}

export default Led; 