import React from "react";

const CustomIcon: React.FC<{ width?: number; height?: number }> = ({ width = 200, height = 200 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <circle cx="100" cy="77" r="38.5" fill="#515151" stroke="#F37373" strokeWidth="3" />
        <circle cx="100" cy="77" r="4" fill="#F37373" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M129.387 180.034C129.368 180.053 129.368 180.084 129.387 180.103C129.406 180.122 129.406 180.152 129.387 180.171L115.279 194.279C107.469 202.09 94.8054 202.09 86.9949 194.279L-26.1421 81.1421C-33.9526 73.3316 -33.9526 60.6683 -26.1421 52.8579C-18.3316 45.0474 -5.66835 45.0474 2.14214 52.8579L79.8553 130.571C91.571 142.287 110.566 142.287 122.282 130.571L202.995 49.8579C210.805 42.0474 223.469 42.0474 231.279 49.8578C239.09 57.6683 239.09 70.3316 231.279 78.1421L129.387 180.034Z"
          fill="#515151"
        />
        <line x1="100" y1="79" x2="100" y2="115" stroke="#F37373" strokeWidth="4" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="200" height="200" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CustomIcon;
