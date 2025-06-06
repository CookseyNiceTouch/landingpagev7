import React from 'react';
import './speaker.css';

/**
 * Speaker Component - Speaker grille with grid of holes
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {number} props.widthMultiplier - Width multiplier (default: 1)
 * @param {number} props.heightMultiplier - Height multiplier (default: 1)
 * @param {number} props.columns - Number of hole columns (default: 4)
 * @param {number} props.rows - Number of hole rows (default: 4)
 */
const Speaker = ({ 
  className = '',
  style = {},
  columns = 4,
  rows = 4,
  ...props 
}) => {
  // Grid variables for CSS
  const speakerStyle = {
    '--columns': columns,
    '--rows': rows,
    ...style
  };

  // Generate holes array
  const holes = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      holes.push({ row, col, key: `${row}-${col}` });
    }
  }

  return (
    <div 
      className={`speaker ${className}`}
      style={speakerStyle}
      {...props}
    >
      <div className="speaker-base">
        {holes.map(hole => (
          <div 
            key={hole.key} 
            className="speaker-hole"
            style={{
              gridRow: hole.row + 1,
              gridColumn: hole.col + 1
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Speaker;
