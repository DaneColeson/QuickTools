import React, { useState } from "react";
import { useUnit } from "./UnitContext"; // Unit toggle context
import { Link } from "react-router-dom";
import SuctionCupVisualizer from "./SuctionCupVisualizer";

const materials = {
  "Mild Steel": 0.284,
  "Stainless Steel": 0.289,
  "Aluminum": 0.097,
};

const suctionCups = [
  { name: "SAXM 20", diameter: 20, capacity: 50 },
  { name: "SAXM 40", diameter: 40, capacity: 120 },
  { name: "SAXM 60", diameter: 60, capacity: 180 },
  { name: "SAXM 80", diameter: 80, capacity: 270 },
  { name: "SAXM 100", diameter: 100, capacity: 350 },
];

const SuctionCupCalculator: React.FC = () => {
  const { unit, toggleUnit } = useUnit(); // Unit toggle (mm/in)
  const conversionFactor = unit === "in" ? 1 : 25.4;
  const unitLabel = unit === "in" ? "inches" : "mm";

  const [material, setMaterial] = useState<keyof typeof materials>("Mild Steel");
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [thickness, setThickness] = useState(0);
  const [cupsX, setCupsX] = useState(1);
  const [cupsY, setCupsY] = useState(1);
  const [cupModel, setCupModel] = useState(suctionCups[0].name);
  const [offsetX, setOffsetX] = useState(0);
  const [spacing, setSpacing] = useState(0);
  const [result, setResult] = useState<React.ReactNode>(null);

  const handleCalculate = () => {
    const materialDensity = materials[material];
    const lengthInInches = length / conversionFactor;
    const widthInInches = width / conversionFactor;
    const thicknessInInches = thickness / conversionFactor;
    const selectedCup = suctionCups.find((cup) => cup.name === cupModel);
  
    if (!selectedCup) return;
  
    // Calculate Part Weight
    const partWeight = lengthInInches * widthInInches * thicknessInInches * materialDensity;
  
    // Total Cup Capacity
    const totalCups = cupsX * cupsY;
    const totalLiftCapacity = totalCups * selectedCup.capacity;
  
    // Safety Factors
    const weightSafetyFactor = totalLiftCapacity / partWeight;
    const momentSafetyFactor = offsetX === 0 ? 1 : weightSafetyFactor > 2 ? 1 : 0;
  
    // Store the calculated values separately
    setWeightSafety(weightSafetyFactor);
    setMomentSafety(momentSafetyFactor);
  
    setResult(
      <div className="ios-style-list">
        <div className="section-header">Results</div>
        <div className="results-container">
          <div className="result-item">
            <span className="result-bubble">{partWeight.toFixed(2)} lbs</span>
            <span className="result-label">Part Weight</span>
          </div>
          <div className="result-item">
            <span className="result-bubble">{totalLiftCapacity} N</span>
            <span className="result-label">Total Lift Capacity</span>
          </div>
          <div className="result-item">
            <span className="result-bubble">{weightSafetyFactor.toFixed(2)}</span>
            <span className="result-label">Weight Safety Factor</span>
          </div>
          <div className="result-item">
            <span className="result-bubble">{momentSafetyFactor}</span>
            <span className="result-label">Moment Safety</span>
          </div>
        </div>
      </div>
    );
  };
  

const [weightSafety, setWeightSafety] = useState<number>(1);
const [momentSafety, setMomentSafety] = useState<number>(1);


  return (
    <div className="MachineRecommender">
      <h2>Suction Cup Picker</h2>

      {/* Unit Toggle */}
      <div className="unit-toggle">
        <span>mm</span>
        <label className="switch">
          <input type="checkbox" checked={unit === "in"} onChange={toggleUnit} />
          <span className="slider round"></span>
        </label>
        <span>inch</span>
      </div>

      {/* Part Properties Section */}
      <div className="input-section">
        <div className="section-header">Part Properties</div>
        <label>Material</label>
        <select value={material} onChange={(e) => setMaterial(e.target.value as keyof typeof materials)}>
          {Object.keys(materials).map((mat) => (
            <option key={mat} value={mat}>{mat}</option>
          ))}
        </select>

        <label>Part Length ({unitLabel})</label>
        <input type="number" value={length} onChange={(e) => setLength(parseFloat(e.target.value) || 0)} />

        <label>Part Width ({unitLabel})</label>
        <input type="number" value={width} onChange={(e) => setWidth(parseFloat(e.target.value) || 0)} />

        <label>Material Thickness ({unitLabel})</label>
        <input type="number" value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value) || 0)} />
      </div>

      {/* Suction Cup Configuration Section */}
      <div className="input-section">
        <div className="section-header">Suction Cup Configuration</div>
        <label>Cups Along Length</label>
        <input type="number" value={cupsX} onChange={(e) => setCupsX(parseInt(e.target.value) || 1)} />

        <label>Cups Along Width</label>
        <input type="number" value={cupsY} onChange={(e) => setCupsY(parseInt(e.target.value) || 1)} />

        <label>Distance Between Cups ({unitLabel})</label>
        <input type="number" value={spacing} onChange={(e) => setSpacing(parseFloat(e.target.value) || 0)} />

        <label>Selected Cup Model</label>
        <select value={cupModel} onChange={(e) => setCupModel(e.target.value)}>
          {suctionCups.map((cup) => (
            <option key={cup.name} value={cup.name}>{cup.name} ({cup.diameter}mm, {cup.capacity}N)</option>
          ))}
        </select>

        <label>X Offset from Center ({unitLabel})</label>
        <input type="number" value={offsetX} onChange={(e) => setOffsetX(parseFloat(e.target.value) || 0)} />
      </div>

      <SuctionCupVisualizer
  length={length}
  width={width}
  thickness={thickness}
  cupsX={cupsX}
  cupsY={cupsY}
  cupModel={suctionCups.find((cup) => cup.name === cupModel) || suctionCups[0]}
  spacing={spacing}
  offsetX={offsetX}
  weightSafety={weightSafety}
  momentSafety={momentSafety}
/>


      <button onClick={handleCalculate}>Calculate</button>
      {result}

      
      <Link to="/" className="button home-button">Home</Link>
    </div>
  );
};

export default SuctionCupCalculator;
