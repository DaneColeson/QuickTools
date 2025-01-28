import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/BoxBending.css";

const ramWidths = {
  BB: 50,
  "BH8525-BH13530": 50,
  "BH18530-BH25040": 80,
  "PA13530-PA16040": 50,
  "PA22030-PA22040": 60,
};

const openHeights = {
  BB: 430,
  BH: 530,
  PA: 500,
};

const clampingStyles: { [key in ClampingStyle]: { clamp: number; die: number } } = {
  "European": { clamp: 150, die: 60 },
  "American Manual": { clamp: 150, die: 93 },
  "American Hydraulic": { clamp: 70, die: 98 },
  "WT/New Standard": { clamp: 60, die: 110 },
};

type MachineType =
  | "BB"
  | "BH8525-BH13530"
  | "BH18530-BH25040"
  | "PA13530-PA16040"
  | "PA22030-PA22040";

type ClampingStyle = "European" | "American Manual" | "American Hydraulic" | "WT/New Standard";

const BoxBendingCalculator: React.FC = () => {
  const [clampingStyle, setClampingStyle] = useState<ClampingStyle>("European");
  const [machineType, setMachineType] = useState<MachineType>("BB");
  const [boxHeight, setBoxHeight] = useState<string>("");
  const [punchExtension, setPunchExtension] = useState<number>(0);
  const [additionalHeight, setAdditionalHeight] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    if (!boxHeight) {
      setResult("Please enter a valid box height.");
      return;
    }

    const boxHeightNum = parseFloat(boxHeight);
    if (isNaN(boxHeightNum)) {
      setResult("Invalid box height. Please enter a numerical value.");
      return;
    }

    const ramWidth = ramWidths[machineType] || 0;

    // Calculate tool height requirement
    const toolHeight = boxHeightNum / 0.707 + ramWidth * 0.563;

    // Determine base open height and apply clamping/die reductions
    const baseOpenHeight = machineType.startsWith("BB")
      ? openHeights.BB
      : machineType.startsWith("BH")
      ? openHeights.BH
      : openHeights.PA;

    const clampingStyleConfig = clampingStyles[clampingStyle];
    const reducedOpenHeight =
      baseOpenHeight -
      clampingStyleConfig.clamp -
      clampingStyleConfig.die +
      additionalHeight +
      punchExtension;

    // Calculate daylight
    const daylight = reducedOpenHeight - toolHeight;
    const hasSufficientHeight = daylight >= 0;

    // Convert to inches (1 mm = 0.03937 inches)
    const toolHeightInches = toolHeight * 0.03937;
    const reducedOpenHeightInches = reducedOpenHeight * 0.03937;
    const daylightInches = daylight * 0.03937;

    // Display results
    setResult(
      `Tool Height Requirement: ${toolHeight.toFixed(2)} mm (${toolHeightInches.toFixed(2)} inches)\n` +
        `Total Open Height Available: ${reducedOpenHeight.toFixed(2)} mm (${reducedOpenHeightInches.toFixed(2)} inches)\n` +
        `Available Daylight: ${daylight.toFixed(2)} mm (${daylightInches.toFixed(2)} inches)\n` +
        `Open Height Availability: ${hasSufficientHeight ? "Yes" : "No"}`
    );
  };

  const renderAdditionalHeight = () => {
    if (machineType === "PA13530-PA16040" || machineType === "PA22030-PA22040") {
      return null; // Do not show the dropdown for PA machines
    }
    return (
      <label>
        Additional Open Height (mm)
        <select
          value={additionalHeight}
          onChange={(e) => setAdditionalHeight(parseInt(e.target.value))}
        >
          {machineType === "BB" ? (
            <>
              <option value={0}>None</option>
              <option value={100}>+100mm</option>
            </>
          ) : (
            <>
              <option value={0}>None</option>
              <option value={100}>+100mm</option>
              <option value={200}>+200mm</option>
            </>
          )}
        </select>
      </label>
    );
  };

  return (
    <div className="BoxBendingCalculator">
      <h2>Box Bending Calculator</h2>

      <label>
        Machine Type
        <select
          value={machineType}
          onChange={(e) => setMachineType(e.target.value as MachineType)}
        >
          <option value="BB">BB</option>
          <option value="BH8525-BH13530">BH8525-BH13530</option>
          <option value="BH18530-BH25040">BH18530-BH25040</option>
          <option value="PA13530-PA16040">PA13530-PA16040</option>
          <option value="PA22030-PA22040">PA22030-PA22040</option>
        </select>
      </label>

      <label>
        Box Height (mm)
        <input
          type="number"
          value={boxHeight}
          onChange={(e) => setBoxHeight(e.target.value)}
          placeholder="Enter box height"
        />
      </label>

      <label>
        Upper Clamping Style
        <select
          value={clampingStyle}
          onChange={(e) => setClampingStyle(e.target.value as ClampingStyle)}
        >
          <option value="European">European (150mm)</option>
          <option value="American Manual">American Manual (150mm)</option>
          <option value="WT/New Standard">WT/New Standard (70mm)</option>
          <option value="American Hydraulic">American Hydraulic (60mm)</option>
        </select>
      </label>

      <label>
        Punch Extension (mm)
        <select
          value={punchExtension}
          onChange={(e) => setPunchExtension(parseInt(e.target.value))}
        >
          <option value={0}>None</option>
          <option value={50}>50mm</option>
          <option value={100}>100mm</option>
          <option value={150}>150mm</option>
          <option value={200}>200mm</option>
        </select>
      </label>

      {/* Conditional rendering of Additional Open Height */}
      {renderAdditionalHeight()}

      <button onClick={handleCalculate}>Calculate</button>

      {result && <div className="result-output">{result}</div>}

      {/* Home Button */}
      <Link to="/" className="button home-button">
        Home
      </Link>
    </div>
  );
};

export default BoxBendingCalculator;
