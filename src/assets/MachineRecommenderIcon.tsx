import React from "react";

const BoxIcon: React.FC<{ width?: number; height?: number; className?: string }> = ({
  width = 100,
  height = 80,
  className = "",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 254 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_12_3)">
      <rect y="29" width="200" height="67" rx="10" fill="url(#paint0_linear)" />
      <rect width="200" height="38" rx="10" fill="#D9D9D9" />
      
      {/* Left & Right Blocks */}
      <path d="M0 4C0 1.79 1.79 0 4 0H39C41.21 0 43 1.79 43 4V50C43 52.21 41.21 54 39 54H4C1.79 54 0 52.21 0 50V4Z" fill="#D1424A" />
      <rect x="157" width="43" height="54" rx="4" fill="#D1424A" />
      <rect width="43" height="54" rx="4" fill="#D1424A" />

      {/* Base Sections */}
      <rect y="144" width="200" height="56" rx="10" fill="url(#paint1_linear)" />
      {[10, 36, 62, 88, 114, 141, 168].map((x, i) => (
        <rect key={i} x={x} y="96" width="22" height="24" fill="url(#paint2_linear)" />
      ))}

      {/* Bottom Details */}
      <rect x="10" y="141" width="180" height="3" fill="url(#paint9_linear)" />
      <path d="M200 54H231C232.1 54 233 54.89 233 56C233 57.1 232.1 58 231 58H200V54Z" fill="#D9D9D9" />
      <rect x="206" y="96" width="48" height="36" rx="2" fill="url(#paint11_linear)" />
      <rect x="206" y="96" width="48" height="24" rx="2" fill="black" />
      <rect x="208" y="98" width="44" height="20" rx="2" fill="#D9D9D9" />
      <rect x="208" y="104" width="44" height="8" fill="#1DAE00" />
      <circle cx="230" cy="126" r="5" fill="#D9D9D9" />
    </g>

    {/* Gradients & Clipping */}
    <defs>
      <linearGradient id="paint0_linear" x1="100" y1="29" x2="100" y2="96" gradientUnits="userSpaceOnUse">
        <stop offset="0.77" stopColor="#D9D9D9" />
        <stop offset="1" stopColor="#737373" />
      </linearGradient>
      <linearGradient id="paint1_linear" x1="0" y1="172" x2="200" y2="172" gradientUnits="userSpaceOnUse">
        <stop offset="0.615" stopColor="#656B6C" />
        <stop offset="1" stopColor="#C4D0D2" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="21" y1="96" x2="21" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0.31" stopColor="#393939" />
        <stop offset="0.955" stopColor="#545454" />
      </linearGradient>
      <linearGradient id="paint9_linear" x1="10" y1="142.5" x2="190" y2="142.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D9D9D9" />
        <stop offset="1" stopColor="#737373" />
      </linearGradient>
      <linearGradient id="paint11_linear" x1="254" y1="114" x2="206" y2="114" gradientUnits="userSpaceOnUse">
        <stop offset="0.775" stopColor="#737373" />
        <stop offset="1" stopColor="#D9D9D9" />
      </linearGradient>
      <clipPath id="clip0_12_3">
        <rect width="254" height="200" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default BoxIcon;
export {};
