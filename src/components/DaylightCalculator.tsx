import React from "react";
import { Link } from "react-router-dom";

const DaylightCalculator: React.FC = () => {
    return (
        <div className="HemmingCalculator">
            <h2>Daylight Calculator</h2>
            <p style={{ textAlign: "center", fontSize: "1.2rem", margin: "20px 0" }}>
                🚧 Under Construction 🚧
            </p>
            <p style={{ textAlign: "center", fontSize: "1rem", color: "#555" }}>
                This page will help you calculate daylight requirements for your press brake operations.
            </p>
            <Link to="/" className="button home-button">
                Home
            </Link>
        </div>
    );
};

export default DaylightCalculator;
