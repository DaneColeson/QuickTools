import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUnit } from "./UnitContext"; // ✅ Global unit context
import "../styles/App.css";

// ✅ Machine specifications (both mm & inches)
type MachineType = 'BB' | 'BH' | 'PA';

const machines: Record<MachineType, { openHeight: { mm: number; in: number }; stroke: { mm: number; in: number } }> = {
  BB: { openHeight: { mm: 430, in: 16.93 }, stroke: { mm: 150, in: 5.91 } },
  BH: { openHeight: { mm: 530, in: 20.87 }, stroke: { mm: 250, in: 9.84 } },
  PA: { openHeight: { mm: 500, in: 19.69 }, stroke: { mm: 200, in: 7.87 } },
};

// ✅ Upper & Lower Clamping Options
const upperClampingOptions = [
  { label: "European", height: { mm: 150, in: 5.91 } },
  { label: "American Manual", height: { mm: 150, in: 5.91 } },
  { label: "American - 1000 Series", height: { mm: 91.4, in: 3.60 } },
  { label: "American - 2000 Series", height: { mm: 91.4, in: 3.60 } },
  { label: "WT - 1000 Series", height: { mm: 62, in: 2.44 } },
  { label: "WT - 2000 Series", height: { mm: 62, in: 2.44 } },

];

const lowerClampingOptions = [
  { label: "European - 1v Die Holder", height: { mm: 28, in: 1.10 } },
  { label: "European - Large 1v Die Holder", height: { mm: 50, in: 1.97 } },
  { label: "American Manual", height: { mm: 50.8, in: 2.00 } },
  { label: "American - 1000 Series", height: { mm: 55, in: 2.17 } },
  { label: "American - 2000 Series", height: { mm: 55, in: 2.17 } },
  { label: "WT - 1000 Series", height: { mm: 55, in: 2.17 } },
  { label: "WT - 2000 Series", height: { mm: 55, in: 2.17 } },
];

const additionalHeightOptions = [
  { label: "None", value: { mm: 0, in: 0 } },
  { label: "+100 mm", value: { mm: 100, in: 3.94 } },
  { label: "+200 mm", value: { mm: 200, in: 7.87 } },
];

// ✅ Common Tool Heights
const commonPunchHeights = {
  European: { mm: [66, 105, 120, 160], in: [2.60, 4.13, 4.72, 6.30] },
  "American Manual": { mm: [95, 145, 222], in: [3.74, 5.71, 8.74] },
  "American - 1000 Series": { mm: [95, 145, 222], in: [3.74, 5.71, 8.74] },
  "WT - 1000 Series": { mm: [120, 163, 220], in: [4.72, 6.42, 8.66] },
  "WT - 2000 Series": { mm: [120, 163, 220], in: [4.72, 6.42, 8.66] },
};

const commonDieHeights = {
  "European - 1v Die Holder": { mm: [28, 50, 75], in: [1.10, 1.97, 2.95] },
  "European - Large 1v Die Holder": { mm: [50, 60, 95], in: [1.97, 2.36, 3.74] },
  "American Manual": { mm: [40, 60, 80, 100], in: [1.57, 2.36, 3.15, 3.94] },
  "American - 1000 Series": { mm: [40, 60, 80, 100], in: [1.57, 2.36, 3.15, 3.94] },
  "WT - 1000 Series": { mm: [55, 100], in: [2.17, 3.94] },
  "WT - 2000 Series": { mm: [55, 100], in: [2.17, 3.94] },
};



const DaylightCalculator: React.FC = () => {
  const { unit, toggleUnit } = useUnit(); // ✅ Unit context
  const [machineType, setMachineType] = useState<MachineType>("BB");
  const [upperClamping, setUpperClamping] = useState<keyof typeof commonPunchHeights>(upperClampingOptions[0].label as keyof typeof commonPunchHeights);
  const [lowerClamping, setLowerClamping] = useState<keyof typeof commonDieHeights>(lowerClampingOptions[0].label as keyof typeof commonDieHeights);
  const [punchHeight, setPunchHeight] = useState("");
  const [dieHeight, setDieHeight] = useState("");
  const [additionalHeight, setAdditionalHeight] = useState(0);

  const punchHeightNum = parseFloat(punchHeight) || 0;
  const dieHeightNum = parseFloat(dieHeight) || 0;
  const machine = machines[machineType];
  const upperClamp = upperClampingOptions.find((opt) => opt.label === upperClamping)?.height[unit] || 0;
  const lowerClamp = lowerClampingOptions.find((opt) => opt.label === lowerClamping)?.height[unit] || 0;
  const addHeight = additionalHeightOptions.find((opt) => opt.value[unit] === additionalHeight)?.value[unit] || 0;

  const availableOpenHeight = machine.openHeight[unit] - (upperClamp + lowerClamp) + addHeight;
  const daylight = availableOpenHeight - (punchHeightNum + dieHeightNum);
  const hasInterference = daylight > machine.stroke[unit];


  return (
    <div className="DaylightCalculator">
      <h2>Daylight Calculator</h2>

      <div className="unit-toggle">
        <span>mm</span>
        <label className="switch">
          <input type="checkbox" checked={unit === "in"} onChange={toggleUnit} />
          <span className="slider round"></span>
        </label>
        <span>inch</span>
      </div>

      <label>Machine Type</label>
      <select value={machineType} onChange={(e) => setMachineType(e.target.value as MachineType)}>
        {Object.keys(machines).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>

      <label>Upper Clamping Style</label>
      <select value={upperClamping} onChange={(e) => setUpperClamping(e.target.value as keyof typeof commonPunchHeights)}>
        {upperClampingOptions.map((opt) => (
          <option key={opt.label} value={opt.label}>{opt.label}</option>
        ))}
      </select>

      <label>Lower Clamping Style</label>
      <select value={lowerClamping} onChange={(e) => setLowerClamping(e.target.value as keyof typeof commonDieHeights)}>
        {lowerClampingOptions.map((opt) => (
          <option key={opt.label} value={opt.label}>{opt.label}</option>
        ))}
      </select>

      
      <div className="common-heights-container">
  <h3>Common Tool Heights</h3>
  <div className="common-heights-bubble-container">
    <div className="common-height-bubble">
      <span className="bubble-label">Punch ({unit})</span>
      <div className="bubble-values">
        {commonPunchHeights[upperClamping]?.[unit]?.map((height) => (
          <span key={height} className="bubble">{height}</span>
        )) || <span className="bubble">N/A</span>}
      </div>
    </div>

    <div className="common-height-bubble">
      <span className="bubble-label">Die ({unit})</span>
      <div className="bubble-values">
        {commonDieHeights[lowerClamping]?.[unit]?.map((height) => (
          <span key={height} className="bubble">{height}</span>
        )) || <span className="bubble">N/A</span>}
      </div>
    </div>
  </div>
</div>

      <label>Punch Height ({unit})</label>
      <input type="number" value={punchHeight} onChange={(e) => setPunchHeight(e.target.value)} />

      <label>Die Height ({unit})</label>
      <input type="number" value={dieHeight} onChange={(e) => setDieHeight(e.target.value)} />

      <label>Additional Open Height</label>
      <select value={additionalHeight} onChange={(e) => setAdditionalHeight(parseFloat(e.target.value))}>
        {additionalHeightOptions.map((opt) => (
          <option key={opt.label} value={opt.value[unit]}>{opt.label}</option>
        ))}
      </select>

      


 <div className="section-header">Results</div>
  <div className="results-container">
    <div className="result-item">
      <span className="result-bubble">{availableOpenHeight.toFixed(2)}</span>
      <span className="result-label">Machine Open Height</span>
    </div>
    <div className="result-item">
      <span className="result-bubble">{daylight.toFixed(2)}</span>
      <span className="result-label">Daylight with Tools</span>
    </div>
    <div className="result-item">
      <span className={`result-bubble ${hasInterference ? "interference" : ""}`}>
        {hasInterference ? "Yes" : "No"}
      </span>
      <span className="result-label">Stroke Interference</span>
    </div>
  </div>


      <Link to="/" className="button home-button">Home</Link>
    </div>
  );
};

export default DaylightCalculator;
