import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/App.css"
import Footer from './Footer';
import { default as MachineRecommenderIcon } from "../assets/MachineRecommenderIcon";
import { default as BoxIcon } from "../assets/BoxIcon";
import { default as HemmingIcon } from "../assets/HemmingIcon";

const Home: React.FC = () => (
    <div className="home-container">
        {/* Navigation Bar */}
        <header className="navbar">
            <h1>Press Brake Quick Tools</h1>
        </header>

        {/* Main Content */}
        <main className="content">
            <div className="icon-grid">
                <Link to="/hemming-tonnage" className="icon icon-red">
                <HemmingIcon width={50} height={50} />
                    <div className="icon-content">
                        <span><b>Hemming Tonnage</b></span>
                        <div className="subtext">Calculate hemming tonnage based on material and hem type</div>
                    </div>
                </Link>
                <Link to="/machine-recommender" className="icon icon-orange">
                    <MachineRecommenderIcon width={50} height={50} />
                    <div className="icon-content">
                    <span><b>Machine Recommender</b></span>
                    <div className="subtext">Find the right sized machine based on material and length</div>
                    </div>
                </Link>
                <Link to="/tonnage-calculator" className="icon icon-green">
                <MachineRecommenderIcon width={50} height={50} />
                    <div className="icon-content">
                        <span><b>Tonnage Calculator</b></span>
                        <div className="subtext">Determine tonnage requirements based on V-die and Material</div>
                    </div>
                </Link>
                <Link to="/box-bending" className="icon icon-purple">
                    <BoxIcon width={50} height={50} />
                    <div className="icon-content">
                        <span><b>Box Bending</b></span>
                        <div className="subtext">Determine maximum box size depending on tooling</div>
                    </div>
                </Link>
                <Link to="/daylight-calculator" className="icon icon-blue">
                <MachineRecommenderIcon width={50} height={50} />
                    <div className="icon-content">
                        <span><b>Daylight Calculator</b></span>
                        <div className="subtext">Determine available Daylight depending on tool and machine configuration</div>
                    </div>
                </Link>
                <Link to="/machine-spec" className="icon icon-red">
                <MachineRecommenderIcon width={50} height={50} />
                    <div className="icon-content">
                        <span><b>Machine Spec Guide</b></span>
                        <div className="subtext">View detailed specs of each machine</div>
                    </div>
                </Link>
            </div>
        </main>
    </div>
);

export default Home;