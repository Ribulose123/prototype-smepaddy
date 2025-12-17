interface NetworkGridPatternProps {
  opacity?: number;
}

export function NetworkGridPattern({ opacity = 0.15 }: NetworkGridPatternProps) {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="networkGrid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          {/* Connection lines */}
          <line x1="0" y1="60" x2="40" y2="20" stroke="white" strokeWidth="1" opacity="0.6" />
          <line x1="40" y1="20" x2="80" y2="40" stroke="white" strokeWidth="1" opacity="0.6" />
          <line x1="80" y1="40" x2="120" y2="60" stroke="white" strokeWidth="1" opacity="0.6" />
          <line x1="40" y1="20" x2="60" y2="80" stroke="white" strokeWidth="1" opacity="0.6" />
          <line x1="60" y1="80" x2="100" y2="100" stroke="white" strokeWidth="1" opacity="0.6" />
          <line x1="0" y1="60" x2="60" y2="80" stroke="white" strokeWidth="1" opacity="0.6" />
          
          {/* Store nodes (circles representing connected stores) */}
          <circle cx="0" cy="60" r="4" fill="white" opacity="0.8" />
          <circle cx="40" cy="20" r="5" fill="white" opacity="0.9" />
          <circle cx="80" cy="40" r="4" fill="white" opacity="0.8" />
          <circle cx="120" cy="60" r="4" fill="white" opacity="0.7" />
          <circle cx="60" cy="80" r="5" fill="white" opacity="0.9" />
          <circle cx="100" cy="100" r="4" fill="white" opacity="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#networkGrid)" />
    </svg>
  );
}