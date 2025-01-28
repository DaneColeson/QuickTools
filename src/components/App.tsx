import React from "react";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import HemmingCalculator from "./HemmingCalculator";
import MachineRecommender from "./MachineRecommender";
import TonnageCalculator from "./TonnageCalculator";
import DaylightCalculator from "./DaylightCalculator"; // New page
import BoxBending from "./BoxBending"; // New page

const App: React.FC = () => (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/hemming-tonnage" component={HemmingCalculator} />
                <Route path="/machine-recommender" component={MachineRecommender} />
                <Route path="/tonnage-calculator" component={TonnageCalculator} />
                <Route path="/daylight-calculator" component={DaylightCalculator} />
                <Route path="/box-bending" component={BoxBending} />
            </Switch>
            <Footer /> {/* Footer globally added here */}
        </Router>
);

export default App;