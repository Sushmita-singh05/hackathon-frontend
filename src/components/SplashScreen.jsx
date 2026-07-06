import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onFinish }) => {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'hold' | 'exit'

  useEffect(() => {
    // Phase 1: Logo fades in + scales up (0 → 1.2s)
    const holdTimer = setTimeout(() => setPhase('hold'), 1200);
    // Phase 2: Hold visible (1.2s → 2.8s)
    const exitTimer = setTimeout(() => setPhase('exit'), 2800);
    // Phase 3: Fade out (2.8s → 3.6s), then unmount
    const finishTimer = setTimeout(() => onFinish(), 3600);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Glow backdrop */}
      <div
        style={{
          position: 'absolute',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,83,0.18) 0%, rgba(0,200,83,0.06) 40%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'scale(0.5)' : 'scale(1)',
          transition: 'opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1), transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo container */}
      <div
        style={{
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'scale(0.8)' : 'scale(1)',
          transition: 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
        }}
      >
        <svg
          width="320"
          height="90"
          viewBox="0 0 360 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ maxWidth: '85vw' }}
        >
          {/* ECG heartbeat line — animated draw-in */}
          <polyline
            points="0,45 30,45 40,45 50,28 58,62 66,18 74,57 82,38 90,45 108,45"
            stroke="#00C853"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 260,
              strokeDashoffset: phase === 'enter' ? 260 : 0,
              transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />

          {/* KlinikApp text */}
          <text
            x="112"
            y="52"
            fontFamily="Poppins, sans-serif"
            fontWeight="700"
            fontSize="38"
            fill="#00C853"
            letterSpacing="1"
            style={{
              opacity: phase === 'enter' ? 0 : 1,
              transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s',
            }}
          >
            KlinikApp
          </text>

          {/* Tagline */}
          <text
            x="112"
            y="74"
            fontFamily="Poppins, sans-serif"
            fontWeight="400"
            fontSize="13"
            fill="#00C853"
            opacity="0.75"
            style={{
              opacity: phase === 'enter' ? 0 : 0.75,
              transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.7s',
            }}
          >
            From prescription to progress
          </text>
        </svg>
      </div>

      {/* Subtle bottom pulse bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          width: '40px',
          height: '3px',
          borderRadius: '999px',
          background: 'rgba(0,200,83,0.5)',
          opacity: phase === 'enter' ? 0 : phase === 'exit' ? 0 : 1,
          transition: 'opacity 0.8s ease 1s',
          animation: phase !== 'enter' ? 'splashPulse 1.5s ease-in-out infinite' : 'none',
        }}
      />

      <style>{`
        @keyframes splashPulse {
          0%, 100% { opacity: 0.3; transform: scaleX(1); }
          50% { opacity: 0.7; transform: scaleX(1.8); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
