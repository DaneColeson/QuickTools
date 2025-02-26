import React from "react";
import "./Footer.css"; // For styling (create this file)

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <img
                src="/images/logo.png"
                alt="Company Logo"
                className="footer-image"
            />
        </footer>
    );
};

export default Footer;
