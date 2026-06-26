import { useId } from 'react';

export default function Logo({ isEcoMode, height = 44 }) {
  const id = useId().replace(/:/g, '');
  const gradientId = `logoGlowGradient-${id}`;
  const filterId = `subtleGlow-${id}`;
  const glowColor = isEcoMode ? 'var(--eco-glow)' : 'var(--perf-glow)';
  const numeratorColor = isEcoMode ? glowColor : 'var(--text-muted)';
  const denominatorColor = !isEcoMode ? glowColor : 'var(--text-muted)';

  return (
    <svg
      height={height}
      viewBox="0 0 210 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={glowColor} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0.7} />
        </linearGradient>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        <path
          d="M 12 10 L 28 10 L 34 16 L 22 16 L 22 28 L 34 28 L 34 22 L 26 22 L 26 18 L 38 18 L 38 34 L 12 34 Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M 42 10 L 42 34 L 46 34 L 46 24 L 52 24 L 58 34 L 64 34 L 57 22 C 61 21 63 18 63 14 C 63 11 60 10 55 10 Z M 46 14 L 54 14 C 57 14 58 15 58 17 C 58 19 57 20 54 20 L 46 20 Z"
          fill="#ffffff"
        />
        <rect x="12" y="38" width="52" height="2" fill={glowColor} opacity="0.4" />
      </g>

      <g transform="translate(74, 0)">
        <text
          x="0"
          y="27"
          fill="#ffffff"
          fontWeight="900"
          fontSize="19"
          fontFamily="monospace"
        >
          T
        </text>

        <g transform="translate(13, 0)">
          <text
            x="10"
            y="17"
            textAnchor="middle"
            fill={numeratorColor}
            fontWeight="900"
            fontSize="13"
            fontFamily="monospace"
            style={{ transition: 'fill 0.4s ease' }}
          >
            U
          </text>

          <line
            x1="3"
            y1="21"
            x2="17"
            y2="21"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.8"
          />

          <text
            x="10"
            y="33"
            textAnchor="middle"
            fill={denominatorColor}
            fontWeight="900"
            fontSize="12"
            fontFamily="monospace"
            letterSpacing="-0.08em"
            style={{ transition: 'fill 0.4s ease' }}
          >
            oo
          </text>
        </g>

        <text
          x="36"
          y="27"
          fill="#ffffff"
          fontWeight="900"
          fontSize="19"
          fontFamily="monospace"
        >
          NING
        </text>

        <text
          x="1"
          y="40"
          fill="var(--text-muted)"
          fontWeight="600"
          fontSize="6.8"
          fontFamily="monospace"
          letterSpacing="0.22em"
        >
          Efficiency & Power
        </text>
      </g>
    </svg>
  );
}
