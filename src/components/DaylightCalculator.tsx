import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/DaylightCalculator.css";

const machines = {
  BB: { openHeight: 430, stroke: 150 },
  BH: { openHeight: 530, stroke: 250 },
  PA: { openHeight: 500, stroke: 200 },
};

const clampingStyles = {
  European: { upper: 150, lower: 150 },
  "American Manual": { upper: 150, lower: 150 },
  "American Hydraulic": { upper: 70, lower: 98 },
  "WT/New Standard": { upper: 60, lower: 110 },
};

type MachineType = keyof typeof machines;
type ClampingStyle = keyof typeof clampingStyles;

const DaylightCalculator: React.FC = () => {
  const [machineType, setMachineType] = useState<MachineType>("BB");
  const [upperClamping, setUpperClamping] = useState<ClampingStyle>("European");
  const [lowerClamping, setLowerClamping] = useState<ClampingStyle>("European");
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
    const upperClamp = clampingStyles[upperClamping].upper;
    const lowerClamp = clampingStyles[lowerClamping].lower;

    // Calculate available open height
    const availableOpenHeight =
      machine.openHeight - (upperClamp + lowerClamp) + additionalHeight;

    // Calculate daylight
    const daylight = availableOpenHeight - (punchHeightNum + dieHeightNum);

    // Check for interference
    const hasInterference = daylight > machine.stroke;

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
          onChange={(e) => setUpperClamping(e.target.value as ClampingStyle)}
        >
          {Object.keys(clampingStyles).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </label>

      <label>
        Lower Clamping Style
        <select
          value={lowerClamping}
          onChange={(e) => setLowerClamping(e.target.value as ClampingStyle)}
        >
          {Object.keys(clampingStyles).map((key) => (
            <option key={key} value={key}>
              {key}
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
