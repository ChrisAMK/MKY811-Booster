import React from "react";
import { Link } from "react-router-dom";

// Navigation component is the Navigation bar at the top of the screen, it is on every page
// Uses React Router Links
function Navigation() {
  return (
  <nav className="navbar navbar-expand-lg navbar-light">
    <Link classNameName="navbar-brand" to="/">
      <img src={require("../assets/mckays.png")} className="logo" alt="logo"></img>
    </Link>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
      </ul>
    </ div>
</ nav>
  )
}

export default Navigation


{/* <nav classNameName="navbar navbar-expand-lg navbar-light">
<Link classNameName="navbar-brand" to="/">
        <img src={require("../assets/mckays.png")} classNameName="logo" alt="logo"></img>
      </Link>
      <div>
        <ul classNameName="navbar-nav nav-links">
        </ul>
      </div>
    </nav> */}