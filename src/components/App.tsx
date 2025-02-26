import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use "react-dom/client" instead of "react-dom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import HemmingCalculator from "./HemmingCalculator";
import MachineRecommender from "./MachineRecommender";
import TonnageCalculator from "./TonnageCalculator";
import DaylightCalculator from "./DaylightCalculator";
import BoxBending from "./BoxBending";
import MachineSpecGuide from "./MachineSpecGuide";
import Footer from "./Footer";
import { UnitProvider } from "./UnitContext"; // ✅ Global Unit Toggle Provider
import RobotCycleTime from "./RobotCycleTime";
import PartWeightCalculator from "./PartWeightCalculator";
import InsideRadiusCalculator from "./InsideRadiusCalculator";
import SuctionCupPicker from "./SuctionCupPicker";

const App: React.FC = () => (
    <UnitProvider>
        <Router basename="/">
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/hemming-tonnage" element={<HemmingCalculator />} />
                    <Route path="/machine-recommender" element={<MachineRecommender />} />
                    <Route path="/tonnage-calculator" element={<TonnageCalculator />} />
                    <Route path="/daylight-calculator" element={<DaylightCalculator />} />
                    <Route path="/box-bending" element={<BoxBending />} />
                    <Route path="/machine-spec" element={<MachineSpecGuide />} />
                    <Route path="/robot-cycletime" element={<RobotCycleTime />} />
                    <Route path="/InsideRadiusCalculator" element={<InsideRadiusCalculator />} />
                    <Route path="/part-weight-calculator" element={<PartWeightCalculator />} />
                    <Route path="/suction-cup-picker" element={<SuctionCupPicker />} />
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    </UnitProvider>
);

// ✅ Initialize React app using createRoot()
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
