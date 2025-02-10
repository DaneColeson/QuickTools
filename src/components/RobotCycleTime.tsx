import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const materialDensities = {
  "Mild Steel": 0.284,
  "Stainless Steel": 0.289,
  "Aluminum": 0.097,
};

const thicknessOptions = [0.024, 0.030, 0.040, 0.050, 0.060, 0.080, 0.090, 0.125];
const quantityOptions = ["per week", "per month", "per year"];

const RobotCycleTime: React.FC = () => {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [materialType, setMaterialType] = useState("Mild Steel");
  const [thickness, setThickness] = useState(0.024);
  const [angleMeasurement, setAngleMeasurement] = useState("No");
  const [bends, setBends] = useState(1);
  const [flips, setFlips] = useState(0);
  const [regrips, setRegrips] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [quantityQualifier, setQuantityQualifier] = useState("per week");
  const [result, setResult] = useState<React.ReactNode>(null);
  
  // Calculate Part Weight dynamically
  const partWeight = (length * width * thickness * materialDensities[materialType]) || 0;

  const calculateCycleTime = () => {
    const cycleTime = 34 + (bends - 1) * 12 + flips * 5 + regrips * 5;
    const totalCycleTime = cycleTime * quantity;

    setResult(
      <div className="ios-style-list">
        <div className="section-header">Results</div>
        <div className="ios-style-section">
          <div className="list-item"><span>Selected Robot</span><span><b>Robot XYZ</b></span></div>
          <div className="list-item"><span>Cycle Time per Part</span><span><b>{cycleTime}</b> sec</span></div>
          <div className="list-item"><span>Cycle Time for {quantity} {quantityQualifier}</span><span><b>{totalCycleTime}</b> sec</span></div>
        </div>
      </div>
    );
  };

  return (
    <div className="MachineRecommender">
      <h2>Robot Cycle Time Estimator</h2>
      <h3><c>Under Construction</c></h3>

      <div className="input-row">
        <div>
          <label>Part Length</label>
          <input type="number" value={length} onChange={(e) => setLength(parseFloat(e.target.value) || 0)} />
        </div>
        <div>
          <label>Part Width</label>
          <input type="number" value={width} onChange={(e) => setWidth(parseFloat(e.target.value) || 0)} />
        </div>
      </div>
      
      <label>Material Type</label>
      <select value={materialType} onChange={(e) => setMaterialType(e.target.value)}>
        {Object.keys(materialDensities).map((material) => (
          <option key={material} value={material}>{material}</option>
        ))}
      </select>

      <label>Material Thickness</label>
      <select value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value))}>
        {thicknessOptions.map((th) => (
          <option key={th} value={th}>{th} in</option>
        ))}
      </select>

      <div className="list-item"><span>Part Weight</span><span><b>{partWeight.toFixed(2)}</b> lbs</span></div>
      
      <label>Angle Measurement</label>
      <select value={angleMeasurement} onChange={(e) => setAngleMeasurement(e.target.value)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <label>Number of Bends</label>
      <input type="number" value={bends} onChange={(e) => setBends(parseInt(e.target.value) || 1)} />
      <label>Number of Flips</label>
      <input type="number" value={flips} onChange={(e) => setFlips(parseInt(e.target.value) || 0)} />
      <label>Number of Regrips</label>
      <input type="number" value={regrips} onChange={(e) => setRegrips(parseInt(e.target.value) || 0)} />
      <label>Quantity</label>
      <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
      <label>Quantity Qualifier</label>
      <select value={quantityQualifier} onChange={(e) => setQuantityQualifier(e.target.value)}>
        {quantityOptions.map((q) => (
          <option key={q} value={q}>{q}</option>
        ))}
      </select>

      <button onClick={calculateCycleTime}>Calculate</button>
      {result}
    </div>
  );
};

export default RobotCycleTime;
