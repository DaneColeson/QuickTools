import React from "react";

const CustomIcon = ({ width = 200, height = 200, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="200" height="200" />
      <path
        d="M25 38.4C25 24.9587 25 18.2381 27.6158 13.1042C29.9168 8.58834 33.5883 4.9168 38.1042 2.61584C43.2381 0 49.9587 0 63.4 0H136.6C150.041 0 156.762 0 161.896 2.61584C166.412 4.9168 170.083 8.58834 172.384 13.1042C175 18.2381 175 24.9587 175 38.4V161.6C175 175.041 175 181.762 172.384 186.896C170.083 191.412 166.412 195.083 161.896 197.384C156.762 200 150.041 200 136.6 200H63.4C49.9587 200 43.2381 200 38.1042 197.384C33.5883 195.083 29.9168 191.412 27.6158 186.896C25 181.762 25 175.041 25 161.6V38.4Z"
        fill="url(#paint0_linear)"
      />
      <rect x="39" y="14" width="121" height="171" rx="10" fill="white" />
      <rect x="55" y="26" width="89" height="21" rx="4" fill="#FFEE00" />
      <rect x="55" y="61" width="21" height="21" rx="4" fill="#D9D9D9" />
      <rect x="55" y="103" width="21" height="21" rx="4" fill="#D9D9D9" />
      <rect x="55" y="145" width="21" height="21" rx="4" fill="#D9D9D9" />
      <path d="M82 62H135M82 72H135M82 81H135" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M82 104H135M82 114H135M82 123H135" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M82 146H135M82 156H135M82 165H135" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="paint0_linear" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D9D9D9" />
          <stop offset="0.55" stopColor="#737373" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CustomIcon;
