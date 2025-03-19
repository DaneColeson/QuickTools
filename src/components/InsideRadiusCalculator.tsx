import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUnit } from "./UnitContext"; // ✅ Use the global unit context
import "../styles/App.css";

type MaterialType =
  | "Mild Steel (60ksi)"
  | "Stainless Steel (90ksi)"
  | "Aluminum 5052 (33ksi)"
  | "Structural Steel (120ksi)"
  | "High Strength Steel (150ksi)";

// ✅ Material Data with Tensile Strength & Percentage Rules
const materialData: Record<MaterialType, { tensileStrength: number; percentage: number }> = {
  "Mild Steel (60ksi)": { tensileStrength: 60000, percentage: 0.16 },
  "Stainless Steel (90ksi)": { tensileStrength: 90000, percentage: 0.21 },
  "Aluminum 5052 (33ksi)": { tensileStrength: 33000, percentage: 0.10 },
  "Structural Steel (120ksi)": { tensileStrength: 120000, percentage: 0.30 },
  "High Strength Steel (150ksi)": { tensileStrength: 150000, percentage: 0.30 }
};

const airBendChart: Record<number, number | string> = {
  0.157: 0.026,
  0.236: 0.039,
  0.276: 0.046,
  0.315: 0.052,
  0.394: 0.066,
  0.472: 0.079,
  0.551: 0.092,
  0.630: 0.105,
  0.709: 0.118,
  0.787: 0.131,
  0.984: 0.164,
  1.260: 0.210,
  1.575: 0.626,
  1.969: 0.328,
  2.480: 0.413,
  3.150: 0.525,
  3.937: 0.656,
  4.921: 0.820,
  6.299: 1.050,
  7.874: 1.312,
  9.843: 1.640
};

// ✅ Thickness & V-Die Dropdown Options
const thicknessOptions = [ 0.024, 0.030, 0.040, 0.050, 0.060, 0.080, 0.090, 0.105, 0.125, 0.188, 0.250, 0.313, 0.375, 0.500, 0.625, 0.750, 1.000];
const vDieOptions = [0.236, 0.315, 0.394, 0.472, 0.551, 0.630, 0.787, 0.984, 1.260, 1.575, 1.969, 2.480, 3.150, 3.937, 4.921, 6.299, 7.874, 9.843, 11.811, 15.748, 23.622];

const InsideRadiusCalculator: React.FC = () => {
  const { unit, toggleUnit } = useUnit(); // ✅ Unit toggle for mm/in
  const [material, setMaterial] = useState<MaterialType>("Mild Steel (60ksi)");
  const [vDieWidth, setVDieWidth] = useState<string>("");
  const [punchTipRadius, setPunchTipRadius] = useState<number | "">("");
  const [thickness, setThickness] = useState<string>("");
  const [result, setResult] = useState<React.ReactNode>(null);

  const conversionFactor = unit === "in" ? 1 : 25.4; // ✅ 1 inch = 25.4 mm
  const unitLabel = unit === "in" ? "inches" : "mm";

  // ✅ Convert values for dropdowns
  const convertedThicknessOptions = thicknessOptions.map((th) => (unit === "in" ? th : th * 25.4));
  const convertedVDieOptions = vDieOptions.map((die) => (unit === "in" ? die : die * 25.4));

  const handleCalculate = () => {
    if (!vDieWidth || !thickness) {
      setResult("Please enter all required fields.");
      return;
    }
  
    const materialProps = materialData[material];
    if (!materialProps) return;
  
    // Convert values to inches for calculation
    const thicknessInInches = unit === "in" ? parseFloat(thickness) : parseFloat(thickness) / 25.4;
    const vDieWidthInInches = unit === "in" ? parseFloat(vDieWidth) : parseFloat(vDieWidth) / 25.4;
    const punchTipRadiusInInches = punchTipRadius
      ? unit === "in"
        ? punchTipRadius
        : (punchTipRadius as number) / 25.4
      : "";
  
    // Sharp Bend Minimum Limit (63% of thickness)
    const sharpBendLimit = thicknessInInches * 0.63;
  
    // Ensure punch tip is at least 63% of thickness
    let adjustedPunchTip =
      punchTipRadiusInInches !== ""
        ? Math.max(punchTipRadiusInInches as number, sharpBendLimit)
        : sharpBendLimit;
  
    // Percentage Rule Estimate
    const percentageRadius = vDieWidthInInches * materialProps.percentage;
  
    // Tensile Strength Formula Estimate
    const dieWidthPercentage = (materialProps.tensileStrength / 60000) * 0.16;
    const tensileStrengthRadius = dieWidthPercentage * vDieWidthInInches;
  
    // Air Bend Chart Lookup
    const airBendResult =
      airBendChart[vDieWidthInInches] !== undefined
        ? airBendChart[vDieWidthInInches]
        : "No Match";
  
    // Determine Final Inside Radius
    let finalRadius;
    if (punchTipRadiusInInches !== "") {
      // If user enters a punch tip, use it (with min limit)
      finalRadius = adjustedPunchTip;
    } else {
      // If no punch tip is entered, take the average of available values
      const validValues = [tensileStrengthRadius, percentageRadius];
  
      if (typeof airBendResult === "number") {
        validValues.push(airBendResult);
      }
  
      finalRadius = validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
    }
  
    // Convert results back to user-selected unit
    const formatValue = (value: number) => (unit === "mm" ? value.toFixed(2) : value.toFixed(3));
  
    const convertedFinalRadius = formatValue(finalRadius * conversionFactor);
    const convertedPercentageRadius = formatValue(percentageRadius * conversionFactor);
    const convertedTensileRadius = formatValue(tensileStrengthRadius * conversionFactor);
    const convertedSharpBendLimit = formatValue(sharpBendLimit * conversionFactor);
    const convertedAirBendResult =
      typeof airBendResult === "number" ? formatValue(airBendResult * conversionFactor) : airBendResult;
  
    setResult(
      <div>
        <div className="section-header">Results</div>
        <div className="results-container">
          <div className="result-item">
            <span className="result-bubble">{convertedTensileRadius}</span>
            <span className="result-label">Tensile Strength Estimate</span>
          </div>
          <div className="result-item">
            <span className="result-bubble">{convertedPercentageRadius}</span>
            <span className="result-label">% Rule Estimate</span>
          </div>
          <div className="result-item">
            <span className="result-bubble">{convertedSharpBendLimit}</span>
            <span className="result-label">Sharp Bend Limit</span>
          </div>
          <div className="result-item">
            <span className="result-bubble">{convertedAirBendResult}</span>
            <span className="result-label">Air Bend Chart Rule</span>
          </div>
          <div className="result-item">
            <span className="result-bubble">{convertedFinalRadius}</span>
            <span className="result-label">Final Inside Radius</span>
          </div>
        </div>
      </div>
    );
  };
  
  useEffect(() => {
    handleCalculate();
}, [material, thickness, vDieWidth, punchTipRadius, unit]);
  return (
    <div className="MachineRecommender">
      <h2>Inside Radius Calculator</h2>

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
        Material Type
        <select value={material} onChange={(e) => setMaterial(e.target.value as MaterialType)}>
          {Object.keys(materialData).map((mat) => (
            <option key={mat} value={mat}>{mat}</option>
          ))}
        </select>
      </label>

      <label>Material Thickness</label>
<select value={thickness} onChange={(e) => setThickness(e.target.value)}>
  <option value="">Select...</option>
  {convertedThicknessOptions.map((th, index) => (
    <option key={index} value={th.toFixed(unit === "mm" ? 2 : 3)}>
      {th.toFixed(unit === "mm" ? 1 : 3)} {unitLabel}
    </option>
  ))}
</select>

<label>V-Die Opening</label>
<select value={vDieWidth} onChange={(e) => setVDieWidth(e.target.value)}>
  <option value="">Select...</option>
  {convertedVDieOptions.map((die, index) => (
    <option key={index} value={die.toFixed(unit === "mm" ? 2 : 3)}>
      {die.toFixed(unit === "mm" ? 0 : 3)} {unitLabel}
    </option>
  ))}
</select>
      <label>
        Punch Tip Radius (Optional) ({unitLabel})
        <input type="number" value={punchTipRadius === "" ? "" : punchTipRadius} onChange={(e) => setPunchTipRadius(e.target.value === "" ? "" : parseFloat(e.target.value))} />
      </label>

      
      {result}
      <Link to="/" className="button home-button">
              Home
            </Link>
    </div>
  );
};

export default InsideRadiusCalculator;