import React, {useState, useEffect} from 'react';
import Rig08Live from './Rig08Live';
import Rig08Alerts from './Rig08Alerts';
import Rig08Statistics from './Rig08Statistics';
import Button from '@material-ui/core/Button';

function Rig21() {
        // We use page state to determine which sub-component is to be rendered inside the manager page
        const [page, setPage] = useState("");

        // Manager function navigation function
        const handlePageChange = (navPage) => {
            setPage(navPage)
        }
    
        const toRender = () => {
            switch (page) {
                case "":
                    return <Rig08Live/>
                case "Alerts":
                    return <Rig08Alerts/>
                case "Statistics":
                    return <Rig08Statistics/>
                case "Live":
                    return <Rig08Live/>
                default:
                    return <Rig08Live/>
            }
        }

    return(
        <React.Fragment>
            {(window.outerWidth > 900) ? <React.Fragment></React.Fragment>: <React.Fragment><br /><br /></React.Fragment>}
            <div className="navButton">
                <Button onClick={() => setPage("Live")}>Live</Button>
                <Button onClick={() => setPage("Statistics")}>Statistics</Button>
                <Button onClick={() => setPage("Alerts")}>Alerts</Button>
            </div>
            <h1 style={{textAlign: "center"}}>RIG 08</h1>
            {toRender()}
        </React.Fragment>
    )
}

export default Rig21;