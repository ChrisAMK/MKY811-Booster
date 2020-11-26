import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Banner from "./components/Banner";
import NoMatch from "./pages/NoMatch";
import Booster from "./pages/Booster";



function App() {

// here is the pathing for the whole app we use react router Switch and Routes to make it possible to navigate the site
  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <div className="container">
        <Banner />
          <Switch>

            <Route exact path="/">
              <Booster />
            </Route>

            <Route exact path="/booster">
              <Booster />
            </Route>

            <Route path="/">
              <NoMatch />
            </Route>

          </Switch>
        </div>
      
      </Router>
    </React.Fragment>
  );
}


export default App;
