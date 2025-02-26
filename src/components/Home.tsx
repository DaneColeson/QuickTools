import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/App.css"
import Footer from './Footer';
import { default as MachineRecommenderIcon } from "../assets/MachineRecommenderIcon";
import { default as BoxIcon } from "../assets/BoxIcon";
import { default as HemmingIcon } from "../assets/HemmingIcon";
import { default as SpecIcon } from "../assets/SpecIcon";
import { default as RobotIcon } from "../assets/RobotIcon";
import { default as ScaleIcon } from "../assets/ScaleIcon";
import { default as RadiusIcon } from "../assets/RadiusBend";

const Home: React.FC = () => (
    <div className="home-container">
        {/* Navigation Bar */}
        <header className="navbar">
            <h1>Press Brake Quick Tools</h1>
        </header>

{/* Main Content */}
<main className="content">
    <div className="icon-grid">
        <Link to="/tonnage-calculator" className="icon icon-red">
            <MachineRecommenderIcon width={50} height={50} />
            <div className="icon-content">
                <span>Tonnage Calculator</span>
                <div className="subtext">Determine tonnage requirements based on V-die and Material</div>
            </div>
        </Link>
        <Link to="/machine-spec" className="icon icon-orange">
            <SpecIcon width={50} height={50} />
            <div className="icon-content">
                <span>Machine Spec Guide</span>
                <div className="subtext">View detailed technical information of each machine</div>
            </div>
        </Link>
        <Link to="/machine-recommender" className="icon icon-green">
            <MachineRecommenderIcon width={100} height={100} />
            <div className="icon-content">
                <span>Machine Recommender</span>
                <div className="subtext">Find the right sized machine based on material and length</div>
            </div>
        </Link>
        <Link to="/box-bending" className="icon icon-blue">
            <BoxIcon width={50} height={50} />
            <div className="icon-content">
                <span>Box Bending</span>
                <div className="subtext">Determine maximum box size depending on tooling</div>
            </div>
        </Link>
        <Link to="/daylight-calculator" className="icon icon-purple">
            <MachineRecommenderIcon width={50} height={50} />
            <div className="icon-content">
                <span>Daylight Calculator</span>
                <div className="subtext">Find available Daylight depending on tool and machine info</div>
            </div>
        </Link>
        <Link to="/robot-cycletime" className="icon icon-red">
            <RobotIcon width={50} height={50} />
            <div className="icon-content">
                <span>Robot Cycle Time</span>
                <div className="subtext">Estimate Robot cycle times based on part information</div>
            </div>
        </Link>
        <Link to="/part-weight-calculator" className="icon icon-orange">
            <ScaleIcon width={50} height={50} />
            <div className="icon-content">
                <span>Part Weight Calculator</span>
                <div className="subtext">Estimate part weight using part size information</div>
            </div>
        </Link>
        <Link to="/InsideRadiusCalculator" className="icon icon-green">
            <RadiusIcon width={50} height={50} />
            <div className="icon-content">
                <span>Inside Radius Estimator</span>
                <div className="subtext">Estimate Inside Radius using material </div>
            </div>
        </Link>
        <Link to="/hemming-tonnage" className="icon icon-blue">
            <HemmingIcon width={60} height={60} />
            <div className="icon-content">
                <span>Hemming Tonnage</span>
                <div className="subtext">Calculate hemming tonnage based on material and hem type</div>
            </div>
        </Link>
    </div>
</main>


    </div>
);

export default Home;