import React from 'react';

const Logo = ({ className = '', size = 40 }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="100%" stopColor="#81C784" />
          </linearGradient>
          <linearGradient id="logoGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#388E3C" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>
        </defs>
        {/* Circular loop */}
        <circle cx="100" cy="100" r="80" stroke="url(#logoGrad1)" strokeWidth="6" fill="none" opacity="0.3"/>
        <path d="M 100 20 A 80 80 0 0 1 180 100" stroke="url(#logoGrad1)" strokeWidth="6" fill="none" strokeLinecap="round"/>
        {/* Medical Cross */}
        <rect x="88" y="65" width="24" height="70" rx="6" fill="url(#logoGrad2)"/>
        <rect x="65" y="88" width="70" height="24" rx="6" fill="url(#logoGrad2)"/>
        {/* Bloom petals */}
        <ellipse cx="100" cy="58" rx="10" ry="16" fill="#81C784" opacity="0.7" transform="rotate(0,100,80)"/>
        <ellipse cx="122" cy="68" rx="10" ry="16" fill="#4CAF50" opacity="0.6" transform="rotate(72,100,80)"/>
        <ellipse cx="114" cy="92" rx="10" ry="16" fill="#81C784" opacity="0.5" transform="rotate(144,100,80)"/>
        <ellipse cx="86" cy="92" rx="10" ry="16" fill="#4CAF50" opacity="0.6" transform="rotate(216,100,80)"/>
        <ellipse cx="78" cy="68" rx="10" ry="16" fill="#81C784" opacity="0.7" transform="rotate(288,100,80)"/>
        {/* Center bloom */}
        <circle cx="100" cy="80" r="8" fill="#FFB74D"/>
        {/* Leaf */}
        <path d="M 115 140 Q 140 125 130 105" stroke="#4CAF50" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 130 105 Q 125 120 115 130 Q 120 115 130 105" fill="#81C784" opacity="0.6"/>
      </svg>
      <span className="text-xl font-bold gradient-text tracking-tight">
        MedBloom
      </span>
    </div>
  );
};

export default Logo;
