import React from 'react';

export default function HeatmapOverlay({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        <defs>
          <radialGradient id="heatmapGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 0, 0, 0.8)" />
            <stop offset="50%" stopColor="rgba(255, 165, 0, 0.6)" />
            <stop offset="100%" stopColor="rgba(255, 255, 0, 0.3)" />
          </radialGradient>
        </defs>
        
        {data.map((point, index) => (
          <circle
            key={index}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r={`${point.intensity * 15 + 5}px`}
            fill="url(#heatmapGradient)"
            className="animate-pulse"
            style={{
              opacity: point.intensity * 0.7 + 0.3,
              animationDelay: `${index * 0.1}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </svg>
      
      <div className="absolute top-2 right-2">
        <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
          Suspicious Regions: {data.length}
        </div>
      </div>
    </div>
  );
}