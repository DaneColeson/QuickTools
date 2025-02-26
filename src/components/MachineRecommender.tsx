import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUnit } from "./UnitContext"; // Unit toggle context
import "../styles/App.css";

// Define air bending chart with V-die options & min tons per foot
const airBendingChart = {
  "0.91": { "6.0": 3.6 }, // 0.036 in -> 0.91 mm, 0.236 in -> 6.0 mm
  "1.22": { "8.0": 4.8 },
  "1.52": { "10.0": 6.0 },
  "1.91": { "12.0": 7.5 },
  "2.29": { "14.0": 10.1 },
  "2.67": { "16.0": 10.5 },
  "3.05": { "25.0": 7.2 },
  "3.43": { "25.0": 8.1 },
  "3.81": { "32.0": 9.0 },
  "4.78": { "40.0": 11.3 },
  "6.35": { "50.0": 15.0 },
  "7.95": { "63.0": 18.8 },
  "9.53": { "100.0": 15.0 },
  "12.70": { "125.0": 22.2 },
  "15.88": { "200.0": 20.0 },
  "19.05": { "250.0": 22.5 },
  "25.40": { "300.0": 43.25 },
};

// Define machine groups with accurate capacities & lengths
const machineGroups = {
  Diamond: [
    { name: "BB306", capacity: 28, length: 635 }, // 25 in -> 635 mm
    { name: "BB4013", capacity: 36, length: 1270 },
    { name: "BB6013", capacity: 55, length: 1300 },
    { name: "BB6020", capacity: 55, length: 2100 },
    { name: "BH8525", capacity: 93, length: 2600 },
    { name: "BH13530", capacity: 147, length: 3100 },
    { name: "BH18530", capacity: 203, length: 3100 },
    { name: "BH25030", capacity: 275, length: 3100 },
    { name: "BH18540", capacity: 203, length: 4100 },
    { name: "BH25040", capacity: 275, length: 4100 },
  ],
  Adira: [
    { name: "PA13530", capacity: 147, length: 3100 },
    { name: "PA16030", capacity: 176, length: 3100 },
    { name: "PA22030", capacity: 242, length: 3100 },
    { name: "PA13540", capacity: 147, length: 4100 },
    { name: "PA16040", capacity: 176, length: 4100 },
    { name: "PA22040", capacity: 242, length: 4100 },
    { name: "PH Series", capacity: 1000, length: 25000 },
  ],
};

// Define material multipliers
const materialMultipliers = {
  "Mild Steel": 1.0,
  Aluminum: 0.5,
  "Stainless Steel": 1.5,
  "High Strength Steel": 2.5,
};

const MachineRecommender: React.FC = () => {
  const { unit, toggleUnit } = useUnit(); // Unit toggle
  const [machineType, setMachineType] = useState<string>("");
  const [thickness, setThickness] = useState<string>("");
  const [materialType, setMaterialType] = useState<keyof typeof materialMultipliers>("Mild Steel");
  const [bendLength, setBendLength] = useState<string>("");
  const [result, setResult] = useState<React.ReactNode>(null);

  const handleCalculate = () => {
    if (!thickness || !bendLength || !machineType || !materialType) {
      setResult("Please select all required fields.");
      return;
    }

    const selectedData = airBendingChart[thickness as keyof typeof airBendingChart];
    if (!selectedData) {
      setResult("No data available for this material thickness.");
      return;
    }

    let minTonsPerFoot = Infinity;
    let vDieSize = "";
    for (const [vDie, tonsPerFoot] of Object.entries(selectedData)) {
      if (tonsPerFoot < minTonsPerFoot) {
        minTonsPerFoot = tonsPerFoot;
        vDieSize = vDie;
      }
    }

    const multiplier = materialMultipliers[materialType];
    const adjustedTonsPerFoot = minTonsPerFoot * multiplier;

    const bendLengthNum = parseFloat(bendLength);
    const lengthInFeet = unit === "in" ? bendLengthNum / 12 : bendLengthNum * 0.00328084;
    const totalTonnage = lengthInFeet * adjustedTonsPerFoot;

    const machines = machineGroups[machineType as keyof typeof machineGroups];
    const recommendedMachine = machines.find(
      (machine) =>
        machine.capacity >= totalTonnage &&
        (unit === "mm" ? machine.length >= bendLengthNum : machine.length >= bendLengthNum * 25.4)
    );

    setResult(
      <div className="results-container">
        <div className="result-item">
          <span className="result-bubble">{totalTonnage.toFixed(2)}</span>
          <span className="result-label">Total Tonnage</span>
        </div>
        <div className="result-item">
          <span className={`result-bubble ${recommendedMachine ? "" : "interference"}`}>{recommendedMachine ? recommendedMachine.name : "N/A"}</span>
          <span className="result-label">Recommended Machine</span>
        </div>
        {recommendedMachine && (
          <>
            <div className="result-item">
              <span className="result-bubble">{recommendedMachine.capacity}</span>
              <span className="result-label">Max Machine Tonnage</span>
            </div>
            <div className="result-item">
              <span className="result-bubble">{unit === "mm" ? recommendedMachine.length : (recommendedMachine.length / 25.4).toFixed(1)}</span>
              <span className="result-label">Max Machine Length</span>
            </div>
          </>
        )}
      </div>
    );
  };
  return (
    <div className="MachineRecommender">
      <h2>Machine Recommender</h2>

      {/* ✅ Unit Toggle Switch - Centered */}
      <div className="unit-toggle">
        <span>mm</span>
        <label className="switch">
          <input type="checkbox" checked={unit === "in"} onChange={toggleUnit} />
          <span className="slider round"></span>
        </label>
        <span>inch</span>
      </div>

      {/* Other form fields go here */}
      <label>Material Thickness</label>
      <select value={thickness} onChange={(e) => setThickness(e.target.value)}>
        <option value="">Select...</option>
        {Object.keys(airBendingChart).map((key) => (
          <option key={key} value={key}>
            {unit === "mm" ? `${key} mm` : `${(parseFloat(key) / 25.4).toFixed(3)} in`}
          </option>
        ))}
      </select>

      <label>Material Type</label>
      <select value={materialType} onChange={(e) => setMaterialType(e.target.value as keyof typeof materialMultipliers)}>
        {Object.keys(materialMultipliers).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label>Total Bend Length ({unit})</label>
      <input type="number" value={bendLength} onChange={(e) => setBendLength(e.target.value)} />

      <label>Machine Type</label>
      <select value={machineType} onChange={(e) => setMachineType(e.target.value)}>
        <option value="">Select...</option>
        <option value="Diamond">Diamond Series</option>
        <option value="Adira">Adira</option>
      </select>

      <button onClick={handleCalculate}>Calculate</button>

      {result}

      <Link to="/" className="button home-button">
        Home
      </Link>
    </div>
  );
};


export default MachineRecommender;
