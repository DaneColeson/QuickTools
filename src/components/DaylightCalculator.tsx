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
  { label: "American Hydraulic", height: 70 },
  { label: "WT/New Standard", height: 60 },
];

const lowerClampingOptions = [
  { label: "European - Die Holder - 28mm", height: 28 },
  { label: "European - Die Holder - 50mm", height: 50 },
  { label: "American Manual - Die Holder", height: 0 },
  { label: "American Hydraulic - Die Holder - 98mm", height: 98 },
  { label: "WT/New Standard - Die Holder - 110mm", height: 110 },
];

type MachineType = keyof typeof machines;

const DaylightCalculator: React.FC = () => {
  const [machineType, setMachineType] = useState<MachineType>("BB");
  const [upperClamping, setUpperClamping] = useState(upperClampingOptions[0].height);
  const [lowerClamping, setLowerClamping] = useState(lowerClampingOptions[0].height);
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

    // Calculate available open height
    const availableOpenHeight =
      machine.openHeight - (upperClamping + lowerClamping) + additionalHeight;

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
          onChange={(e) => setUpperClamping(parseInt(e.target.value))}
        >
          {upperClampingOptions.map((option) => (
            <option key={option.label} value={option.height}>
              {option.label} ({option.height} mm)
            </option>
          ))}
        </select>
      </label>

      <label>
        Lower Clamping Style
        <select
          value={lowerClamping}
          onChange={(e) => setLowerClamping(parseInt(e.target.value))}
        >
          {lowerClampingOptions.map((option) => (
            <option key={option.label} value={option.height}>
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
