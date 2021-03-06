import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NoMatch from "./pages/NoMatch";
import Rig021 from './rigs/rig021/Rig21';
import Rig008 from './rigs/rig008/Rig08';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';



function App() {

  // here is the pathing for the whole app we use react router Switch and Routes to make it possible to navigate the site
  return (
    <React.Fragment>
      <Router>
      <Navigation />
        <Switch>

          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/Rig21">
            <Rig021 />
          </Route>
          <Route path="/Rig08">
            <Rig008 />
          </Route>

          <Route path="/Alerts">
            <Rig008 />
          </Route>

          <Route path="/Statistics">
            <Rig008 />
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
