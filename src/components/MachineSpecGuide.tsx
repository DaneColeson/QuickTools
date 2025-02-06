import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useUnit } from "./UnitContext"; // Import global unit context

type MachineSpecs = {
  [key: string]: {
    force: { ton: number; usTon: number };
    bendingLength: { mm: number; in: number };
    distanceBetweenFrames: { mm: number; in: number };
    tableWidth: { mm: number; in: number };
    openHeight: { mm: number; in: number };
    ramStroke: { mm: number; in: number };
    throatDepth: { mm: number; in: number };
    ramSpeeds: {
      approach: { mmSec: number; inMin: number };
      bending: { mmSec: number; inMin: number };
      return: { mmSec: number; inMin: number };
    };
    backgaugeSpeed: {
      frontBack: { mmSec: number; inMin: number };
      sideSide: { mmSec: number; inMin: number };
      upDown: { mmSec: number; inMin: number };
    };
    machineSize: {
      length: { mm: number; in: number };
      width: { mm: number; in: number };
      height: { mm: number; in: number };
    };
    power: { kva: number };
    weight: { kg: number; lbs: number };
  };
};

const machineSpecs: MachineSpecs = {
  BB306: {
    force: { ton: 28, usTon: 31 },
    bendingLength: { mm: 635, in: 25 },
    distanceBetweenFrames: { mm: 400, in: 15.75 },
  tableWidth: { mm: 100, in: 3.94 },
  openHeight: { mm: 500, in: 19.69 }, // Added missing openHeight property
  ramStroke: { mm: 150, in: 5.91 },
    throatDepth: { mm: 200, in: 7.87 },
    
    ramSpeeds: {
      approach: { mmSec: 100, inMin: 236 },
      bending: { mmSec: 10, inMin: 24 },
      return: { mmSec: 90, inMin: 212 },
    },
    
    backgaugeSpeed: {
      frontBack: { mmSec: 500, inMin: 1181 },
      sideSide: { mmSec: 400, inMin: 945 },
      upDown: { mmSec: 50, inMin: 118 },
    },
    
    machineSize: {
      length: { mm: 3000, in: 118.1 },
      width: { mm: 1500, in: 59.1 },
      height: { mm: 2500, in: 98.4 },
    },
    
    power: { kva: 15 },
    weight: { kg: 4500, lbs: 9920 },
  },
};

type Unit = "mm" | "in";

interface UnitContextType {
  unit: Unit;
  toggleUnit: () => void;
}

const MachineSpecGuide: React.FC = () => {
  const { unit, toggleUnit } = useUnit(); // Use the global unit context
  const [selectedMachine, setSelectedMachine] = useState<keyof typeof machineSpecs | "">("");
  return (
    <div className="machine-spec-container">
      <h2>Machine Spec Guide</h2>

      {/* Global Toggle Switch */}
      <div className="unit-toggle">
        <span>mm</span>
        <label className="switch">
          <input type="checkbox" checked={unit === "in" as Unit} onChange={toggleUnit} />
          <span className="slider round"></span>
        </label>
        <span>inch</span>
      </div>

      <label>Select a Machine:</label>
      <select value={selectedMachine} onChange={(e) => setSelectedMachine(e.target.value)}>
        <option value="">-- Select --</option>
        {Object.keys(machineSpecs).map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>

      {selectedMachine && (
        <table className="machine-spec-table">
          <tbody>
            <tr><td><b>Force</b></td><td>{machineSpecs[selectedMachine].force.ton} Ton, {machineSpecs[selectedMachine].force.usTon} US Ton</td></tr>
            <tr><td><b>Bending Length</b></td><td>{machineSpecs[selectedMachine].bendingLength[unit as keyof typeof machineSpecs.BB306.bendingLength]} {unit}</td></tr>
            <tr><td><b>Distance Between Frames</b></td><td>{machineSpecs[selectedMachine].distanceBetweenFrames[unit as keyof typeof machineSpecs.BB306.distanceBetweenFrames]} {unit}</td></tr>
            <tr><td><b>Table Width</b></td><td>{machineSpecs[selectedMachine].tableWidth[unit as keyof typeof machineSpecs.BB306.tableWidth]} {unit}</td></tr>
            <tr><td><b>Open Height w/o Tool Holders</b></td><td>{machineSpecs[selectedMachine].openHeight[unit as keyof typeof machineSpecs.BB306.openHeight]} {unit}</td></tr>
            <tr><td><b>Ram Stroke</b></td><td>{machineSpecs[selectedMachine].ramStroke[unit as keyof typeof machineSpecs.BB306.ramStroke]} {unit}</td></tr>
            <tr><td><b>Throat Depth</b></td><td>{machineSpecs[selectedMachine].throatDepth[unit as keyof typeof machineSpecs.BB306.throatDepth]} {unit}</td></tr>
            
            <tr><td colSpan={2}><b>Ram Speeds</b></td></tr>
            <tr><td>Approach</td><td>{machineSpecs[selectedMachine].ramSpeeds.approach[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            <tr><td>Bending</td><td>{machineSpecs[selectedMachine].ramSpeeds.bending[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            <tr><td>Return</td><td>{machineSpecs[selectedMachine].ramSpeeds.return[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            
            <tr><td colSpan={2}><b>Backgauge Speed</b></td></tr>
            <tr><td>Front to Back</td><td>{machineSpecs[selectedMachine].backgaugeSpeed.frontBack[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            <tr><td>Side to Side</td><td>{machineSpecs[selectedMachine].backgaugeSpeed.sideSide[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            <tr><td>Up and Down</td><td>{machineSpecs[selectedMachine].backgaugeSpeed.upDown[unit === "mm" ? "mmSec" : "inMin"]} {unit === "mm" ? "mm/sec" : "in/min"}</td></tr>
            
            <tr><td colSpan={2}><b>Machine Size</b></td></tr>
            <tr><td>Length</td><td>{machineSpecs[selectedMachine].machineSize.length[unit as keyof typeof machineSpecs.BB306.machineSize.length]} {unit}</td></tr>
            <tr><td>Width</td><td>{machineSpecs[selectedMachine].machineSize.width[unit as keyof typeof machineSpecs.BB306.machineSize.width]} {unit}</td></tr>
            <tr><td>Height</td><td>{machineSpecs[selectedMachine].machineSize.height[unit as keyof typeof machineSpecs.BB306.machineSize.height]} {unit}</td></tr>
            
            <tr><td><b>Power Requirements</b></td><td>{machineSpecs[selectedMachine].power.kva} kVA</td></tr>
            <tr><td><b>Machine Weight</b></td><td>{machineSpecs[selectedMachine].weight.kg} kg, {machineSpecs[selectedMachine].weight.lbs} lbs</td></tr>
          </tbody>
        </table>
      )}
      {/* Home Button */}
                  <Link to="/" className="button home-button">
                      Home
                  </Link>
    </div>
  );
};

export default MachineSpecGuide;
