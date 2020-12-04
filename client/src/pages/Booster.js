import React, { useState } from "react";
import Button from '@material-ui/core/Button';
//import Switch from '@material-ui/core/Switch';

import API from "../utils/API";


// Renders when the user navigates to the Search page
function Booster() {

    // setting up state for the searched books
    // eslint-disable-next-line
    const [hours, setHours] = useState("");
    // eslint-disable-next-line
    const [temp, setTemp] = useState("");

    // useEffect(() => {
    //     }
    // }, [])

    let live;

    // handles the switch to Live
    function change() {

        const liveFeed = async () => {
            const rigInfo = await API.getLastLog();
            console.log(rigInfo);
            if (rigInfo.length === 0) {
                setHours(0);
                setTemp(0);
            } else {
                setHours(rigInfo[0].hours);
                setTemp(rigInfo[0].temp);
            }
        }

        if (!live) {
            live = window.setInterval(liveFeed,5000);
        } else {
            window.clearInterval(live);
            live = null;
        }
    }
    

    return(
        <React.Fragment>
            <div className="row bannerBox text-center">
                <div className="col-12 col-sm-6">
                    <h1>Booster Temp</h1>
                    <h1>{temp}°</h1>
                </div>
                <div className="col-12 col-sm-6">
                    <h1>Booster Hours</h1>
                    <h1>{hours}</h1>
                </div>
            </div>
            <div className="row bannerBox text-center">
                <div className="col-12">
                {/* <Switch
                    checked={live}
                    onChange={handleLive}
                    name="checkedB"
                    color="primary"
                /> */}
                <Button variant="contained" color="primary" className="userBtn" onClick={change}>
                    Turn on Live
                </Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Booster;