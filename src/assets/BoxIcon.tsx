import React from "react";

const BoxIcon: React.FC<{ width?: number; height?: number; className?: string }> = ({
  width = 100,
  height = 80,
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
      <path
        d="M100 0L199.593 50V150L100 200L0.407082 150V50L100 0Z"
        fill="url(#paint0_linear_0_1)"
      />
      <line x1="0.223607" y1="49.5528" x2="100.224" y2="99.5528" stroke="white" />
      <line x1="199.222" y1="50.4481" x2="100.222" y2="99.4481" stroke="white" />
      <line x1="100.5" y1="99" x2="100.5" y2="199" stroke="white" />
      <line x1="99.5" y1="99" x2="99.5" y2="199" stroke="white" />
      <path
        d="M99.5 0L199 49.5L99.5 99L0 49.5L99.5 0Z"
        fill="url(#paint1_linear_0_1)"
      />
      <line x1="99.5" x2="99.5" y2="100" stroke="white" />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_0_1"
        x1="100"
        y1="0"
        x2="100"
        y2="200"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D8D2D2" />
        <stop offset="0.805" stopColor="#726F6F" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_0_1"
        x1="99.5"
        y1="0"
        x2="99.5"
        y2="99"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.31" stopColor="#B4AFAF" />
        <stop offset="1" stopColor="#272626" />
      </linearGradient>
      <clipPath id="clip0_0_1">
        <rect width="200" height="200" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default BoxIcon;
export {}