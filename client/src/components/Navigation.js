import React from "react";
import { Link } from "react-router-dom";

// Navigation component is the Navigation bar at the top of the screen, it is on every page
// Uses React Router Links
function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navWhole" style={{marginBottom: "0px"}}>
      

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
          <Link className="navbar-brand" to="/">
            <img src={require("../assets/mckays.png")} className="logo" alt="logo"></img>
          </Link>
          </li>
          <li className="nav-item dropdown modeSpace">
            <a className="nav-link dropdown-toggle" href="/Dropdown" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Asset Selection
            </a>
            <div className="dropdown-menu modeSpace dropDown" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/Action">Rig 021</a>
              <a className="dropdown-item" href="AAction">Rig 008</a>
              {/* <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/SomethingElse">Something else here</a> */}
            </div>
          </li>
        </ul>
      </ div>
    </ nav>

  )
}

export default Navigation