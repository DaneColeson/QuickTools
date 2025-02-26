import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

type RobotSpecs = {
    [key: string]: {
      robotSpec: {
        series: string;
        version: string;
        type: number;
        maxLoadCapacityKg: number;
        reachMm: number;
        controlledAxis: number;
        repeatabilityMm: number;
        mechanicalWeightKg: number;
        avgPowerConsumptionKw: number;
      };
      jointAngles: {
        J1: number;
        J2: number;
        J3: number;
        J4: number;
        J5: number;
        J6: number;
      };
      jointSpeeds: {
        J1: number;
        J2: number;
        J3: number;
        J4: number;
        J5: number;
        J6: number;
      };
      momentInertiaSpec: {
        J4: { moment: number; inertia: number };
        J5: { moment: number; inertia: number };
        J6: { moment: number; inertia: number };
      };
    };
  };
  
  const robotSpecs: RobotSpecs = {
    "M-20iD/25": {
      robotSpec: {
        series: "M-20",
        version: "iD",
        type: 25.0,
        maxLoadCapacityKg: 25.0,
        reachMm: 1831.0,
        controlledAxis: 6,
        repeatabilityMm: 0.02,
        mechanicalWeightKg: 252.0,
        avgPowerConsumptionKw: 1.0,
      },
      jointAngles: { J1: 340, J2: 260, J3: 458, J4: 400, J5: 360, J6: 900 },
      jointSpeeds: { J1: 210, J2: 210, J3: 265, J4: 420, J5: 420, J6: 720 },
      momentInertiaSpec: { J4: { moment: 52, inertia: 2.4 }, J5: { moment: 52, inertia: 2.4 }, J6: { moment: 32, inertia: 1.2 } },
    },
    "M-20iD/35": {
      robotSpec: {
        series: "M-20",
        version: "iD",
        type: 35.0,
        maxLoadCapacityKg: 35.0,
        reachMm: 1831.0,
        controlledAxis: 6,
        repeatabilityMm: 0.03,
        mechanicalWeightKg: 250.0,
        avgPowerConsumptionKw: 1.0,
      },
      jointAngles: { J1: 340, J2: 260, J3: 458, J4: 400, J5: 360, J6: 900 },
      jointSpeeds: { J1: 180, J2: 180, J3: 200, J4: 350, J5: 350, J6: 400 },
      momentInertiaSpec: { J4: { moment: 110, inertia: 4.0 }, J5: { moment: 110, inertia: 4.0 }, J6: { moment: 60, inertia: 1.5 } },
    },
    "R-2000iC/165R": {
      robotSpec: {
        series: "R-2000",
        version: "iC",
        type: 165.0,
        maxLoadCapacityKg: 165.0,
        reachMm: 3095.0,
        controlledAxis: 6,
        repeatabilityMm: 0.05,
        mechanicalWeightKg: 1370.0,
        avgPowerConsumptionKw: 2.5,
      },
      jointAngles: { J1: 370, J2: 200, J3: 375, J4: 720, J5: 250, J6: 720 },
      jointSpeeds: { J1: 115, J2: 110, J3: 125, J4: 180, J5: 180, J6: 260 },
      momentInertiaSpec: { J4: { moment: 940, inertia: 89 }, J5: { moment: 940, inertia: 89 }, J6: { moment: 490, inertia: 46 } },
    },
    "R-2000iC/210R": {
      robotSpec: {
        series: "R-2000",
        version: "iC",
        type: 210.0,
        maxLoadCapacityKg: 210.0,
        reachMm: 3095.0,
        controlledAxis: 6,
        repeatabilityMm: 0.05,
        mechanicalWeightKg: 1370.0,
        avgPowerConsumptionKw: 2.5,
      },
      jointAngles: { J1: 370, J2: 200, J3: 375, J4: 720, J5: 250, J6: 720 },
      jointSpeeds: { J1: 105, J2: 100, J3: 110, J4: 140, J5: 140, J6: 220 },
      momentInertiaSpec: { J4: { moment: 1360, inertia: 147 }, J5: { moment: 1360, inertia: 147 }, J6: { moment: 735, inertia: 82 } },
    },
    "R-2000iC/270R": {
      robotSpec: {
        series: "R-2000",
        version: "iC",
        type: 270.0,
        maxLoadCapacityKg: 270.0,
        reachMm: 3095.0,
        controlledAxis: 6,
        repeatabilityMm: 0.05,
        mechanicalWeightKg: 1590.0,
        avgPowerConsumptionKw: 3.0,
      },
      jointAngles: { J1: 370, J2: 200, J3: 375, J4: 720, J5: 250, J6: 720 },
      jointSpeeds: { J1: 105, J2: 85, J3: 85, J4: 120, J5: 120, J6: 200 },
      momentInertiaSpec: { J4: { moment: 1730, inertia: 320 }, J5: { moment: 1730, inertia: 320 }, J6: { moment: 900, inertia: 230 } },
    },
  };

  const RobotSpecGuide: React.FC = () => {
    const [selectedRobot, setSelectedRobot] = useState<string>("");
  
    return (
    <div className="machine-spec-container">
      <h2>Robot Spec Guide</h2>
  
      <label>Select a Robot:</label>
      <select value={selectedRobot} onChange={(e) => setSelectedRobot(e.target.value)}>
        <option value="">-- Select --</option>
        {Object.keys(robotSpecs).map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
  
      {selectedRobot && (
        <div className="ios-style-list">
          <div className="section-header">Robot Specifications</div>
          <div className="ios-style-section">
            <div className="list-item"><span>Series</span><span><b>{robotSpecs[selectedRobot].robotSpec.series}</b></span></div>
            <div className="list-item"><span>Version</span><span><b>{robotSpecs[selectedRobot].robotSpec.version}</b></span></div>
            <div className="list-item"><span>Type</span><span><b>{robotSpecs[selectedRobot].robotSpec.type}</b></span></div>
            <div className="list-item"><span>Max Load Capacity</span><span><b>{robotSpecs[selectedRobot].robotSpec.maxLoadCapacityKg}</b> kg</span></div>
            <div className="list-item"><span>Reach</span><span><b>{robotSpecs[selectedRobot].robotSpec.reachMm}</b> mm</span></div>
            <div className="list-item"><span>Controlled Axis</span><span><b>{robotSpecs[selectedRobot].robotSpec.controlledAxis}</b></span></div>
            <div className="list-item"><span>Repeatability</span><span><b>{robotSpecs[selectedRobot].robotSpec.repeatabilityMm}</b> mm</span></div>
            <div className="list-item"><span>Mechanical Weight</span><span><b>{robotSpecs[selectedRobot].robotSpec.mechanicalWeightKg}</b> kg</span></div>
            <div className="list-item"><span>Avg. Power Consumption</span><span><b>{robotSpecs[selectedRobot].robotSpec.avgPowerConsumptionKw}</b> kW</span></div>
          </div>
  
          <div className="section-header">Joint Angles</div>
          <div className="ios-style-section">
            <div className="list-item"><span>J1</span><span><b>{robotSpecs[selectedRobot].jointAngles.J1}</b>°</span></div>
            <div className="list-item"><span>J2</span><span><b>{robotSpecs[selectedRobot].jointAngles.J2}</b>°</span></div>
            <div className="list-item"><span>J3</span><span><b>{robotSpecs[selectedRobot].jointAngles.J3}</b>°</span></div>
            <div className="list-item"><span>J4</span><span><b>{robotSpecs[selectedRobot].jointAngles.J4}</b>°</span></div>
            <div className="list-item"><span>J5</span><span><b>{robotSpecs[selectedRobot].jointAngles.J5}</b>°</span></div>
            <div className="list-item"><span>J6</span><span><b>{robotSpecs[selectedRobot].jointAngles.J6}</b>°</span></div>
          </div>
  
          <div className="section-header">Joint Speeds</div>
          <div className="ios-style-section">
            <div className="list-item"><span>J1</span><span><b>{robotSpecs[selectedRobot].jointSpeeds.J1}</b> °/sec</span></div>
            <div className="list-item"><span>J2</span><span><b>{robotSpecs[selectedRobot].jointSpeeds.J2}</b> °/sec</span></div>
            <div className="list-item"><span>J3</span><span><b>{robotSpecs[selectedRobot].jointSpeeds.J3}</b> °/sec</span></div>
            <div className="list-item"><span>J4</span><span><b>{robotSpecs[selectedRobot].jointSpeeds.J4}</b> °/sec</span></div>
            <div className="list-item"><span>J5</span><span><b>{robotSpecs[selectedRobot].jointSpeeds.J5}</b> °/sec</span></div>
            <div className="list-item"><span>J6</span><span><b>{robotSpecs[selectedRobot].jointSpeeds.J6}</b> °/sec</span></div>
          </div>
  
          <div className="section-header">Moment & Inertia Specs</div>
          <div className="ios-style-section">
            <div className="list-item"><span>J4 Moment</span><span><b>{robotSpecs[selectedRobot].momentInertiaSpec.J4.moment}</b> Nm</span></div>
            <div className="list-item"><span>J4 Inertia</span><span><b>{robotSpecs[selectedRobot].momentInertiaSpec.J4.inertia}</b> kg·m²</span></div>
            <div className="list-item"><span>J5 Moment</span><span><b>{robotSpecs[selectedRobot].momentInertiaSpec.J5.moment}</b> Nm</span></div>
            <div className="list-item"><span>J5 Inertia</span><span><b>{robotSpecs[selectedRobot].momentInertiaSpec.J5.inertia}</b> kg·m²</span></div>
            <div className="list-item"><span>J6 Moment</span><span><b>{robotSpecs[selectedRobot].momentInertiaSpec.J6.moment}</b> Nm</span></div>
            <div className="list-item"><span>J6 Inertia</span><span><b>{robotSpecs[selectedRobot].momentInertiaSpec.J6.inertia}</b> kg·m²</span></div>
          </div>
        </div>
      )}
  
      {/* Home Button */}
      <Link to="/" className="button home-button">Home</Link>
    </div>
  );
    }
  
  export default RobotSpecGuide;
  
  