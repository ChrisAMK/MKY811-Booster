import React, { useState, PureComponent } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
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

    const data = [
        {
          name: 'Monday', uv: 4000, pv: 2400, amt: 2400,
        },
        {
          name: 'Tuesday', uv: 3000, pv: 1398, amt: 2210,
        },
        {
          name: 'Wednesday', uv: 2000, pv: 9800, amt: 2290,
        },
        {
          name: 'Thursday', uv: 2780, pv: 3908, amt: 2000,
        },
        {
          name: 'Friday', uv: 1890, pv: 4800, amt: 2181,
        },
        {
          name: 'Saturday', uv: 2390, pv: 3800, amt: 2500,
        },
        {
          name: 'Sunday', uv: 3490, pv: 4300, amt: 2100,
        },
      ];
    

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
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 text-center">
                    <h3>Weekly Max Temp</h3>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 text-center">
                    <h3>Weekly Max Temp</h3>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </div>
            </div>
            
            
            
        </React.Fragment>
    )
}

export default Booster;