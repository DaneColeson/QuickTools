import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUnit } from "./UnitContext"; // ✅ Global unit context

// ✅ Lookup table for Material Thickness → V-die sizes
const vDieLookup = [
    { thickness: { mm: 0.91, in: 0.036 }, vDie: { mm: 6.0, in: 0.236 }, recommended: { mm: 6.0, in: 0.236 } },
    { thickness: { mm: 1.22, in: 0.048 }, vDie: { mm: 8.0, in: 0.315 }, recommended: { mm: 8.0, in: 0.315 } },
    { thickness: { mm: 1.52, in: 0.060 }, vDie: { mm: 10.0, in: 0.394 }, recommended: { mm: 10.0, in: 0.394 } },
    { thickness: { mm: 1.91, in: 0.075 }, vDie: { mm: 12.0, in: 0.472 }, recommended: { mm: 12.0, in: 0.472 } },
    { thickness: { mm: 2.29, in: 0.090 }, vDie: { mm: 14.0, in: 0.551 }, recommended: { mm: 14.0, in: 0.551 } },
    { thickness: { mm: 2.67, in: 0.105 }, vDie: { mm: 16.0, in: 0.630 }, recommended: { mm: 16.0, in: 0.630 } },
    { thickness: { mm: 3.05, in: 0.120 }, vDie: { mm: 25.0, in: 0.984 }, recommended: { mm: 25.0, in: 0.984 } },
    { thickness: { mm: 3.43, in: 0.135 }, vDie: { mm: 25.0, in: 0.984 }, recommended: { mm: 25.0, in: 0.984 } },
    { thickness: { mm: 3.81, in: 0.150 }, vDie: { mm: 32.0, in: 1.260 }, recommended: { mm: 32.0, in: 1.260 } },
    { thickness: { mm: 4.78, in: 0.188 }, vDie: { mm: 40.0, in: 1.575 }, recommended: { mm: 40.0, in: 1.575 } },
    { thickness: { mm: 6.35, in: 0.250 }, vDie: { mm: 50.0, in: 1.969 }, recommended: { mm: 50.0, in: 1.969 } },
    { thickness: { mm: 7.95, in: 0.313 }, vDie: { mm: 63.0, in: 2.480 }, recommended: { mm: 63.0, in: 2.480 } },
    { thickness: { mm: 9.53, in: 0.375 }, vDie: { mm: 100.0, in: 3.937 }, recommended: { mm: 100.0, in: 3.937 } },
    { thickness: { mm: 12.70, in: 0.500 }, vDie: { mm: 125.0, in: 4.921 }, recommended: { mm: 125.0, in: 4.921 } },
    { thickness: { mm: 15.88, in: 0.625 }, vDie: { mm: 200.0, in: 7.874 }, recommended: { mm: 200.0, in: 7.874 } },
    { thickness: { mm: 19.05, in: 0.750 }, vDie: { mm: 250.0, in: 9.843 }, recommended: { mm: 250.0, in: 9.843 } },
    { thickness: { mm: 25.40, in: 1.000 }, vDie: { mm: 300.0, in: 11.811 }, recommended: { mm: 300.0, in: 11.811 } },
    { thickness: { mm: 31.75, in: 1.250 }, vDie: { mm: 400.0, in: 15.748 }, recommended: { mm: 400.0, in: 15.748 } },
    { thickness: { mm: 38.10, in: 1.500 }, vDie: { mm: 600.0, in: 23.622 }, recommended: { mm: 600.0, in: 23.622 } },
];

const materialMultipliers = {
  "Select...": 0,
  "Mild Steel (60ski)": 1,
  "Aluminum 5052 (30ksi)": 0.5,
  "Stainless Steel 304 (90ksi)": 1.5,
  "Structural Steel (120ksi)": 2,
  "High Strength Steel (150ksi)": 2.5,
};

const TonnageCalculator: React.FC = () => {
  const { unit, toggleUnit } = useUnit();
  const [thickness, setThickness] = useState<number | "">("");
  const [materialType, setMaterialType] = useState<keyof typeof materialMultipliers>("Select...");
  const [vDieSize, setVDieSize] = useState<number | "">("");
  const [bendLength, setBendLength] = useState<number | "">("");
  const [result, setResult] = useState<React.ReactNode | null>(null);

  const getVDieOptions = (thickness: number, unit: "mm" | "in") => {
    // Find the entry that directly matches the selected thickness in the current unit
    const entry = vDieLookup.find((row) => row.thickness[unit] === thickness);
    if (!entry) return [];
  
    // Extract the recommended V-die
    const recommendedVDie = entry.recommended;
  
    // Find the index of the matched entry
    const index = vDieLookup.findIndex((row) => row.thickness[unit] === thickness);
  
    // Get recommended + 2 larger & 2 smaller V-dies
    const vDieOptions = [
      vDieLookup[index - 2]?.vDie ?? null,
      vDieLookup[index - 1]?.vDie ?? null,
      recommendedVDie ? { ...recommendedVDie, isRecommended: true } : null, // ✅ Mark as "Recommended"
      vDieLookup[index + 1]?.vDie ?? null,
      vDieLookup[index + 2]?.vDie ?? null,
    ].filter((die) => die !== null);
  
    return vDieOptions.map((vDie) => ({
      mm: vDie!.mm,
      in: vDie!.in,
      label: vDie!.mm === recommendedVDie.mm ? `${vDie![unit as keyof typeof vDie]} (Recommended)` : `${vDie![unit as keyof typeof vDie]}`,
    }));
  };
  
  
  

  const handleCalculate = () => {
    if (!thickness || !vDieSize || !bendLength) {
      setResult("Please select all fields and enter a valid bend length.");
      return;
    }

    const multiplier = materialMultipliers[materialType];

// ✅ Tons per Foot (Imperial formula)
const tonsPerFoot = ((575 * Math.pow(thickness as number, 2)) / (vDieSize as number)) * multiplier;

// ✅ Corrected Tons per Meter (Direct metric conversion)
const tonsPerMeter = (((575 * Math.pow(thickness as number, 2)) / (vDieSize as number)) * multiplier) / 7.74; // ✅ Convert from tons/foot → tons/meter

// ✅ Correct Total Tonnage Calculation
const totalTons = unit === "mm"
  ? tonsPerMeter * ((bendLength as number) / 1000) // Convert bend length from mm to meters
  : tonsPerFoot * ((bendLength as number) / 12);  // Convert bend length from inches to feet

  setResult(
    <div className="results-container">
      <div className="result-item">
        <span className="result-bubble">{vDieSize}</span>
        <span className="result-label">V-Die Size</span>
      </div>
      <div className="result-item">
        <span className="result-bubble">{unit === "in" ? tonsPerFoot.toFixed(2) : tonsPerMeter.toFixed(2)}</span>
        <span className="result-label">Tons/{unit === "in" ? "Foot" : "Meter"}</span>
      </div>
      <div className="result-item">
        <span className="result-bubble">{totalTons.toFixed(2)}</span>
        <span className="result-label">Total Tonnage</span>
      </div>
      <div className="result-item">
        <span className="result-bubble">{materialMultipliers[materialType]}</span>
        <span className="result-label">Multiplyer</span>
      </div>
    </div>
  );
    };

  return (
    <div className="TonnageCalculator">
      <h2>Tonnage Calculator</h2>

      <div className="unit-toggle">
        <span>mm</span>
        <label className="switch">
          <input type="checkbox" checked={unit === "in"} onChange={toggleUnit} />
          <span className="slider round"></span>
        </label>
        <span>inch</span>
      </div>
      
      <label>
        Material Thickness
        <select value={thickness} onChange={(e) => setThickness(e.target.value === "" ? "" : parseFloat(e.target.value))}>
          <option value="">Select...</option>
          {vDieLookup.map((item) => (
            <option key={item.thickness.mm} value={item.thickness[unit]}>
              {unit === "mm" ? `${item.thickness.mm} mm` : `${item.thickness.in} in`}
            </option>
          ))}
        </select>
      </label>

      <label>
  Material Type
  <select value={materialType} onChange={(e) => setMaterialType(e.target.value as keyof typeof materialMultipliers)}>
    {Object.entries(materialMultipliers).map(([key, value]) => (
      <option key={key} value={key}>
        {key.replace(/([A-Z])/g, " $1").trim()} {/* ✅ Insert spaces before uppercase letters */}
      </option>
    ))}
  </select>
</label>

      <label>V-Die Size ({unit})</label>
<select value={vDieSize} onChange={(e) => setVDieSize(parseFloat(e.target.value))}>
  <option value="">Select...</option>
  {thickness &&
    getVDieOptions(thickness as number, unit).map((die) => (
      <option key={die.mm} value={die[unit]}>
        {die.label}
      </option>
    ))}
</select>

      <label>Total Bend Length ({unit})</label>
      <input type="number" value={bendLength} onChange={(e) => setBendLength(e.target.value === "" ? "" : parseFloat(e.target.value))} />

      <button onClick={handleCalculate}>Calculate</button>
      {result && <div>{result}</div>}
      <Link to="/" className="button home-button">Home</Link>
    </div>
  );
};

export default TonnageCalculator;
