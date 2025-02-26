import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { useUnit } from "./UnitContext"; // ✅ Import global unit context

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

const clampingStyles = {
  European: { clamp: 150, die: 60 },
  "American Manual": { clamp: 150, die: 93 },
  "American Hydraulic": { clamp: 91.4, die: 98 },
  "WT/New Standard": { clamp: 62, die: 110 },
};

type MachineType =
  | "BB"
  | "BH8525-BH13530"
  | "BH18530-BH25040"
  | "PA13530-PA16040"
  | "PA22030-PA22040";

type ClampingStyle = "European" | "American Manual" | "American Hydraulic" | "WT/New Standard";

const BoxBendingCalculator: React.FC = () => {
  const { unit, toggleUnit } = useUnit(); // ✅ Use the global unit context

  const [clampingStyle, setClampingStyle] = useState<ClampingStyle>("European");
  const [machineType, setMachineType] = useState<MachineType>("BB");
  const [boxHeight, setBoxHeight] = useState<string | undefined>(undefined);
  const [punchExtension, setPunchExtension] = useState<number>(0);
  const [extendedOpenHeight, setExtendedOpenHeight] = useState<number>(0);
  const [result, setResult] = useState<React.ReactNode>(null);

  const conversionFactor = unit === "in" ? 0.03937 : 1;
  const unitLabel = unit === "in" ? "inches" : "mm";

  const handleCalculate = () => {
    if (!boxHeight) {
      setResult("Please enter a valid box height.");
      return;
    }

    const boxHeightNum = parseFloat(boxHeight) / (unit === "in" ? 0.03937 : 1);
    if (isNaN(boxHeightNum)) {
      setResult("Invalid box height. Please enter a numerical value.");
      return;
    }

    const ramWidth = ramWidths[machineType as MachineType] || 0;
    const toolHeight = (boxHeightNum / 0.707) + (ramWidth * 0.563);

    const baseOpenHeight = machineType.startsWith("BB")
      ? openHeights.BB
      : machineType.startsWith("BH")
      ? openHeights.BH
      : openHeights.PA;

    const clampingStyleConfig = clampingStyles[clampingStyle as ClampingStyle];
    const reducedOpenHeight =
      baseOpenHeight - clampingStyleConfig.clamp - clampingStyleConfig.die + extendedOpenHeight + punchExtension;

    const daylight = reducedOpenHeight - toolHeight;
    const hasSufficientHeight = daylight >= 0;

    // Convert results based on the selected unit
    const convertedToolHeight = unit === "in" ? (toolHeight * 0.03937).toFixed(2) : toolHeight.toFixed(2);
    const convertedOpenHeight = (reducedOpenHeight * conversionFactor).toFixed(2);
    const convertedDaylight = (daylight * conversionFactor).toFixed(2);

    setResult(
      <div className="results-container">
        <div className="result-item">
          <span className="result-bubble">{convertedToolHeight}</span>
          <span className="result-label">Tool Height Required</span>
        </div>
        <div className="result-item">
          <span className="result-bubble">{convertedOpenHeight}</span>
          <span className="result-label">Available Open Height</span>
        </div>
        <div className="result-item">
          <span className="result-bubble">{convertedDaylight}</span>
          <span className="result-label">Available Daylight After Tools</span>
        </div>
        <div className="result-item">
          <span className={`result-bubble ${hasSufficientHeight ? "" : "interference"}`}>{hasSufficientHeight ? "Yes" : "No"}</span>
          <span className="result-label">Open Height Available</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    handleCalculate();
  }, [boxHeight, clampingStyle, extendedOpenHeight, machineType, punchExtension, unit, conversionFactor]);

  useEffect(() => {
    if (boxHeight) {
      const numericBoxHeight = parseFloat(boxHeight);
      if (!isNaN(numericBoxHeight)) {
        // Convert box height when the unit is changed
        const convertedBoxHeight =
          unit === "in" ? (numericBoxHeight * 0.03937).toFixed(2) : (numericBoxHeight / 0.03937).toFixed(2);
        setBoxHeight(convertedBoxHeight);
      }
    }
  }, [unit]);
  

  const punchExtensionValues = [0, 50, 100, 150, 200].map((value) => ({
    mm: value,
    in: parseFloat((value * 0.03937).toFixed(2)),
  }));

  const extendedOpenHeightValues = [0, 100, 200].map((value) => ({
    mm: value,
    in: parseFloat((value * 0.03937).toFixed(2)),
  }));




  return (
    <div className="BoxBendingCalculator">
      <h2>Box Bending Calculator</h2>

      {/* ✅ Unit Toggle Switch */}
      <div className="unit-toggle">
        <span>mm</span>
        <label className="switch">
          <input type="checkbox" checked={unit === "in"} onChange={toggleUnit} />
          <span className="slider round"></span>
        </label>
        <span>inch</span>
      </div>

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
        Box Height ({unitLabel})
        <input type="number" value={boxHeight} onChange={(e) => setBoxHeight(e.target.value)} placeholder="Enter box height" />
      </label>

      <label>
        Upper Clamping Style
        <select value={clampingStyle} onChange={(e) => setClampingStyle(e.target.value as ClampingStyle)}>
          <option value="European">European</option>
          <option value="American Manual">American Manual</option>
          <option value="WT/New Standard">WT/New Standard</option>
          <option value="American Hydraulic">American Hydraulic</option>
        </select>
      </label>

      <label>
        Punch Extension ({unitLabel})
        <select value={punchExtension} onChange={(e) => setPunchExtension(parseFloat(e.target.value))}>
          {punchExtensionValues.map((val) => (
            <option key={val.mm} value={unit === "mm" ? val.mm : val.in}>
              {unit === "mm" ? `${val.mm} mm` : `${val.in} in`}
            </option>
          ))}
        </select>
      </label>

      <label>
        Extended Open Height ({unitLabel})
        <select value={extendedOpenHeight} onChange={(e) => setExtendedOpenHeight(parseFloat(e.target.value))}>
          {extendedOpenHeightValues.map((val) => (
            <option key={val.mm} value={unit === "mm" ? val.mm : val.in}>
              {unit === "mm" ? `${val.mm} mm` : `${val.in} in`}
            </option>
          ))}
        </select>
      </label>
      <div className="section-header">Results</div>
      {result}

      <Link to="/" className="button home-button">
        Home
      </Link>
    </div>


    
  
  );

};



export default BoxBendingCalculator;
