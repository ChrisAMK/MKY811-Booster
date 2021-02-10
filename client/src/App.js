import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import NoMatch from "./pages/NoMatch";
import Mode from "./components/Mode";
import Guages from './pages/Guage';
import Graphs from './pages/Graphs';



function App() {

  // here is the pathing for the whole app we use react router Switch and Routes to make it possible to navigate the site
  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <Mode />

        

        <Switch>
          <Route exact path="/Gauges">
            <Guages />
          </Route>

          <Route exact path="/Graphs">
            <Graphs />
          </Route>

          <Route exact path="/Alerts">
            <Guages />
          </Route>

          <Route exact path="/">
            <Guages />
          </Route>

          <Route path="/">
            <NoMatch />
          </Route>
        </Switch>

      </Router>
    </React.Fragment>
  );
}


export default App;
