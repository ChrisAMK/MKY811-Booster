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
        let unmounted = false;

        const getData = async () => {
            if (props.live === true && !(unmounted)) {
                try {
                    const lastEntry = await API.getLastEntry("rig08", "engine");
                    console.log(lastEntry)
                    setEngineRpm(parseInt(lastEntry[0].engineRPM) || 0);
                    setOilPressure(parseInt(lastEntry[0].oilPressure) || 0);
                    setEngineHours(parseInt(lastEntry[0].engineHours) || 0);
                    setCoolantTemp(parseInt(lastEntry[0].coolantTemp) || 0);
                    setMainPump(parseInt(lastEntry[0].mainPumpPressure) || 0);
                    setEngineOilTemp(parseInt(lastEntry[0].engineOilTemp) || 0);
                    setIntakeTemp(parseInt(lastEntry[0].intakeManifoldTemp) || 0);
                    setEngineTorque(parseInt(lastEntry[0].engineTorque) || 0);
                    setEngineIntercoolerTemp(parseInt(lastEntry[0].intercoolerTemp) || 0);
                    setTurboSpeed(parseInt(lastEntry[0].turboRpm) || 0);
                    setEngineOilLevel(parseInt(lastEntry[0].engineOilLevel) || 0);
        
                } catch (error) {
                    console.log(error)
                }
            } else if (!(unmounted)) {
                try {
                    const searchEntry = await API.getExactTime("rig08", "engine", props.time.year, props.time.month, props.time.day, props.time.hour, props.time.minute, props.time.second);
                    setEngineRpm(parseInt(searchEntry[0].engineRPM) || 0);
                    setOilPressure(parseInt(searchEntry[0].oilPressure) || 0);
                    setEngineHours(parseInt(searchEntry[0].engineHours) || 0);
                    setCoolantTemp(parseInt(searchEntry[0].coolantTemp) || 0);
                    setMainPump(parseInt(searchEntry[0].mainPumpPressure) || 0);
                    setEngineOilTemp(parseInt(searchEntry[0].engineOilTemp) || 0);
                    setIntakeTemp(parseInt(searchEntry[0].intakeManifoldTemp) || 0);
                    setEngineTorque(parseInt(searchEntry[0].engineTorque) || 0);
                    setEngineIntercoolerTemp(parseInt(searchEntry[0].intercoolerTemp) || 0);
                    setTurboSpeed(parseInt(searchEntry[0].turboRpm) || 0);
                    setEngineOilLevel(parseInt(searchEntry[0].engineOilLevel) || 0);
                } catch (error) {
                    console.log(error)
                }
            }
        }

        let timer = setInterval(() => {
            getData()
        }, 1000);

        return () => {
            clearInterval(timer);
            unmounted = true;
        }

    }, [props.live, props.time])


    return (
        <React.Fragment>
            {engineHours}
            <div id="gauge-demo">
                {/* <img src={require("../../assets/DrillBackground-3.png")} className="gaugeImg" alt="Logo" title="Click to go to Homepage" /> */}
                <div id="gauge-container">
                    <div className="center-section">
                        <CircularGauge value={engineRpm / 100}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={0}
                                endValue={300}
                                tickInterval={50}
                                minorTickInterval={50}

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
                            <span>{Math.floor(engineRpm / 10)}</span>
                            <p className="unit">Rpm x10</p>
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