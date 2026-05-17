import React from 'react';

const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large circle top-right */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(76,175,80,0.08) 0%, transparent 70%)',
        }}
      />
      {/* Small circle left */}
      <div
        className="absolute top-1/3 -left-16 w-64 h-64 rounded-full animate-float-reverse"
        style={{
          background: 'radial-gradient(circle, rgba(129,199,132,0.1) 0%, transparent 70%)',
          animationDelay: '2s',
        }}
      />
      {/* Medium circle bottom-right */}
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full animate-pulse-soft"
        style={{
          background: 'radial-gradient(circle, rgba(255,183,77,0.08) 0%, transparent 70%)',
          animationDelay: '1s',
        }}
      />
      {/* Small dot patterns */}
      <div
        className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-primary/10 animate-float"
        style={{ animationDelay: '3s' }}
      />
      <div
        className="absolute top-1/4 left-2/3 w-2 h-2 rounded-full bg-accent/15 animate-float-reverse"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-4 h-4 rounded-full bg-secondary/10 animate-pulse-soft"
        style={{ animationDelay: '4s' }}
      />
      {/* Cross shape */}
      <div className="absolute top-20 left-1/2 opacity-5 animate-float" style={{ animationDelay: '2.5s' }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="15" y="5" width="10" height="30" rx="3" fill="#4CAF50"/>
          <rect x="5" y="15" width="30" height="10" rx="3" fill="#4CAF50"/>
        </svg>
      </div>
      {/* Leaf shape */}
      <div className="absolute bottom-40 right-20 opacity-5 animate-float-reverse" style={{ animationDelay: '3.5s' }}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M10 40 Q25 10 40 25 Q30 35 10 40Z" fill="#81C784"/>
        </svg>
      </div>
    </div>
  );
};

export default FloatingShapes;
