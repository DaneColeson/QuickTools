import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Hamburger.css"; // Add styles for the menu

const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="hamburger-menu">
            {/* Hamburger Button */}
            <button className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </button>

            {/* Menu Items */}
            {isOpen && (
                <div className="menu">
                    <Link to="/" onClick={() => setIsOpen(false)}>🏠 Home</Link>
                    <Link to="/hemming-tonnage" onClick={() => setIsOpen(false)}>📏 Hemming Tonnage</Link>
                    <Link to="/machine-recommender" onClick={() => setIsOpen(false)}>🛠 Machine Recommender</Link>
                    <Link to="/tonnage-calculator" onClick={() => setIsOpen(false)}>⚙️ Tonnage Calculator</Link>
                    <Link to="/box-bending" onClick={() => setIsOpen(false)}>📦 Box Bending</Link>
                    <Link to="/daylight-calculator" onClick={() => setIsOpen(false)}>🌞 Daylight Calculator</Link>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
