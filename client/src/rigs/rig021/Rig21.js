import React, {useState} from 'react';
import Rig8Live from './Rig21Live';
import Rig8Alerts from './Rig21Alerts';
import Rig8Statistics from './Rig21Statistics';
import Button from '@material-ui/core/Button';

function Rig08() {
        // We use page state to determine which sub-component is to be rendered inside the manager page
        const [page, setPage] = useState("");

        // Manager function navigation function
        const handlePageChange = (navPage) => {
            setPage(navPage)
        }
    
        const toRender = () => {
            switch (page) {
                case "":
                    return <Rig8Live handlePageChange={handlePageChange}/>
                case "Alerts":
                    return <Rig8Alerts handlePageChange={handlePageChange}/>
                case "Statistics":
                    return <Rig8Statistics handlePageChange={handlePageChange}/>
                case "Live":
                    return <Rig8Live handlePageChange={handlePageChange}/>
                default:
                    return <Rig8Live handlePageChange={handlePageChange}/>
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
            <h1 style={{textAlign: "center"}}>RIG 21</h1>
            {toRender()}
        </React.Fragment>
    )
}

export default Rig08;