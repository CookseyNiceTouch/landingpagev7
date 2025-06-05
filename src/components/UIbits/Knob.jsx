import React, { useState, useCallback, useRef } from 'react';
import './knob.css';

/**
 * Knob Component - Knob control with same base as buttons/speakers
 * 
 * @param {Object} props - Component props
 * @param {number} props.widthMultiplier - Width multiplier (default: 1)
 * @param {number} props.heightMultiplier - Height multiplier (default: 1)
 * @param {number} props.indicatorAngle - Controlled angle of the indicator in degrees (default: 0, top position)
 * @param {function} props.onChange - Callback when angle changes (angle) => void
 * @param {number} props.sensitivity - Drag sensitivity multiplier (default: 1)
 * @param {number} props.minAngle - Minimum rotation angle in degrees (default: -180)
 * @param {number} props.maxAngle - Maximum rotation angle in degrees (default: 180)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 */
const Knob = ({ 
  widthMultiplier = 1,
  heightMultiplier = 1,
  indicatorAngle: controlledAngle,
  onChange,
  sensitivity = 1,
  minAngle = -135,
  maxAngle = 135,
  className = '', 
  style = {},
  ...props 
}) => {
  // Base dimensions
  const baseWidth = 5; // 5rem
  const baseHeight = 5; // 5rem
  
  // Calculate actual dimensions accounting for 4px gaps between units
  const knobWidth = baseWidth * widthMultiplier + (widthMultiplier - 1) * 0.25; // 0.25rem = 4px
  const knobHeight = baseHeight * heightMultiplier + (heightMultiplier - 1) * 0.25;

  // Internal state for uncontrolled mode
  const [internalAngle, setInternalAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ y: 0, startAngle: 0 });

  // Use controlled angle if provided, otherwise use internal state
  const currentAngle = controlledAngle !== undefined ? controlledAngle : internalAngle;

  // Clamp angle to bounds
  const clampAngle = useCallback((angle) => {
    return Math.max(minAngle, Math.min(maxAngle, angle));
  }, [minAngle, maxAngle]);

  // Handle mouse down - start dragging
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      y: e.clientY,
      startAngle: currentAngle
    };

    // Add global mouse event listeners
    const handleMouseMove = (moveEvent) => {
      if (!isDragging && !dragStartRef.current) return;

      const deltaY = dragStartRef.current.y - moveEvent.clientY; // Inverted for natural feel
      const angleChange = deltaY * sensitivity; // Vertical movement to angle
      const newAngle = clampAngle(dragStartRef.current.startAngle + angleChange);

      // Update angle
      if (controlledAngle !== undefined) {
        // Controlled mode - call onChange
        onChange?.(newAngle);
      } else {
        // Uncontrolled mode - update internal state
        setInternalAngle(newAngle);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = { y: 0, startAngle: 0 };
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [currentAngle, sensitivity, clampAngle, controlledAngle, onChange, isDragging]);

  const knobContainerStyle = {
    '--knob-width': `${knobWidth}rem`,
    '--knob-height': `${knobHeight}rem`,
    '--knob-angle': `${currentAngle}deg`,
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    ...style
  };

  return (
    <div 
      className={`knob-container ${isDragging ? 'knob-container--dragging' : ''} ${className}`} 
      style={knobContainerStyle}
      onMouseDown={handleMouseDown}
      {...props}
    >
      <div className="knob-base">
        <div className="knob-control">
          <div className="knob-control-base">
            <div className="knob-control-indicator" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Knob;