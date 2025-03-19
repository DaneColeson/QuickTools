import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const materialDensities = {
  "Steel": 0.284,
  "Aluminum 5052": 0.097,
  "Stainless Steel 304": 0.289,
};

const thicknessOptions = [0.024, 0.030, 0.040, 0.050, 0.060, 0.080, 0.090, 0.105, 0.125, 0.250, 0.375, 0.500, 0.625, 0.750, 0.875, 1.000];

const reductionOptions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const PartWeightCalculator: React.FC = () => {
  const [materialType, setMaterialType] = useState<keyof typeof materialDensities>("Steel");
  const [thickness, setThickness] = useState(0.024);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [reduction, setReduction] = useState(0);

  // Calculate Part Weight dynamically
  const baseWeight = (thickness * width * length * materialDensities[materialType]) || 0;
  const adjustedWeight = baseWeight * ((100 - reduction) / 100);
  const WeightInTons = adjustedWeight / 2000;

  return (
    <div className="MachineRecommender">
      <h2>Part Weight Calculator</h2>

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

      <div className="input-row">
        <div>
          <label>Width (inches)</label>
          <input type="number" value={width} onChange={(e) => setWidth(parseFloat(e.target.value) || 0)} />
        </div>
        <div>
          <label>Length (inches)</label>
          <input type="number" value={length} onChange={(e) => setLength(parseFloat(e.target.value) || 0)} />
        </div>
      </div>

      <label>Reduction - For Holes and Cutouts</label>
      <select value={reduction} onChange={(e) => setReduction(parseFloat(e.target.value))}>
        {reductionOptions.map((r) => (
          <option key={r} value={r}>{r}%</option>
        ))}
      </select>

        <div className="section-header">adjusted part weight</div>
        <div className="results-container">
        <div className="result-item">
          <span className="result-bubble">{adjustedWeight.toFixed(2)}</span>
          <span className="result-label">Lbs.</span>
        </div>
        <div className="result-item">
          <span className="result-bubble">{WeightInTons.toFixed(2)}</span>
          <span className="result-label">Tons</span>
      </div>
        </div>
      <Link to="/" className="button home-button">
                                  Home
                              </Link>
    </div>
    
  );
};

export default PartWeightCalculator;
