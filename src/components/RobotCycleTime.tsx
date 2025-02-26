import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const materialDensities = {
  "Mild Steel": 0.284,
  "Stainless Steel": 0.289,
  "Aluminum": 0.097,
};

const thicknessOptions = [0.024, 0.030, 0.040, 0.050, 0.060, 0.080, 0.090, 0.125, 0.188, 0.250, 0.313, 0.375, 0.500, 0.625, 0.750, 1.000];
const quantityOptions = ["per week", "per month", "per year"];

const robots = [
  { name: "Mitsubishi RV13", maxPayload: 10, maxBlankSize: [12, 24] },
  { name: "Fanuc M20iD/25", maxPayload: 25, maxBlankSize: [24, 36] },
  { name: "Fanuc M20iD/35", maxPayload: 35, maxBlankSize: [24, 36] },
  { name: "Fanuc M710iC/70", maxPayload: 70, maxBlankSize: [48, 72] },
  { name: "Fanuc R-2000iC/165R", maxPayload: 165, maxBlankSize: [60, 96] },
  { name: "Fanuc R-2000iC/210R", maxPayload: 210, maxBlankSize: [72, 120] },
  { name: "Fanuc R-2000iC/270R", maxPayload: 270, maxBlankSize: [84, 144] },
];

const weightMultipliers = [
  { maxWeight: 10, multiplier: 1 },
  { maxWeight: 25, multiplier: 1.1 },
  { maxWeight: 35, multiplier: 1.1 },
  { maxWeight: 70, multiplier: 1.3 },
  { maxWeight: 165, multiplier: 1.4 },
  { maxWeight: 210, multiplier: 1.5 },
  { maxWeight: 270, multiplier: 1.5 },
  { maxWeight: Infinity, multiplier: 1.7 },
];

const RobotCycleTime: React.FC = () => {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [materialType, setMaterialType] = useState<keyof typeof materialDensities>("Mild Steel");
  const [thickness, setThickness] = useState(0.024);
  const [angleMeasurement, setAngleMeasurement] = useState("No");
  const [bends, setBends] = useState(0);
  const [flips, setFlips] = useState(0);
  const [regrips, setRegrips] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [quantityQualifier, setQuantityQualifier] = useState("per week");
  const [result, setResult] = useState<React.ReactNode>(null);
  
  let partWeight = (length * width * thickness * materialDensities[materialType]) || 0;
  let selectedRobot = robots.find(
    robot => robot.maxPayload >= partWeight &&
    ((length <= robot.maxBlankSize[0] && width <= robot.maxBlankSize[1]) ||
    (width <= robot.maxBlankSize[0] && length <= robot.maxBlankSize[1]))
  ) || { name: "No Robot Available" };

  let cycleMultiplier = weightMultipliers.find(m => partWeight <= m.maxWeight)?.multiplier || 1;

  const convertToTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days} days ${hours} hr ${minutes} min`;
  };

  const calculateCycleTime = () => {
    const baseCycleTime = 34 + ((bends ? parseInt(bends.toString()) : 1) - 1) * 12 + flips * 5 + regrips * 5;
    const angleMeasurementPenalty = angleMeasurement === "Yes" ? bends * 5 : 0;
    const adjustedCycleTime = baseCycleTime * cycleMultiplier + angleMeasurementPenalty;
    

    // Convert the entered quantity into weekly, monthly, and yearly values
    let weeklyQty = quantity;
    let monthlyQty = quantity * 4; // Default assumes user enters per week
    let yearlyQty = quantity * 52;

    if (quantityQualifier === "per month") {
        weeklyQty = Math.round(quantity / 4);
        monthlyQty = quantity;
        yearlyQty = quantity * 12;
    } else if (quantityQualifier === "per year") {
        weeklyQty = Math.round(quantity / 52);
        monthlyQty = Math.round(quantity / 12);
        yearlyQty = quantity;
    }

    // Calculate total cycle times
    const totalCycleTime = adjustedCycleTime * quantity;

    setResult(
      <div className="ios-style-list">
          <div className="section-header">Results</div>
          <div className="ios-style-section">
              <div className="list-item"><span>Selected Robot</span><span><b>{selectedRobot.name}</b></span></div>
              <div className="list-item"><span>Cycle Time per Part</span><span><b>{adjustedCycleTime.toFixed(2)}</b> sec</span></div>
              <div className="list-item">
        <span>Total Cycle Time</span>
        <span><b>{convertToTime(totalCycleTime)}</b></span>
      </div>

          </div>
      </div>
  );
};

  return (
    <div className="MachineRecommender">
      <h2>Robot Cycle Time Estimator</h2>
      <h2>Under Construction</h2>

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
      <select value={materialType} onChange={(e) => setMaterialType(e.target.value as keyof typeof materialDensities)}>
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

      <div className="input-row">
        <div>
          <label>Bends</label>
          <input type="number" value={bends} onChange={(e) => setBends(parseInt(e.target.value) || 0)} />
        </div>
        <div>
          <label>Flips</label>
          <input type="number" value={flips} onChange={(e) => setFlips(parseInt(e.target.value) || 0)} />
        </div>
        <div>
          <label>Regrips</label>
          <input type="number" value={regrips} onChange={(e) => setRegrips(parseInt(e.target.value) || 0)} />
        </div>
      </div>
      <label>Quantity</label>
      <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} /> 
      
      <button onClick={calculateCycleTime}>Calculate</button>
      {result}
      <Link to="/" className="button home-button">
                            Home
                        </Link>
          
    </div>

  );
};



export default RobotCycleTime;
