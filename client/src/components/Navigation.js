import React from "react";
import { Link } from "react-router-dom";

// Navigation component is the Navigation bar at the top of the screen, it is on every page
// Uses React Router Links
function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">
        <img src={require("../assets/mckays.png")} className="logo" alt="logo"></img>
      </Link>
      <div>
        <ul className="navbar-nav nav-links">
        </ul>
      </div>
    </nav>
  )
}

export default Navigation