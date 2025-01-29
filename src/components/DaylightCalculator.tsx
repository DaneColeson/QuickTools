import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/DaylightCalculator.css";

const machines = {
  BB: { openHeight: 430, stroke: 150 },
  BH: { openHeight: 530, stroke: 250 },
  PA: { openHeight: 500, stroke: 200 },
};

// Updated clamping styles with detailed heights
const upperClampingOptions = [
  { label: "European", height: 150 },
  { label: "American Manual", height: 150 },
  { label: "American - 1000 Series", height: 91.4 },
  { label: "American - 2000 Series", height: 91.4 },
  { label: "WT - 1000 Series", height: 62 },
  { label: "WT - 2000 Series", height: 62 },
];

const lowerClampingOptions = [
  { label: "European - 1v Die Holder", height: 28 },
  { label: "European - Large 1v Die Holder", height: 50 },
  { label: "American Manual - Die Holder", height: 50.8 },
  { label: "American - 1000 Series", height: 55 },
  { label: "American - 2000 Series", height: 55 },
  { label: "WT - 1000 Series", height: 55 },
  { label: "WT - 2000 Series", height: 55 },
];

type MachineType = keyof typeof machines;

const commonPunchHeights = {
  European: [66, 105, 120, 160],
  "American Manual": [95, 145, 222],
  "American - 1000 Series": [95, 145, 222],
  "WT - 1000 Series": [120, 163, 220],
  "WT - 2000 Series": [120, 163, 220]
};

const commonDieHeights = {
  "European - 1v Die Holder": [28, 50, 75],
  "European - Large 1v Die Holder": [50, 60],
  "American Manual": [40, 60, 80, 100],
  "American - 1000 Series": [40, 60, 80, 100],
  "WT - 1000 Series": [55, 100],
  "WT - 2000 Series": [55, 100]
};

const DaylightCalculator: React.FC = () => {
  const [machineType, setMachineType] = useState<MachineType>("BB");
  const [upperClamping, setUpperClamping] = useState<keyof typeof commonPunchHeights>(upperClampingOptions[0].label as keyof typeof commonPunchHeights);
  const [lowerClamping, setLowerClamping] = useState<keyof typeof commonDieHeights>(lowerClampingOptions[0].label as keyof typeof commonDieHeights);
  const [punchHeight, setPunchHeight] = useState<string>("");
  const [dieHeight, setDieHeight] = useState<string>("");
  const [additionalHeight, setAdditionalHeight] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    if (!punchHeight || !dieHeight) {
      setResult("Please enter valid punch and die heights.");
      return;
    }

    const punchHeightNum = parseFloat(punchHeight);
    const dieHeightNum = parseFloat(dieHeight);

    if (isNaN(punchHeightNum) || isNaN(dieHeightNum)) {
      setResult("Invalid punch or die height. Please enter numerical values.");
      return;
    }

    const machine = machines[machineType];
    const upperClampHeight = upperClampingOptions.find((clamp) => clamp.label === upperClamping)?.height || 0;
    const lowerClampHeight = lowerClampingOptions.find((clamp) => clamp.label === lowerClamping)?.height || 0;

    // Calculate available open height
    const availableOpenHeight =
      machine.openHeight - (upperClampHeight + lowerClampHeight) + (machineType === "PA" ? 0 : additionalHeight);

    // Calculate daylight
    const daylight = availableOpenHeight - (punchHeightNum + dieHeightNum);

    // Check for interference
    const hasInterference = daylight <= machine.stroke;

    // Convert to inches (1 mm = 0.03937 inches)
    const availableOpenHeightInches = availableOpenHeight * 0.03937;
    const daylightInches = daylight * 0.03937;

    setResult(
      `Available Open Height: ${availableOpenHeight.toFixed(2)} mm (${availableOpenHeightInches.toFixed(
        2
      )} inches)\n` +
        `Available Daylight: ${daylight.toFixed(2)} mm (${daylightInches.toFixed(
          2
        )} inches)\n` +
        `Stroke Interference: ${hasInterference ? "Yes" : "No"}`
    );
  };

  return (
    <div className="DaylightCalculator">
      <h2>Daylight Calculator</h2>

      <label>
        Machine Type
        <select
          value={machineType}
          onChange={(e) => setMachineType(e.target.value as MachineType)}
        >
          {Object.keys(machines).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </label>

      <label>
        Upper Clamping Style
        <select
          value={upperClamping}
          onChange={(e) => setUpperClamping(e.target.value as keyof typeof commonPunchHeights)}
        >
          {upperClampingOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label} ({option.height} mm)
            </option>
          ))}
        </select>
      </label>

      <label>
        Lower Clamping Style
        <select
          value={lowerClamping}
          onChange={(e) => setLowerClamping(e.target.value as keyof typeof commonDieHeights)}
        >
          {lowerClampingOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label} ({option.height} mm)
            </option>
          ))}
        </select>
      </label>

      <label>
        Punch Height (mm)
        <input
          type="number"
          value={punchHeight}
          onChange={(e) => setPunchHeight(e.target.value)}
          placeholder="Enter punch height"
        />
      </label>

      <label>
        Die Height (mm)
        <input
          type="number"
          value={dieHeight}
          onChange={(e) => setDieHeight(e.target.value)}
          placeholder="Enter die height"
        />
      </label>

      {machineType !== "PA" && (
        <label>
          Additional Open Height (mm)
          <select
            value={additionalHeight}
            onChange={(e) => setAdditionalHeight(parseInt(e.target.value))}
          >
            <option value={0}>None</option>
            <option value={100}>+100 mm</option>
            <option value={200}>+200 mm</option>
          </select>
        </label>
      )}

      <div>
        <h3>Common Heights</h3>
        <table>
          <thead>
            <tr>
              <th>Punch Heights (mm)</th>
              <th>Die Heights (mm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{commonPunchHeights[upperClamping]?.join(", ") || "N/A"}</td>
              <td>{commonDieHeights[lowerClamping]?.join(", ") || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button onClick={handleCalculate}>Calculate</button>

      {result && <div className="result-output">{result}</div>}

      {/* Home Button */}
      <Link to="/" className="button home-button">
        Home
      </Link>
    </div>
  );
};

export default DaylightCalculator;
