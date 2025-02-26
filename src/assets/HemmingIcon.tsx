import React from "react";

const HemmingIcon: React.FC<{ width?: number; height?: number; className?: string }> = ({
  width = 100,
  height = 100,
  className = "",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_0_1)">
      {/* Bottom Bar */}
      <rect x="31" y="137" width="166" height="63" fill="url(#paint0_linear)" />

      {/* Circular End */}
      <ellipse cx="32.5" cy="168.5" rx="32.5" ry="31.5" fill="#656B6C" />
      
      {/* Hemming Surface */}
      <path d="M35 167C35 164.79 36.79 163 39 163H200V173H39C36.79 173 35 171.21 35 169V167Z" fill="white" />

      {/* Hemming Block */}
      <g filter="url(#filter0_d)">
        <rect x="41" y="76" width="114" height="54" fill="#D9D9D9" />
      </g>

      {/* Triangle Sections */}
      <path d="M65.5 43L90.18 76H40.82L65.5 43Z" fill="#D9D9D9" />
      <path d="M130.5 43L155.18 76H105.82L130.5 43Z" fill="#D9D9D9" />

      {/* Central Bar */}
      <rect x="65" width="65" height="76" fill="#D9D9D9" />
    </g>

    {/* Filters & Gradients */}
    <defs>
      <filter id="filter0_d" x="37" y="76" width="122" height="62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>

      <linearGradient id="paint0_linear" x1="31" y1="168.5" x2="197" y2="168.5" gradientUnits="userSpaceOnUse">
        <stop offset="0.22" stopColor="#656B6C" />
        <stop offset="1" stopColor="#C4D0D2" />
      </linearGradient>

      <clipPath id="clip0_0_1">
        <rect width="200" height="200" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default HemmingIcon;
export {};
