import React from "react";
import { Link } from "react-router-dom";

function Mode() {
  return (
    <div id="content">
      <a href="#nav" style={{backgroundColor: "rgb(123, 123, 123)", width: "100%", margin: "auto", textAlign: "center", float: "none", display: "block", zIndex:"50000"}}><span role="img" aria-label="Collapse Menu">&#9196;</span></a>
      
      <div className="expandable" id="nav">
        <div className="modeContainer">
          <nav className="navbar navbar-expand-lg navbar-light modeContainer">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto modeSpace">
                <li className="nav-item active modeSpace">
                  <Link to={"/Gauges"} className="nav-link">Control Panel <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item modeSpace">
                  <Link to={"/Graphs"} className="nav-link">Graphs</Link> 
                </li>
                <li className="nav-item modeSpace">
                  <Link to={"/Alerts"} className="nav-link">Alerts</Link>
                </li>
              
              </ul>
            </ div>
          </ nav>
        </div>
      </div>
      <a href="#Collapse" style={{backgroundColor: "rgb(123, 123, 123)", width: "100%", margin: "auto", textAlign: "center", float: "none", display: "block", zIndex:"50000"}}><span role="img" aria-label="Close Menu">&#9195;</span></a>
      <div className="expandable">
      </div>
    </div>
    
  )
}

export default Mode