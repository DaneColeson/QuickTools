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

type MachineType = "BB" | "BH8525-BH13530" | "BH18530-BH25040" | "PA13530-PA16040" | "PA22030-PA22040";

const BoxBendingCalculator: React.FC = () => {
  const [machineType, setMachineType] = useState<MachineType>("BB");
  const [boxHeight, setBoxHeight] = useState<string>("");
  const [clampingStyle, setClampingStyle] = useState<string>("European");
  const [punchExtension, setPunchExtension] = useState<number>(100);
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

    // Determine ram width
    const ramWidth = ramWidths[machineType] || 0;

    // Calculate tool height requirement
    const toolHeight = (boxHeightNum / 0.707) + ramWidth * 0.563;

    // Determine total open height
    const baseOpenHeight = machineType.startsWith("BB")
      ? openHeights.BB
      : machineType.startsWith("BH")
      ? openHeights.BH
      : openHeights.PA;
    const totalOpenHeight = baseOpenHeight + additionalHeight;

    // Check open height availability
    const hasSufficientHeight = totalOpenHeight >= toolHeight;

    // Convert to inches (1 mm = 0.03937 inches)
    const toolHeightInches = toolHeight * 0.03937;
    const totalOpenHeightInches = totalOpenHeight * 0.03937;

    setResult(
      `Tool Height Requirement: ${toolHeight.toFixed(2)} mm (${toolHeightInches.toFixed(2)} inches)\n` +
      `Total Open Height Available: ${totalOpenHeight.toFixed(2)} mm (${totalOpenHeightInches.toFixed(2)} inches)\n` +
      `Open Height Availability: ${hasSufficientHeight ? "Yes" : "No"}`
    );
  };

  return (
    <div className="BoxBendingCalculator">
      <h2>Box Bending Calculator</h2>

      <label>
        Machine Type
        <select value={machineType} onChange={(e) => setMachineType(e.target.value as MachineType)}>
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
        <select value={clampingStyle} onChange={(e) => setClampingStyle(e.target.value)}>
          <option value="European">European</option>
          <option value="WT/New Standard">WT/New Standard</option>
          <option value="American Hydraulic">American Hydraulic</option>
        </select>
      </label>

      <label>
        Punch Extension (mm)
        <select value={punchExtension} onChange={(e) => setPunchExtension(parseInt(e.target.value))}>
          <option value={100}>100 mm</option>
          <option value={150}>150 mm</option>
          <option value={200}>200 mm</option>
        </select>
      </label>

      <label>
        Additional Open Height (mm)
        <select value={additionalHeight} onChange={(e) => setAdditionalHeight(parseInt(e.target.value))}>
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

export default BoxBendingCalculator;
