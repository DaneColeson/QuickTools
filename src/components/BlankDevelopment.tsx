import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const materialThicknessOptions = [
  { mm: 0.91, in: 0.036 },
  { mm: 1.22, in: 0.048 },
  { mm: 1.52, in: 0.060 },
  { mm: 1.91, in: 0.075 },
  { mm: 2.29, in: 0.090 },
  { mm: 2.67, in: 0.105 },
  { mm: 3.05, in: 0.120 },
  { mm: 3.43, in: 0.135 },
  { mm: 3.81, in: 0.150 },
  { mm: 4.78, in: 0.188 },
  { mm: 6.35, in: 0.250 },
  { mm: 7.95, in: 0.313 },
  { mm: 9.53, in: 0.375 },
  { mm: 12.70, in: 0.500 },
  { mm: 15.88, in: 0.625 },
  { mm: 19.05, in: 0.750 },
  { mm: 25.40, in: 1.000 },
  { mm: 31.75, in: 1.250 },
  { mm: 38.10, in: 1.500 },
];

const BlankDevelopmentCalculator = () => {
  const [unit, setUnit] = useState("in"); // Default unit is mm
  const conversionFactor = unit === "mm" ? 1 : 25.4;
  
  const [thickness, setThickness] = useState(materialThicknessOptions[0].mm);
  const [insideRadius, setInsideRadius] = useState(0);
  const [bendAngle, setBendAngle] = useState(0);
  const [legSum, setLegSum] = useState(0);
  const [numBends, setNumBends] = useState(0);
  const [results, setResults] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const thicknessInInches = unit === "mm" ? thickness / 25.4 : thickness;
    const insideRadiusInInches = unit === "mm" ? insideRadius / 25.4 : insideRadius;
    const legSumInInches = unit === "mm" ? legSum / 25.4 : legSum;
    
    const radianAngle = (Math.PI / 180) * bendAngle;
    const bendAllowance = ((0.017453 * insideRadiusInInches) + (0.0078 * thicknessInInches)) * bendAngle;
    const outsideSetback = Math.tan(radianAngle / 2) * (thicknessInInches + insideRadiusInInches);
    const bendDeduction = (outsideSetback * 2) - bendAllowance;
    const finalBlankInches = legSumInInches - (bendDeduction * numBends);
    
    const conversionBack = unit === "mm" ? 25.4 : 1;
    const decimalPlaces = unit === "mm" ? 2 : 3;

    setResults(
      <div>
        <div className="section-header">Results</div>
        <div className="results-container">
          <div className="result-item">
            <span className="result-bubble">{(bendAllowance * conversionBack).toFixed(decimalPlaces)}</span>
            <span className="result-label">Bend Allowance ({unit})</span>
          </div>
          <div className="result-item">
            <span className="result-bubble">{(outsideSetback * conversionBack).toFixed(decimalPlaces)}</span>
            <span className="result-label">Outside Setback ({unit})</span>
          </div>
          <div className="result-item">
            <span className="result-bubble">{(bendDeduction * conversionBack).toFixed(decimalPlaces)}</span>
            <span className="result-label">Bend Deduction ({unit})</span>
          </div>
          <div className="result-item">
            <span className="result-bubble">{(finalBlankInches * conversionBack).toFixed(decimalPlaces)}</span>
            <span className="result-label">Final Blank Length ({unit})</span>
          </div>
        </div>
      </div>
    );
  }, [thickness, insideRadius, bendAngle, legSum, numBends, unit]);

  return (
    <div className="MachineRecommender">
      <h2>Blank Development Calculator</h2>

      {/* Unit Toggle */}
      <div className="unit-toggle">
        <span>mm</span>
        <label className="switch">
          <input type="checkbox" checked={unit === "in"} onChange={() => setUnit(unit === "mm" ? "in" : "mm")} />
          <span className="slider round"></span>
        </label>
        <span>inches</span>
      </div>

      <label>Material Thickness ({unit})</label>
<select value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value))}>
  {materialThicknessOptions.map((option, index) => (
    <option key={index} value={unit === "mm" ? option.mm : option.in}>
      {unit === "mm" ? `${option.mm.toFixed(2)} mm` : `${option.in.toFixed(3)} in`}
    </option>
  ))}
</select>


<label>Inside Radius ({unit}) <Link to="/InsideRadiusCalculator">?</Link></label>
      <input type="number" value={insideRadius} onChange={(e) => setInsideRadius(parseFloat(e.target.value) || 0)} />

      <label>Bend Angle (Complementary)</label>
      <input type="number" value={bendAngle} onChange={(e) => setBendAngle(parseFloat(e.target.value) || 0)} />

      <label>Sum of Leg Lengths ({unit})</label>
      <input type="number" value={legSum} onChange={(e) => setLegSum(parseFloat(e.target.value) || 0)} />

      <label>Number of Bends</label>
      <input type="number" value={numBends} onChange={(e) => setNumBends(parseInt(e.target.value) || 0)} />

      {results}

      <Link to="/" className="button home-button">Home</Link>
    </div>
  );
};

export default BlankDevelopmentCalculator;
