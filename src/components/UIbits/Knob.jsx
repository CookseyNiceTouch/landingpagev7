import React, { useState, useCallback, useRef } from 'react';
import './knob.css';

/**
 * Knob Component - Figma-accurate 3D knob control with interactive rotation
 * 
 * @param {Object} props - Component props
 * @param {number} props.size - Size of the knob in pixels (default: 90)
 * @param {number} props.indicatorAngle - Controlled angle of the indicator in degrees (default: 0, top position)
 * @param {function} props.onChange - Callback when angle changes (angle) => void
 * @param {number} props.sensitivity - Drag sensitivity multiplier (default: 1)
 * @param {number} props.minAngle - Minimum rotation angle in degrees (default: -180)
 * @param {number} props.maxAngle - Maximum rotation angle in degrees (default: 180)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 */
const Knob = ({ 
  size = 90, 
  indicatorAngle: controlledAngle,
  onChange,
  sensitivity = 1,
  minAngle = -180,
  maxAngle = 180,
  className = '', 
  style = {},
  ...props 
}) => {
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

  const knobStyle = {
    width: `${size}px`,
    height: `${size}px`,
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    ...style
  };

  // Calculate indicator position based on current angle
  // Always use calculated positioning for consistency
  const knobRadius = size / 2;
  const indicatorDistance = knobRadius - 18; // Distance from center to indicator
  const angleInRadians = (currentAngle - 90) * (Math.PI / 180); // -90 to start from top
  
  const indicatorX = knobRadius + indicatorDistance * Math.cos(angleInRadians) - 1.84; // Half indicator width
  const indicatorY = knobRadius + indicatorDistance * Math.sin(angleInRadians) - 4.21; // Half indicator height
  
  const indicatorStyle = {
    left: `${indicatorX}px`,
    top: `${indicatorY}px`,
    transform: `rotate(${currentAngle}deg)` // Rotate indicator to point outward
  };

  return (
    <div 
      className={`ui-knob ${isDragging ? 'ui-knob--dragging' : ''} ${className}`} 
      style={knobStyle}
      onMouseDown={handleMouseDown}
      {...props}
    >
      <div className="ui-knob-base">
        <div 
          className="ui-knob-indicator" 
          style={indicatorStyle}
        />
      </div>
    </div>
  );
};

export default Knob;