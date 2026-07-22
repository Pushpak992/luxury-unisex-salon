"use client";

/** Original Lumina salon scissors — vector paths only (no third-party icons). */

import { useId } from "react";

interface ScissorsSvgProps {
  className?: string;
  bladeClass?: string;
  finish?: "gold" | "silver";
}

export function ScissorsSvg({
  className,
  bladeClass = "scissors-blade",
  finish = "gold",
}: ScissorsSvgProps) {
  const rawId = useId().replace(/:/g, "");
  const gradId = `luminaScissorGrad-${rawId}`;
  const glowId = `luminaScissorGlow-${rawId}`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        {finish === "gold" ? (
          <linearGradient id={gradId} x1="8" y1="8" x2="56" y2="56">
            <stop offset="0%" stopColor="#F0E2C4" />
            <stop offset="40%" stopColor="#C9A66B" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
        ) : (
          <linearGradient id={gradId} x1="8" y1="8" x2="56" y2="56">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#C8CCD2" />
            <stop offset="100%" stopColor="#7A8088" />
          </linearGradient>
        )}
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="1.4"
            floodColor={finish === "gold" ? "#C9A66B" : "#AAB0B8"}
            floodOpacity="0.55"
          />
        </filter>
      </defs>

      <circle
        cx="32"
        cy="34"
        r="3.2"
        fill={`url(#${gradId})`}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.6"
        filter={`url(#${glowId})`}
      />

      <g
        className={bladeClass}
        data-blade="upper"
        style={{ transformOrigin: "32px 34px", transformBox: "fill-box" }}
      >
        <path
          d="M32 34 L52 12"
          stroke={`url(#${gradId})`}
          strokeWidth="2.4"
          strokeLinecap="round"
          filter={`url(#${glowId})`}
        />
        <path
          d="M50.5 10.5 L55 8.5 L53.2 14.2 Z"
          fill={`url(#${gradId})`}
        />
        <circle
          cx="20"
          cy="48"
          r="7"
          stroke={`url(#${gradId})`}
          strokeWidth="2.2"
          fill="none"
          filter={`url(#${glowId})`}
        />
        <path
          d="M25.5 43.5 L32 34"
          stroke={`url(#${gradId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      <g
        className={bladeClass}
        data-blade="lower"
        style={{ transformOrigin: "32px 34px", transformBox: "fill-box" }}
      >
        <path
          d="M32 34 L12 12"
          stroke={`url(#${gradId})`}
          strokeWidth="2.4"
          strokeLinecap="round"
          filter={`url(#${glowId})`}
        />
        <path
          d="M13.5 10.5 L9 8.5 L10.8 14.2 Z"
          fill={`url(#${gradId})`}
        />
        <circle
          cx="44"
          cy="48"
          r="7"
          stroke={`url(#${gradId})`}
          strokeWidth="2.2"
          fill="none"
          filter={`url(#${glowId})`}
        />
        <path
          d="M38.5 43.5 L32 34"
          stroke={`url(#${gradId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
