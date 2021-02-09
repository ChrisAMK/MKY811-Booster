import React from "react";

// Banner component is the big title on every Page
function Banner() {
    return(
        <div className="row">
            <div className="col-12 bannerBox">
                <ul className="navbar-nav nav-links">
                    <li>
                        <h3>
                            Control Panel
                        </h3>
                    </li>
                    <li>
                        <h3>
                            Graphs
                        </h3>
                    </li>
                    <li>
                        <h3>
                            Alerts
                        </h3>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Banner