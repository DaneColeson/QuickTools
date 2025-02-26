import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { useUnit } from "./UnitContext"; // ✅ Import unit context

const thicknessData: Record<string, { mm: number; in: number }> = {
  ".024": { mm: 0.60, in: 0.024 },
  ".030": { mm: 0.76, in: 0.030 },
  ".040": { mm: 1.02, in: 0.040 },
  ".050": { mm: 1.27, in: 0.050 },
  ".060": { mm: 1.52, in: 0.060 },
  ".080": { mm: 2.03, in: 0.080 },
  ".090": { mm: 2.29, in: 0.090 },
  ".125": { mm: 3.18, in: 0.125 },
};

const tonnageLookup: Record<string, any> = {
  ".024": { steel: { open: 3.7, closed: 6.1 }, stainless: { open: 7.9, closed: 12.2 }, aluminum: { open: 2.6, closed: 4.0 } },
  ".030": { steel: { open: 4.9, closed: 9.1 }, stainless: { open: 9.8, closed: 14.9 }, aluminum: { open: 3.3, closed: 5.0 } },
  ".040": { steel: { open: 6.1, closed: 10.7 }, stainless: { open: 12.2, closed: 18.6 }, aluminum: { open: 4.0, closed: 6.2 } },
  ".050": { steel: { open: 7.3, closed: 12.2 }, stainless: { open: 13.7, closed: 23.2 }, aluminum: { open: 4.6, closed: 7.6 } },
  ".060": { steel: { open: 9.1, closed: 15.2 }, stainless: { open: 17.7, closed: 29.3 }, aluminum: { open: 5.9, closed: 9.8 } },
  ".080": { steel: { open: 12.2, closed: 18.3 }, stainless: { open: 19.8, closed: 37.2 }, aluminum: { open: 6.7, closed: 12.2 } },
  ".090": { steel: { open: 19.8, closed: 27.4 }, stainless: { open: 23.2, closed: 42.1 }, aluminum: { open: 7.7, closed: 14.0 } },
  ".125": { steel: { open: 18.3, closed: 36.6 }, stainless: { open: 27.7, closed: 55.8 }, aluminum: { open: 9.3, closed: 18.6 } },
};

const HemmingCalculator: React.FC = () => {
  const { unit, toggleUnit } = useUnit(); // ✅ Use unit context
  const [selectedThickness, setSelectedThickness] = useState(".024");
  const [materialType, setMaterialType] = useState("steel");
  const [hemType, setHemType] = useState("open");
  const [bendLength, setBendLength] = useState("");

  // Get the correct material thickness value for the selected unit
  const thicknessOptions = Object.keys(thicknessData).map((key) => ({
    value: key,
    label: unit === "in" ? `${thicknessData[key].in.toFixed(3)} in` : `${thicknessData[key].mm.toFixed(2)} mm`,
  }));

  // Convert bend length input
  const bendLengthNum = parseFloat(bendLength) || 0;
  const bendLengthConverted = unit === "in" ? bendLengthNum / 12 : bendLengthNum / 1000;
  const bendLengthDisplayUnit = unit === "in" ? "ft" : "m";

  // Convert tonnage per foot to tons per meter if in metric
  const tonnagePerFoot = tonnageLookup[selectedThickness][materialType][hemType];
  const tonnagePerMeter = unit === "in" ? tonnagePerFoot : tonnagePerFoot * 3.28084;

  // Calculate total tonnage
  const totalTonnage = (bendLengthConverted * tonnagePerMeter).toFixed(2);

  return (
    <div className="HemmingCalculator">
      <h2>Hemming Tonnage Calculator</h2>

      {/* ✅ Unit Toggle Switch */}
      <div className="unit-toggle">
        <span>mm</span>
        <label className="switch">
          <input type="checkbox" checked={unit === "in"} onChange={toggleUnit} />
          <span className="slider round"></span>
        </label>
        <span>inch</span>
      </div>

      <label>Material Thickness</label>
      <select value={selectedThickness} onChange={(e) => setSelectedThickness(e.target.value)}>
        {thicknessOptions.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <label>Material Type</label>
      <select value={materialType} onChange={(e) => setMaterialType(e.target.value)}>
        <option value="steel">Steel</option>
        <option value="stainless">Stainless</option>
        <option value="aluminum">Aluminum</option>
      </select>

      <label>Hem Type</label>
      <select value={hemType} onChange={(e) => setHemType(e.target.value)}>
        <option value="open">Open Hem</option>
        <option value="closed">Closed Hem</option>
      </select>

      <label>Total Bend Length ({unit})</label>
      <input
        type="number"
        value={bendLength}
        onChange={(e) => setBendLength(e.target.value)}
        placeholder={`Enter length in ${unit}`}
      />

      {/* ✅ Results displayed in iOS-style bubbles (Always Visible) */}
      <div className="section-header">Results</div>
      <div className="results-container">
        <div className="result-item">
          <span className="result-bubble">{bendLengthConverted.toFixed(2)} {bendLengthDisplayUnit}</span>
          <span className="result-label">Bend Length</span>
        </div>
        <div className="result-item">
          <span className="result-bubble">{tonnagePerMeter.toFixed(2)}</span>
          <span className="result-label">Tons/{unit === "in" ? "Foot" : "Meter"}</span>
        </div>
        <div className="result-item">
          <span className="result-bubble">{totalTonnage}</span>
          <span className="result-label">Total Tonnage</span>
        </div>
      </div>

      <Link to="/" className="button home-button">Home</Link>
    </div>
  );
};

export default HemmingCalculator;
