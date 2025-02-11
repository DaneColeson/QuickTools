import React from "react";

interface RobotIconProps extends React.SVGProps<SVGSVGElement> {}

const RobotIcon = (props: RobotIconProps) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="200" height="200" />
    <rect
      x="34.8255"
      y="103.716"
      width="32.1418"
      height="66.9611"
      transform="rotate(-45 34.8255 103.716)"
      fill="#FFEA00"
      stroke="black"
      strokeWidth="0.5"
    />
    <rect
      x="106.053"
      y="31.0597"
      width="19.2123"
      height="28.6574"
      transform="rotate(-45 106.053 31.0597)"
      fill="#FFEA00"
      stroke="black"
      strokeWidth="0.5"
    />
    <rect
      x="126.858"
      y="48.9007"
      width="16.1903"
      height="7.36245"
      rx="2"
      transform="rotate(-45 126.858 48.9007)"
      fill="#030302"
    />
    <rect
      x="131.112"
      y="55.3358"
      width="19.0814"
      height="15.0304"
      rx="2"
      transform="rotate(-45 131.112 55.3358)"
      fill="#514F4F"
    />
    <rect
      x="50.2495"
      y="100.474"
      width="22.3917"
      height="99.2545"
      transform="rotate(-135 50.2495 100.474)"
      fill="#FFEA00"
      stroke="black"
      strokeWidth="0.5"
    />
    <rect
      x="50"
      y="186"
      width="100"
      height="14"
      rx="5"
      fill="url(#paint0_linear)"
    />
    <rect
      x="63"
      y="167"
      width="74"
      height="19"
      rx="5"
      fill="url(#paint1_linear)"
    />
    <rect
      x="75.25"
      y="117.25"
      width="49.5"
      height="49.5"
      rx="4.75"
      fill="url(#paint2_linear)"
      stroke="black"
      strokeWidth="0.5"
    />
    <circle cx="99" cy="142" r="23.5" stroke="black" strokeWidth="3" />
    <circle cx="99" cy="141" r="6.5" fill="#FF0000" stroke="black" strokeWidth="3" />
    <circle cx="147.5" cy="58.5" r="7.5" fill="white" />
    <rect
      x="31.25"
      y="76.25"
      width="29.5"
      height="29.5"
      rx="4.75"
      fill="#FFEA00"
      stroke="black"
      strokeWidth="0.5"
    />
    <rect
      x="102.25"
      y="14.25"
      width="19.5"
      height="19.5"
      rx="4.75"
      fill="#FFEA00"
      stroke="black"
      strokeWidth="0.5"
    />
    <circle cx="46" cy="91" r="13.5" stroke="black" strokeWidth="3" />
    <circle cx="112" cy="24" r="8.5" stroke="black" strokeWidth="3" />
    <circle cx="46" cy="91" r="6.5" fill="#FF0000" stroke="black" strokeWidth="3" />
    <circle cx="112" cy="24" r="4.5" fill="#FF0000" stroke="black" />
    <defs>
      <linearGradient id="paint0_linear" x1="50" y1="193" x2="150" y2="193" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D9D9D9" />
        <stop offset="1" stopColor="#737373" />
      </linearGradient>
      <linearGradient id="paint1_linear" x1="63" y1="176.5" x2="137" y2="176.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#514F4F" />
        <stop offset="1" stopColor="#B7B3B3" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="100" y1="117" x2="100" y2="167" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFEA00" />
        <stop offset="1" stopColor="#998C00" />
      </linearGradient>
    </defs>
  </svg>
);

export default RobotIcon;
