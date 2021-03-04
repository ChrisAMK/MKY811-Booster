// eslint-disable-next-line
import React, { useState } from "react";
// eslint-disable-next-line

import Rig08LiveCompressor from './Rig08LiveCompressor';
import Rig08LiveEngine from './Rig08LiveEngine';
import Rig08LiveDrilling from './Rig08LiveDrilling';

import Button from '@material-ui/core/Button';

function Rig21Live(props) {

    // We use page state to determine which sub-component is to be rendered inside the manager page
    const [page, setPage] = useState("");


    const toRender = () => {
        switch (page) {
            case "":
                return <Rig08LiveDrilling/>
            case "Compressor":
                return <Rig08LiveCompressor/>
            case "Engine":
                return <Rig08LiveEngine/>
            case "Drilling":
                return <Rig08LiveDrilling/>
            default:
                return <Rig08LiveDrilling/>
        }
    }

   
    return (
        <React.Fragment>
            {(window.outerWidth > 900) ? <React.Fragment></React.Fragment>: <React.Fragment><br /><br /></React.Fragment>}
            <br></br>
            <div className="navButton">
                <Button onClick={() => setPage("Drilling")}>Drilling</Button>
                <Button onClick={() => setPage("Engine")}>Engine</Button>
                <Button onClick={() => setPage("Compressor")}>Compressor</Button>
            </div>
            {toRender()}
        </React.Fragment>
    )
}

export default Rig21Live;