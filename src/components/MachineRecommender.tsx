import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define the type for V-die options
type VDieOptions = {
    [vDie: string]: number;
};

// Define the type for the Air Bending Chart
type AirBendingChart = {
    [thickness: string]: VDieOptions;
};

// Define the chart
const airBendingChart: AirBendingChart = {
    ".036": { ".236": 3.6 },
    ".048": { ".315": 4.8 },
    ".060": { ".394": 6.0 },
    ".075": { ".472": 7.5 },
    ".090": { ".551": 10.1 },
    ".105": { ".630": 10.5 },
    ".120": { ".984": 7.2 },
    ".135": { ".984": 8.1 },
    ".150": { "1.260": 9.0 },
    ".188": { "1.575": 11.3 },
    ".250": { "1.969": 15.0 },
    ".313": { "2.480": 18.8 },
    ".375": { "3.937": 15.0 },
    ".500": { "4.921": 22.2 },
    ".625": { "7.874": 20.0 },
    ".750": { "9.843": 22.5 },
    "1.000": { "12.000": 43.25 },
};

// Define machines by type
type MachineType = 'Diamond' | 'Adira';

const machineGroups: { [key in MachineType]: { name: string; capacity: number; length: number }[] } = {
    Diamond: [
        { name: "BB306", capacity: 28, length: 25 },
        { name: "BB4013", capacity: 36, length: 50 },
        { name: "BB6013", capacity: 55, length: 51 },
        { name: "BB6020", capacity: 55, length: 83 },
        { name: "BH8525", capacity: 93, length: 102 },
        { name: "BH13530", capacity: 147, length: 122 },
        { name: "BH18530", capacity: 203, length: 122 },
        { name: "BH25030", capacity: 275, length: 122 },
        { name: "BH18540", capacity: 203, length: 161 },
        { name: "BH25040", capacity: 275, length: 161 },
    ],
    Adira: [
        { name: "PA13530", capacity: 147, length: 122 },
        { name: "PA16030", capacity: 176, length: 122 },
        { name: "PA22030", capacity: 242, length: 122 },
        { name: "PA13540", capacity: 147, length: 161 },
        { name: "PA16040", capacity: 176, length: 161 },
        { name: "PA22040", capacity: 242, length: 161 },
        { name: "PH Series", capacity: 1000, length: 1000 },
    ],
};

// Define material type multipliers
const materialMultipliers: { [key: string]: number } = {
    "Mild Steel": 1.0,
    "Aluminum": 0.5,
    "Stainless Steel": 1.5,
    "High Strength Steel": 2.5,
};

const MachineRecommender: React.FC = () => {
    const [machineType, setMachineType] = useState<MachineType | "">(""); // Track selected machine type
    const [thickness, setThickness] = useState<string>(""); // Track selected material thickness
    const [materialType, setMaterialType] = useState<string>(""); // Track selected material type
    const [bendLength, setBendLength] = useState<string>("");
    const [result, setResult] = useState<React.ReactNode>(null);

    const handleCalculate = () => {
        if (!thickness || !bendLength || !machineType || !materialType) {
            setResult("Please select a material thickness, material type, machine type, and enter a bend length.");
            return;
        }
    
        const selectedData = airBendingChart[thickness];
        if (!selectedData) {
            setResult("No data available for the selected material thickness.");
            return;
        }
    
        // Find the V-die size and corresponding minimum tons/foot
        let minTonsPerFoot = Infinity;
        let vDieSize = "";
        for (const [vDie, tonsPerFoot] of Object.entries(selectedData)) {
            if (tonsPerFoot < minTonsPerFoot) {
                minTonsPerFoot = tonsPerFoot;
                vDieSize = vDie;
            }
        }
    
        // Apply material multiplier
        const multiplier = materialMultipliers[materialType];
        const adjustedTonsPerFoot = minTonsPerFoot * multiplier;
    
        // Calculate total tonnage
        const lengthInFeet = parseFloat(bendLength) / 12;
        const totalTonnage = lengthInFeet * adjustedTonsPerFoot;
    
        // Convert length to meters (1 inch = 0.0254 meters)
        const lengthInMeters = parseFloat(bendLength) * 0.0254;
    
        // Filter machines by selected type
        const machines = machineGroups[machineType];
        const recommendedMachine = machines.find(
            (machine) => machine.capacity >= totalTonnage && machine.length >= parseFloat(bendLength)
        );
    
        if (recommendedMachine) {
            setResult(
                <>
                    <div>V-Die Size: {vDieSize} inches</div>
                    <div>Adjusted Tons/Foot: {adjustedTonsPerFoot.toFixed(2)} tons</div>
                    <div>Total Bend Length: {lengthInMeters.toFixed(2)} meters</div>
                    <div>Total Tonnage Required: {totalTonnage.toFixed(2)} tons</div>
                    <div>
                        <strong>
                            Recommended Machine: {recommendedMachine.name} (Capacity: {recommendedMachine.capacity} tons, Length:{" "}
                            {recommendedMachine.length} inches)
                        </strong>
                    </div>
                </>
            );
        } else {
            setResult("No suitable machine available for the given requirements.");
        }

    };

    return (
        <div className="Machine-Recommender">
            <h2>Machine Recommender</h2>

            <label>
                Material Thickness
                <select value={thickness} onChange={(e) => setThickness(e.target.value)}>
                    <option value="">Select...</option>
                    {Object.keys(airBendingChart).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Material Type
                <select value={materialType} onChange={(e) => setMaterialType(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Mild Steel">Mild Steel (x1.0)</option>
                    <option value="Aluminum">Aluminum (x0.5)</option>
                    <option value="Stainless Steel">Stainless Steel (x1.5)</option>
                    <option value="High Strength Steel">High Strength Steel (x2.5)</option>
                </select>
            </label>

            <label>
                Total Bend Length (inches)
                <input
                    type="number"
                    value={bendLength}
                    onChange={(e) => setBendLength(e.target.value)}
                    placeholder="Enter total bend length"
                />
            </label>

            <label>
                Machine Type
                <select value={machineType} onChange={(e) => setMachineType(e.target.value as MachineType | "")}>
                    <option value="">Select...</option>
                    <option value="Diamond">Diamond Series</option>
                    <option value="Adira">Adira</option>
                </select>
            </label>

            <button onClick={handleCalculate}>Calculate</button>

            {result && <div className="result-output">{result}</div>}

            {/* Home Button */}
            <Link to="/" className="button home-button">
                Home
            </Link>
        </div>
    );
};

export default MachineRecommender;
