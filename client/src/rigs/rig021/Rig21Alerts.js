import React from 'react';

function Rig021Alerts() {

    return(
        <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center">
            <br></br>
            <h1>Alerts</h1>
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

export default Rig021Alerts;