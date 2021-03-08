// eslint-disable-next-line
import React, { useState, PureComponent, useEffect, Component } from "react";
// eslint-disable-next-line
import API from "../../utils/API";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

//import Switch from '@material-ui/core/Switch';
import CircularGauge, { Geometry, Scale as CircularScale, Size as CircularSize, ValueIndicator as CircularValueIndicator } from 'devextreme-react/circular-gauge';

const color = '#f05b41';


function Rig08LiveEngine(props) {

    const [engineRpm, setEngineRpm] = useState(0);
    const [oilPressure, setOilPressure] = useState(0);
    const [engineHours, setEngineHours] = useState(0);
    const [coolantTemp, setCoolantTemp] = useState(0);
    const [mainPump, setMainPump] = useState(0);
    const [engineOilTemp, setEngineOilTemp] = useState(0);

    const [intakeTemp, setIntakeTemp] = useState(0);
    const [engineTorque, setEngineTorque] = useState(0);
    const [engineIntercoolerTemp, setEngineIntercoolerTemp] = useState(0);
    const [turboSpeed, setTurboSpeed] = useState(0);
    const [engineOilLevel, setEngineOilLevel] = useState(0);

    const [metric, setMetric] = useState(true);

    const handleChange = () => {
        if (metric) {
            setMetric(false);
        } else {
            setMetric(true);
        }
    };

    const ScaleSwitch = withStyles({
        switchBase: {
            color: "#f05b41",
            '&$checked': {
                color: "#f05b41",
            },
            '&$checked + $track': {
                backgroundColor: "#f05b41",
            },
        },
        checked: {},
        track: {},
    })(Switch);

    useEffect(() => {

        const getData = async () => {
            if (props.live === true) {
                try {
                    const lastEntry = await API.getLastEntry("rig08");
                    setEngineRpm(parseInt(lastEntry[0].engineRPM) || 0);
                    setOilPressure(parseInt(lastEntry[0].oilPressure) || 0);
                    setEngineHours(parseInt(lastEntry[0].engineHours) || 0);
                    setCoolantTemp(parseInt(lastEntry[0].coolantTemp) || 0);
                    setMainPump(parseInt(lastEntry[0].mainPumpPressure) || 0);
                    setEngineOilTemp(parseInt(lastEntry[0].engineOilTemp) || 0);
                    setIntakeTemp(parseInt(lastEntry[0].intakeTemp) || 0);
                    setEngineTorque(parseInt(lastEntry[0].engineTorque) || 0);
                    setEngineIntercoolerTemp(parseInt(lastEntry[0].engineIntercoolerTemp) || 0);
                    setTurboSpeed(parseInt(lastEntry[0].turboSpeed) || 0);
                    setEngineOilLevel(parseInt(lastEntry[0].engineOilLevel) || 0);
        
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log("not live")
            }
        }

        let timer = setInterval(() => {
            getData()
        }, 1000);

        return () => {
            clearInterval(timer)
        }

    }, [props.live])


    return (
        <React.Fragment>
            {engineHours}
            <div id="gauge-demo">
                {/* <img src={require("../../assets/DrillBackground-3.png")} className="gaugeImg" alt="Logo" title="Click to go to Homepage" /> */}
                <div id="gauge-container">
                    <div className="center-section">
                        <CircularGauge value={engineRpm}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={0}
                                endValue={30}
                                tickInterval={5}
                                minorTickInterval={5}

                            />
                            <Geometry startAngle={225} endAngle={315} />
                            <CircularValueIndicator
                                type="twoColorNeedle"
                                secondFraction={0.4}
                                color="none"
                                secondColor={color}
                                width={5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{mainPump}</span>
                            <p className="unit">Rpm</p>
                        </div>
                        <h4 className="GaugeTitle">Engine RPM</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={(metric) ? oilPressure : (oilPressure * 14.5038)}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={0}
                                endValue={(metric) ? 400 : 5800}
                                tickInterval={(metric) ? 100 : 1000}
                                minorTickInterval={10}
                            />
                            <Geometry startAngle={225} endAngle={315} />
                            <CircularValueIndicator
                                type="twoColorNeedle"
                                secondFraction={0.4}
                                color="none"
                                secondColor={color}
                                width={5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{(metric) ? oilPressure : Math.floor(oilPressure * 14.5038)}</span>
                            <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                        </div>
                        <h4 className="GaugeTitle">Oil Pressure</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={(metric) ? coolantTemp : (coolantTemp * 14.5038)}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={0}
                                endValue={(metric) ? 400 : 5800}
                                tickInterval={(metric) ? 100 : 1000}
                                minorTickInterval={10}
                            />
                            <Geometry startAngle={225} endAngle={315} />
                            <CircularValueIndicator
                                type="twoColorNeedle"
                                secondFraction={0.4}
                                color="none"
                                secondColor={color}
                                width={5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{(metric) ? coolantTemp : Math.floor(coolantTemp * 14.5038)}</span>
                            <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                        </div>
                        <h4 className="GaugeTitle">Coolant Temp</h4>
                        <FormGroup className="toggleScale Compressor">
                            <FormControlLabel
                                control={<ScaleSwitch checked={metric} onChange={handleChange} name="checkedA" />}
                                label={(metric) ? 'Metric' : 'Imperial'}
                                labelPlacement="bottom"
                            />
                        </FormGroup>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={(metric) ? mainPump : (mainPump * 14.5038)}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={0}
                                endValue={(metric) ? 400 : 5800}
                                tickInterval={(metric) ? 100 : 1000}
                                minorTickInterval={10}
                            />
                            <Geometry startAngle={225} endAngle={315} />
                            <CircularValueIndicator
                                type="twoColorNeedle"
                                secondFraction={0.4}
                                color="none"
                                secondColor={color}
                                width={5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{(metric) ? mainPump : Math.floor(mainPump * 14.5038)}</span>
                            <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                        </div>
                        <h4 className="GaugeTitle">Main Pump Pressure</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={(metric) ? engineOilTemp : (engineOilTemp * 0.0393701)}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={20}
                                endValue={200}
                                tickInterval={20}
                                minorTickInterval={10}
                            />
                            <Geometry startAngle={225} endAngle={315} />
                            <CircularValueIndicator
                                type="twoColorNeedle"
                                secondFraction={0.4}
                                color="none"
                                secondColor={color}
                                width={5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{(metric) ? engineOilTemp : Math.floor(engineOilTemp * 0.0393701)}</span>
                            <p className="unit">{(metric) ? 'mm/m' : '"/m'}</p>
                        </div>
                        <h4 className="GaugeTitle">Engine Oil Temperature</h4>
                    </div>
                    &nbsp;
                </div>
            </div>
            <div id="gauge-demo">
                {/* <img src={require("../../assets/DrillBackground-3.png")} className="gaugeImg" alt="Logo" title="Click to go to Homepage" /> */}
                <div id="gauge-container">
                    <div className="center-section">
                        <CircularGauge value={(metric) ? intakeTemp : (intakeTemp * 14.5038)}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={0}
                                endValue={(metric) ? 200 : 5000}
                                tickInterval={(metric) ? 50 : 1000}
                                minorTickInterval={(metric) ? 10 : 200}

                            />
                            <Geometry startAngle={225} endAngle={315} />
                            <CircularValueIndicator
                                type="twoColorNeedle"
                                secondFraction={0.4}
                                color="none"
                                secondColor={color}
                                width={5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{(metric) ? intakeTemp : Math.floor(intakeTemp * 14.5038)}</span>
                            <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                        </div>
                        <h4 className="GaugeTitle">Intake Manifold Temp</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={(metric) ? engineTorque : (engineTorque * 14.5038)}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={0}
                                endValue={(metric) ? 400 : 5800}
                                tickInterval={(metric) ? 100 : 1000}
                                minorTickInterval={10}
                            />
                            <Geometry startAngle={225} endAngle={315} />
                            <CircularValueIndicator
                                type="twoColorNeedle"
                                secondFraction={0.4}
                                color="none"
                                secondColor={color}
                                width={5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{(metric) ? engineTorque : Math.floor(engineTorque * 14.5038)}</span>
                            <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                        </div>
                        <h4 className="GaugeTitle">Engine Torque</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={(metric) ? engineIntercoolerTemp : (engineIntercoolerTemp * 14.5038)}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={0}
                                endValue={(metric) ? 400 : 5800}
                                tickInterval={(metric) ? 100 : 1000}
                                minorTickInterval={10}
                            />
                            <Geometry startAngle={225} endAngle={315} />
                            <CircularValueIndicator
                                type="twoColorNeedle"
                                secondFraction={0.4}
                                color="none"
                                secondColor={color}
                                width={5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{(metric) ? engineIntercoolerTemp : Math.floor(engineIntercoolerTemp * 14.5038)}</span>
                            <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                        </div>
                        <h4 className="GaugeTitle">Engine Intercooler Temp</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={(metric) ? turboSpeed : (turboSpeed * 14.5038)}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={0}
                                endValue={(metric) ? 400 : 5800}
                                tickInterval={(metric) ? 100 : 1000}
                                minorTickInterval={10}
                            />
                            <Geometry startAngle={225} endAngle={315} />
                            <CircularValueIndicator
                                type="twoColorNeedle"
                                secondFraction={0.4}
                                color="none"
                                secondColor={color}
                                width={5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{(metric) ? turboSpeed : Math.floor(turboSpeed * 14.5038)}</span>
                            <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                        </div>
                        <h4 className="GaugeTitle">Turbo Speed</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={(metric) ? engineOilLevel : (engineOilLevel * 0.0393701)}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={20}
                                endValue={200}
                                tickInterval={20}
                                minorTickInterval={10}
                            />
                            <Geometry startAngle={225} endAngle={315} />
                            <CircularValueIndicator
                                type="twoColorNeedle"
                                secondFraction={0.4}
                                color="none"
                                secondColor={color}
                                width={5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{(metric) ? engineOilLevel : Math.floor(engineOilLevel * 0.0393701)}</span>
                            <p className="unit">{(metric) ? 'mm/m' : '"/m'}</p>
                        </div>
                        <h4 className="GaugeTitle">Engine Oil Level</h4>
                    </div>
                    &nbsp;
                </div>
            </div>
        </React.Fragment>
    )
}

export default Rig08LiveEngine;