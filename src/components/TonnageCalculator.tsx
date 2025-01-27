import React, { useState } from "react";
import { Link } from "react-router-dom";

// Material multipliers
const materialMultipliers = {
    MildSteel: 1,
    Aluminum: 0.5,
    StainlessSteel: 1.5,
    HighStrengthSteel: 2.75,
};

// Predefined material thickness options
const materialThicknesses = [
    "0.036",
    "0.048",
    "0.060",
    "0.075",
    "0.090",
    "0.105",
    "0.120",
    "0.135",
    "0.150",
    "0.188",
    "0.250",
    "0.313",
    "0.375",
    "0.500",
    "0.625",
    "0.750",
    "1.000",
    "1.250",
    "1.500",
    "2.000",
];

// Predefined V-die sizes
const vDieSizes = [
    "0.236",
    "0.315",
    "0.394",
    "0.472",
    "0.551",
    "0.630",
    "0.984",
    "1.260",
    "1.575",
    "1.969",
    "2.480",
    "3.937",
    "4.921",
    "7.874",
    "9.843",
    "11.811",
    "15.748",
    "17.717",
    "23.622",
];

const TonnageCalculator: React.FC = () => {
    const [thickness, setThickness] = useState<string>(""); // Material thickness
    const [materialType, setMaterialType] = useState<keyof typeof materialMultipliers>("MildSteel"); // Material type
    const [vDieSize, setVDieSize] = useState<string>(""); // Selected V-die size
    const [bendLength, setBendLength] = useState<string>(""); // Total bend length
    const [result, setResult] = useState<string | null>(null); // Calculation result

    // Calculate filtered V-die sizes based on thickness
    const filteredVDies = thickness
        ? vDieSizes.filter((die) => {
              const thicknessNum = parseFloat(thickness);
              const dieNum = parseFloat(die);
              return dieNum >= thicknessNum * 4 && dieNum <= thicknessNum * 15;
          })
        : [];

    const handleCalculate = () => {
        if (!thickness || !vDieSize || !bendLength) {
            setResult("Please select material thickness, V-die size, material type, and enter a valid bend length.");
            return;
        }

        const thicknessNum = parseFloat(thickness);
        const vDieSizeNum = parseFloat(vDieSize);
        const bendLengthNum = parseFloat(bendLength);

        if (isNaN(thicknessNum) || isNaN(vDieSizeNum) || isNaN(bendLengthNum)) {
            setResult("Invalid inputs. Please check your entries.");
            return;
        }

        // Formula for tons/foot
        const tonsPerFoot = (575 * Math.pow(thicknessNum, 2)) / vDieSizeNum;

        // Apply material multiplier
        const multiplier = materialMultipliers[materialType];
        const adjustedTonsPerFoot = tonsPerFoot * multiplier;

        // Calculate total tonnage
        const lengthInFeet = bendLengthNum / 12;
        const totalTonnage = adjustedTonsPerFoot * lengthInFeet;

        // Get recommended V-die
        const recommendedDie = vDieSizes.find(
            (die) => parseFloat(die) >= thicknessNum * 4 && parseFloat(die) <= thicknessNum * 15
        );

        // Display the results
        setResult(
            `Recommended V-Die Size: ${recommendedDie || "No recommendation available"}\n` +
            `Tons per Foot: ${adjustedTonsPerFoot.toFixed(2)} tons\n` +
            `Total Bend Length: ${(bendLengthNum * 0.0254).toFixed(2)} meters\n` +
            `Total Tonnage Required: ${totalTonnage.toFixed(2)} tons`
        );
    };

    return (
        <div className="HemmingCalculator">
            <h2>Tonnage Calculator</h2>

            <label>
                Material Thickness
                <select value={thickness} onChange={(e) => setThickness(e.target.value)}>
                    <option value="">Select...</option>
                    {materialThicknesses.map((thick) => (
                        <option key={thick} value={thick}>
                            {thick}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Material Type
                <select
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value as keyof typeof materialMultipliers)}
                >
                    <option value="MildSteel">Mild Steel (x1.0)</option>
                    <option value="Aluminum">Aluminum (x0.5)</option>
                    <option value="StainlessSteel">Stainless Steel (x1.5)</option>
                    <option value="HighStrengthSteel">High Strength Steel (x2.75)</option>
                </select>
            </label>

            <label>
    V-Die Size
    <select value={vDieSize} onChange={(e) => setVDieSize(e.target.value)}>
        <option value="">Select...</option>
        {filteredVDies.map((die) => {
            const isRecommended = parseFloat(die) >= parseFloat(thickness) * 8 && parseFloat(die) <= parseFloat(thickness) * 10;
            return (
                <option
                    key={die}
                    value={die}
                    style={{
                        backgroundColor: isRecommended ? "#ffeeba" : "white", // Highlight recommended V-die with a yellow background
                        fontWeight: isRecommended ? "bold" : "normal", // Make it bold for emphasis
                    }}
                >
                    {die} {isRecommended ? "(Recommended)" : ""}
                </option>
            );
        })}
    </select>
</label>


            <label>
                Total Bend Length (inches)
                <input
                    type="number"
                    value={bendLength}
                    onChange={(e) => setBendLength(e.target.value)}
                    placeholder="Enter bend length"
                />
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

export default TonnageCalculator;
