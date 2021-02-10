import React from "react";
import { Link } from "react-router-dom";

function Mode() {
  return (
    <div id="content">
      <a href="#nav" style={{width: "100%", margin: "auto", textAlign: "center", float: "none", display: "block"}}><span role="img" aria-label="Collapse Menu">&#9196;</span></a>
      
      <div className="expandable" id="nav">
        <div className="modeContainer">
          <nav className="navbar navbar-expand-lg navbar-light modeContainer">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto modeSpace">
                <li className="nav-item active modeSpace">
                  <Link to={"/Gauges"}><a className="nav-link" href="/gauges">Control Panel <span className="sr-only">(current)</span></a></Link>
                </li>
                <li className="nav-item modeSpace">
                  <Link to={"/Graphs"}><a className="nav-link" href="/Graphs">Graphs</a></Link> 
                </li>
                <li className="nav-item modeSpace">
                  <Link to={"/Alerts"}><a className="nav-link" href="/Graphs">Alerts</a></Link>
                </li>
              
              </ul>
            </ div>
          </ nav>
        </div>
      </div>
      <a href="#" style={{width: "100%", margin: "auto", textAlign: "center", float: "none", display: "block"}}><span role="img" aria-label="Close Menu">&#9195;</span></a>
      <div className="expandable">
      </div>
    </div>
    
  )
}

export default Mode