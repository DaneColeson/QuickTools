import React from "react";
import { Link } from "react-router-dom";

const BoxBending: React.FC = () => {
    return (
        <div className="HemmingCalculator">
            <h2>Box Bending</h2>
            <p style={{ textAlign: "center", fontSize: "1.2rem", margin: "20px 0" }}>
                🚧 Under Construction 🚧
            </p>
            <p style={{ textAlign: "center", fontSize: "1rem", color: "#555" }}>
                This page will allow you to calculate parameters for box bending operations.
            </p>
            <Link to="/" className="button home-button">
                Home
            </Link>
        </div>
    );
};

export default BoxBending;
