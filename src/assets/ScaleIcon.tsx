import * as React from "react";
interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {}

const ScaleIcon = (props: SVGComponentProps) => (
  <svg
    width={200}
    height={200}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1_2)">
      <rect width={200} height={200} rx={25} fill="#999696" />
      <rect x={20} y={20} width={160} height={160} rx={25} fill="#4D5E8A" />
      <circle cx={100} cy={180} r={25} fill="#999696" />
      <circle
        cx={100}
        cy={73}
        r={48.5}
        fill="#D9D9D9"
        stroke="black"
        strokeWidth={3}
      />
      <rect x={43} y={70} width={117} height={61} fill="#4D5E8A" />
      <line
        x1={51}
        y1={68.5}
        x2={149}
        y2={68.5}
        stroke="black"
        strokeWidth={3}
      />
      <line
        x1={100.5}
        y1={25}
        x2={100.5}
        y2={33}
        stroke="black"
        strokeWidth={3}
      />
      <line
        x1={82.3858}
        y1={27.426}
        x2={85.4473}
        y2={34.817}
        stroke="black"
        strokeWidth={3}
      />
      <line
        x1={69.0607}
        y1={35.9393}
        x2={74.7175}
        y2={41.5962}
        stroke="black"
        strokeWidth={3}
      />
      <line
        x1={52}
        y1={66.5}
        x2={60}
        y2={66.5}
        stroke="black"
        strokeWidth={3}
      />
      <line
        x1={57.574}
        y1={49.6142}
        x2={64.9651}
        y2={52.6756}
        stroke="black"
        strokeWidth={3}
      />
      <line
        x1={119.066}
        y1={28.2521}
        x2={116.004}
        y2={35.6431}
        stroke="black"
        strokeWidth={3}
      />
      <line
        x1={134.718}
        y1={39.0607}
        x2={129.061}
        y2={44.7175}
        stroke="black"
        strokeWidth={3}
      />
      <line
        x1={143.965}
        y1={52.3858}
        x2={136.574}
        y2={55.4473}
        stroke="black"
        strokeWidth={3}
      />
      <line
        x1={148}
        y1={68.5}
        x2={140}
        y2={68.5}
        stroke="black"
        strokeWidth={3}
      />
      <circle cx={100} cy={65} r={3} fill="#FF0000" />
      <path
        d="M83.1683 40.0143C82.6239 39.9213 82.1072 40.2873 82.0143 40.8317L80.4996 49.7033C80.4066 50.2477 80.7726 50.7644 81.317 50.8574C81.8614 50.9503 82.3781 50.5843 82.4711 50.0399L83.8174 42.154L91.7033 43.5004C92.2477 43.5934 92.7644 43.2274 92.8574 42.683C92.9503 42.1386 92.5843 41.6219 92.0399 41.5289L83.1683 40.0143ZM100.816 64.422L83.816 40.422L82.184 41.578L99.184 65.578L100.816 64.422Z"
        fill="#FF0000"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_2">
        <rect width={200} height={200} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default ScaleIcon;
