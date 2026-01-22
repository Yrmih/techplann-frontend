import React from 'react';

interface TargetLogoProps {
  size?: number;
  className?: string;
}

export const TargetLogo = ({ size = 40, className = "" }: TargetLogoProps) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TechPlann Logo"
    >
      {/* Círculo Externo - Linha Fina (High Fidelity) */}
      <circle 
        cx="50" 
        cy="50" 
        r="42" 
        stroke="currentColor" 
        strokeWidth="3.5" 
      />
      {/* Círculo Médio - Linha Fina */}
      <circle 
        cx="50" 
        cy="50" 
        r="25" 
        stroke="currentColor" 
        strokeWidth="3.5" 
      />
      {/* Ponto Central Sólido */}
      <circle 
        cx="50" 
        cy="50" 
        r="7" 
        fill="currentColor" 
      />
    </svg>
  );
};