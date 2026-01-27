
import React from 'react';

export const CircuitBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(125, 211, 252, 0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(125, 211, 252, 0.035) 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
        animation: 'circuitMove 22s linear infinite'
      }}
    >
      <style>{`
        @keyframes circuitMove {
          from { background-position: 0 0; }
          to { background-position: 50px 50px; }
        }
      `}</style>
    </div>
  );
};
