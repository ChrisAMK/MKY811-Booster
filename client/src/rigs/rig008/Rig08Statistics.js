import React from 'react';

// import {
//     LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   } from 'recharts';

function Rig21Statistics() {

    // const data = [
    //     {
    //       name: 'Monday', uv: 4000, pv: 2400, amt: 2400,
    //     },
    //     {
    //       name: 'Tuesday', uv: 9000, pv: 1398, amt: 2210,
    //     },
    //     {
    //       name: 'Wednesday', uv: 2000, pv: 9800, amt: 2290,
    //     },
    //     {
    //       name: 'Thursday', uv: 2780, pv: 3908, amt: 2000,
    //     },
    //     {
    //       name: 'Friday', uv: 1890, pv: 4800, amt: 2181,
    //     },
    //     {
    //       name: 'Saturday', uv: 2390, pv: 3800, amt: 2500,
    //     },
    //     {
    //       name: 'Sunday', uv: 3490, pv: 4300, amt: 2100,
    //     },
    // ];

    return(
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <br></br>
                  <h1>Statistics</h1>
                  <hr></hr>
                    <img src={require("../../assets/construction.png")} className="construction" alt="Logo" title="Click to go to Homepage" />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center">
                    {/* <h3>Weekly Max Temp</h3> */}
                    {/* <LineChart
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
                    </LineChart> */}
                </div>
            </div>
        )
}

export default Rig21Statistics;