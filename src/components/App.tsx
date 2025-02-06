import React from "react";
import ReactDOM from "react-dom";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import HemmingCalculator from "./HemmingCalculator";
import MachineRecommender from "./MachineRecommender";
import TonnageCalculator from "./TonnageCalculator";
import DaylightCalculator from "./DaylightCalculator";
import BoxBending from "./BoxBending";
import MachineSpecGuide from "./MachineSpecGuide";
import { UnitProvider } from "./UnitContext"; // Import the UnitProvider

// Optional NotFound component
const NotFound: React.FC = () => (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
    </div>
);

const App: React.FC = () => (
    <UnitProvider>
    <Router>
        <div className="app-container"> {/* Wrapper for consistent global styling */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/hemming-tonnage" component={HemmingCalculator} />
                <Route path="/machine-recommender" component={MachineRecommender} />
                <Route path="/tonnage-calculator" component={TonnageCalculator} />
                <Route path="/daylight-calculator" component={DaylightCalculator} />
                <Route path="/box-bending" component={BoxBending} />
                <Route path="/machine-spec" component={MachineSpecGuide} />
                <Route component={NotFound} /> {/* Fallback for unmatched paths */}
            </Switch>
            <Footer />
        </div>
    </Router>
    </UnitProvider>
);

ReactDOM.render(
  <UnitProvider>
    <App />  {/* ✅ Use `App` directly */}
  </UnitProvider>,
  document.getElementById("root")
);

export default App;
