import React, { useState } from "react";
import { useUnit } from "./UnitContext";
import "../styles/App.css";

const materialDensities = {
  "Mild Steel": 0.284,
  "Stainless Steel": 0.289,
  "Aluminum": 0.097,
};

const robots = [
  { name: "Robot A", capacity: 10 },
  { name: "Robot B", capacity: 25 },
  { name: "Robot C", capacity: 50 },
  { name: "Robot D", capacity: 100 },
];

const RobotCycleTime = () => {
  const { unit, toggleUnit } = useUnit();
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [materialType, setMaterialType] = useState<keyof typeof materialDensities>("Mild Steel");
  const [thickness, setThickness] = useState("0.25");
  const [robot, setRobot] = useState("");
  const [angleMeasurement, setAngleMeasurement] = useState("No");
  const [bends, setBends] = useState("");
  const [flips, setFlips] = useState("");
  const [regrips, setRegrips] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityQualifier, setQuantityQualifier] = useState("per week");
  const [result, setResult] = useState<JSX.Element | null>(null);

  const thicknessOptions = ["0.25", "0.5", "0.75", "1.0", "1.25"];
  const quantityOptions = ["per week", "per month", "per year"];

  const calculateCycleTime = () => {
    const partWeight =
      (parseFloat(length) * parseFloat(width) * parseFloat(thickness) *
        materialDensities[materialType]) || 0;

    const availableRobots = robots.filter((r) => r.capacity >= partWeight);

    if (!availableRobots.length) {
      setResult(<div>No suitable robot found for this part weight.</div>);
      return;
    }

    const cycleTime =
      34 + (parseInt(bends) - 1) * 12 + parseInt(flips) * 5 + parseInt(regrips) * 5;

    const totalCycleTime = cycleTime * parseInt(quantity);

    setResult(
      <div className="ios-style-list">
        <div className="section-header">Results</div>
        <div className="ios-style-section">
          <div className="list-item"><span>Part Weight</span><span><b>{partWeight.toFixed(2)}</b> lbs</span></div>
          <div className="list-item"><span>Selected Robot</span><span><b>{availableRobots[0].name}</b></span></div>
          <div className="list-item"><span>Cycle Time per Part</span><span><b>{cycleTime}</b> sec</span></div>
          <div className="list-item"><span>Cycle Time for {quantity} {quantityQualifier}</span><span><b>{totalCycleTime}</b> sec</span></div>
        </div>
      </div>
    );
  };

  return (
    <div className="MachineRecommender">
      <h2>Robot Cycle Time Estimator</h2>
      <label>Part Length</label>
      <input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
      <label>Part Width</label>
      <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
      <label>Material Type</label>
      <select value={materialType} onChange={(e) => setMaterialType(e.target.value as keyof typeof materialDensities)}>
        {Object.keys(materialDensities).map((material) => (
          <option key={material} value={material}>{material}</option>
        ))}
      </select>
      <label>Material Thickness</label>
      <select value={thickness} onChange={(e) => setThickness(e.target.value)}>
        {thicknessOptions.map((th) => (
          <option key={th} value={th}>{th} in</option>
        ))}
      </select>
      <label>Angle Measurement</label>
      <select value={angleMeasurement} onChange={(e) => setAngleMeasurement(e.target.value)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <label>Number of Bends</label>
      <input type="number" value={bends} onChange={(e) => setBends(e.target.value)} />
      <label>Number of Flips</label>
      <input type="number" value={flips} onChange={(e) => setFlips(e.target.value)} />
      <label>Number of Regrips</label>
      <input type="number" value={regrips} onChange={(e) => setRegrips(e.target.value)} />
      <label>Quantity</label>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
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
