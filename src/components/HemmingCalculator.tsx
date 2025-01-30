import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/App.css';
import HamburgerMenu from "./HamburgerMenu";

const HemmingCalculator: React.FC = () => {
    const [materialThickness, setMaterialThickness] = useState(".024");
    const [materialType, setMaterialType] = useState("steel");
    const [hemType, setHemType] = useState("open");
    const [bendLength, setBendLength] = useState("");
    const [result, setResult] = useState<string | null>(null);

    const tonnageLookup: Record<string, any> = {
        ".024": { steel: { open: 3.7, closed: 6.1 }, stainless: { open: 7.9, closed: 12.2 }, aluminum: { open: 2.6, closed: 4.0 } },
        ".030": { steel: { open: 4.9, closed: 9.1 }, stainless: { open: 9.8, closed: 14.9 }, aluminum: { open: 3.3, closed: 5.0 } },
        ".040": { steel: { open: 6.1, closed: 10.7 }, stainless: { open: 12.2, closed: 18.6 }, aluminum: { open: 4.0, closed: 6.2 } },
        ".050": { steel: { open: 7.3, closed: 12.2 }, stainless: { open: 13.7, closed: 23.2 }, aluminum: { open: 4.6, closed: 7.6 } },
        ".060": { steel: { open: 9.1, closed: 15.2 }, stainless: { open: 17.7, closed: 29.3 }, aluminum: { open: 5.9, closed: 9.8 } },
        ".080": { steel: { open: 12.2, closed: 18.3 }, stainless: { open: 19.8, closed: 37.2 }, aluminum: { open: 6.7, closed: 12.2 } },
        ".090": { steel: { open: 19.8, closed: 27.4 }, stainless: { open: 23.2, closed: 42.1 }, aluminum: { open: 7.7, closed: 14.0 } },
        ".125": { steel: { open: 18.3, closed: 36.6 }, stainless: { open: 27.7, closed: 55.8 }, aluminum: { open: 9.3, closed: 18.6 } },
    };

    const calculateTonnage = () => {
        const bendLengthNum = parseFloat(bendLength);
        if (isNaN(bendLengthNum) || bendLengthNum <= 0) {
            setResult("Please enter a valid bend length in inches.");
            return;
        }

        const tonnagePerFoot = tonnageLookup[materialThickness][materialType][hemType];
        const bendLengthInFeet = bendLengthNum / 12;
        const totalTonnage = (bendLengthInFeet * tonnagePerFoot).toFixed(2);

        setResult(`Estimated Tonnage: ${totalTonnage} tons`);
    };

    return (
        <div className="HemmingCalculator">
            <HamburgerMenu /> {/* Menu */}
            <h2>Hemming Tonnage Calculator</h2>
            <label htmlFor="material-thickness">Material Thickness</label>
            <select
                id="material-thickness"
                value={materialThickness}
                onChange={(e) => setMaterialThickness(e.target.value)}
            >
                {Object.keys(tonnageLookup).map((thickness) => (
                    <option key={thickness} value={thickness}>
                        {thickness}
                    </option>
                ))}
            </select>

            <label htmlFor="material-type">Material Type</label>
            <select
                id="material-type"
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
            >
                <option value="steel">Steel</option>
                <option value="stainless">Stainless</option>
                <option value="aluminum">Aluminum</option>
            </select>

            <label htmlFor="hem-type">Hem Type</label>
            <select id="hem-type" value={hemType} onChange={(e) => setHemType(e.target.value)}>
                <option value="open">Open Hem</option>
                <option value="closed">Closed Hem</option>
            </select>

            <label htmlFor="bend-length">Total Bend Length (inches)</label>
            <input
                type="number"
                id="bend-length"
                value={bendLength}
                onChange={(e) => setBendLength(e.target.value)}
                placeholder="Enter length in inches"
            />

            <button onClick={calculateTonnage}>Calculate</button>
            <p id="result">{result}</p>

            {/* Home Button */}
            <Link to="/" className="button home-button">
                Home
            </Link>
        </div>
    );
};

export default HemmingCalculator;
