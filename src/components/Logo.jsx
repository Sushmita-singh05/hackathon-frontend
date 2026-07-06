import React from 'react';

const Logo = ({ className = '', size = 40 }) => {
  const scale = size / 40;
  const svgWidth = 180 * scale;
  const svgHeight = 40 * scale;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 360 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Heartbeat / ECG line */}
        <polyline
          points="0,45 30,45 40,45 50,30 58,60 66,20 74,55 82,40 90,45 105,45"
          stroke="#00C853"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* KlinikApp text */}
        <text
          x="108"
          y="50"
          fontFamily="Poppins, sans-serif"
          fontWeight="700"
          fontSize="36"
          fill="#00C853"
          letterSpacing="1"
        >
          KlinikApp
        </text>

        {/* Tagline */}
        <text
          x="108"
          y="70"
          fontFamily="Poppins, sans-serif"
          fontWeight="400"
          fontSize="12"
          fill="#00C853"
          opacity="0.8"
        >
          From prescription to progress
        </text>
      </svg>
    </div>
  );
};

export default Logo;
