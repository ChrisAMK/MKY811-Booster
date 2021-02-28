// eslint-disable-next-line
import React, { useState, PureComponent, useEffect, Component } from "react";
// eslint-disable-next-line
import API from "../utils/API";


import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


//import Switch from '@material-ui/core/Switch';
import CircularGauge, { Geometry, Scale as CircularScale, Size as CircularSize, ValueIndicator as CircularValueIndicator } from 'devextreme-react/circular-gauge';
import Indicator from '../components/Indicator';
import EngineRpm from '../components/engineRpm';
import OilPressure from '../components/OilPressure';
import CoolantTemp from '../components/CoolantTemp';

import Bulb from 'react-bulb';

const color = '#f05b41';

function Guages() {

    const [engineRpm, setEngineRpm] = useState(0);
    const [oilPressure, setOilPressure] = useState(0);
    const [engineHours, setEngineHours] = useState(0);
    const [coolantTemp, setCoolantTemp] = useState(0);
    const [headPosition, setHeadPosition] = useState(0);
    const [holeDepth, setHoleDepth] = useState(0);
    const [rotationRpm, setRotationRpm] = useState(0);
    const [penetrationRate, setPenetrationRate] = useState(0);
    const [mastAngle, setMastAngle] = useState(0);
    const [deckRoll, setDeckRoll] = useState(0);
    const [deckPitch, setDeckPitch] = useState(0);
    const [headBackRack, setHeadBackRack] = useState("");
    const [footClamp, setFootClamp] = useState("");
    const [coolantLevel, setCoolantLevel] = useState("");
    const [rotationReversePressure, setRotationReversePressure] = useState(0);
    const [rotationForwardPressure, setRotationForwardPressure] = useState(0);
    const [holdback, setHoldback] = useState(0);
    const [pulldown, setPulldown] = useState(0);
    const [waterPressure, setWaterPressure] = useState(0);
    const [mainPump, setMainPump] = useState(0);
    const [winchDown, setWinchDown] = useState(0);
    const [winchUp, setWinchUp] = useState(0);
    const [bitWeight, setBitWeight] = useState(0);
    const [driller, setDriller] = useState(0);
    const [count, setCount] = useState(0);
    const [pUnit, setpUnit] = useState("Bar");
    const [rUnit, setrUnit] = useState("Rpm");
    const [mUnit, setmUnit] = useState("mm/s");
    const [wUnit, setwUnit] = useState('Kgs');
    const [metric, setMetric] = useState(true);

    const handleChange = (event) => {
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

    const getData = async () => {

        const lastEntry = await API.getLastEntry();
        console.log(lastEntry);
        setEngineRpm(lastEntry[0].engineRPM || 0);
        setOilPressure(lastEntry[0].oilPressure || 0);
        setEngineHours(lastEntry[0].engineHours || 0);
        setCoolantTemp(lastEntry[0].coolantTemp || 0);
        setHeadPosition(lastEntry[0].headPosition || 0);
        setHoleDepth(lastEntry[0].holeDepth || 0);
        setRotationRpm(lastEntry[0].rotationRpm || 0);
        setPenetrationRate(lastEntry[0].penetrationRate || 0);
        setMastAngle(lastEntry[0].mastAngle || 0);
        setDeckRoll(lastEntry[0].deckRoll || 0);
        setDeckPitch(lastEntry[0].deckPitch || 0);
        setMainPump(lastEntry[0].mainPumpPressure || 0);
        setRotationReversePressure(lastEntry[0].rotationReversePressure || 0);
        setRotationForwardPressure(lastEntry[0].rotationForwardPressure || 0);
        setHoldback(lastEntry[0].holdBackPressure || 0);
        setPulldown(lastEntry[0].pulldownPressure || 0);
        setWaterPressure(lastEntry[0].waterPressure || 0);
        setWinchUp(lastEntry[0].winchUpPressure || 0);
        setWinchDown(lastEntry[0].winchDownPressure || 0);
        setBitWeight(lastEntry[0].bitWeight || 0);
        setDriller(lastEntry[0].driller || 0);

        //  

        /// BOOLEANS
        if (lastEntry[0].coolantLevelSensor === false) {
            setCoolantLevel("red");
        } else {
            setCoolantLevel("green");
        }

        if (lastEntry[0].footClampPressureSwitch === false) {
            setFootClamp("red");
        } else {
            setFootClamp("green");
        }

        if (lastEntry[0].headBackRackProxyStatus === false) {
            setHeadBackRack("red");
        } else {
            setHeadBackRack("green");
        }
    }

    useEffect(() => {

        let timer = setInterval(() => {
            getData()
        }, 1000);

        return () => {
            clearInterval(timer)
        }

    }, [])

    return (
        <React.Fragment>
    
            {(window.outerWidth > 1500) ?
                <React.Fragment>
                    <div id="gauge-demo">
                        <img src={require("../assets/DrillBackground-3.png")} className="gaugeImg" alt="Logo" title="Click to go to Homepage" />
                        <div id="gauge-container">
                            <div className="left-section">
                                <EngineRpm
                                    value={engineRpm}
                                    inverted={false}
                                    startAngle={180}
                                    endAngle={90}
                                    color={color}
                                />
                                <p className='engineRpmScale'>x100</p>
                                <p className='sideGuageTitle'>Engine RPM</p>
                                <OilPressure
                                    value={(metric) ? (oilPressure * 0.0689476) : oilPressure}
                                    inverted={true}
                                    startAngle={-90}
                                    endAngle={-180}
                                    color={color}
                                    scale={metric}
                                />
                                <p className='oilPressureScale'>{(metric) ? 'Bar' : 'Psi'}</p>
                                <p className='sideGuageTitle'>Oil Pressure</p>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={(metric) ? waterPressure : (waterPressure * 14.5038)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={(metric) ? 100 : 1500}
                                        tickInterval={(metric) ? 20 : 500}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{(metric) ? waterPressure : Math.floor(waterPressure * 14.5038)}</span>
                                    <p className="unit">{(metric) ? 'Bar' : "Psi" }</p>
                                </div>
                                <h4 className="GaugeTitle">Water Pressure</h4>
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
                                    <p className="unit">{(metric) ? 'Bar' : "Psi" }</p>
                                </div>
                                <h4 className="GaugeTitle">Rotation Pressure</h4>
                            </div>
                    &nbsp;
                    
                    <div className="center-section">
                                <CircularGauge value={(metric) ? bitWeight : (bitWeight * 2.20462)}>
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
                                    <span>{(metric) ? bitWeight : Math.floor(bitWeight * 2.20462)}</span>
                                    <p className="unit">{(metric) ? 'Kgs' : "Lbs" }</p>
                                </div>
                                <h4 className="GaugeTitle">Bit Weight</h4>
                                <FormGroup className="toggleScale">
                                <FormControlLabel
                                    control={<ScaleSwitch checked={metric} onChange={handleChange} name="checkedA" />}
                                    label={(metric) ? 'Metric' : 'Imperial'}
                                    labelPlacement="bottom"
                                />
                                </FormGroup>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={(metric) ? penetrationRate : (penetrationRate * 0.0393701)}>
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
                                    <span>{(metric) ? penetrationRate : Math.floor(penetrationRate * 0.0393701)}</span>
                                    <p className="unit">{(metric) ? 'mm/m' : '"/m'}</p>
                                </div>
                                <h4 className="GaugeTitle">Penetration Rate</h4>
                            </div>
                    &nbsp;
                    <div className="right-section">
                                <div className="coolantLevel">
                                    <p className="coolantLevel">Coolant Level</p>
                                    <Bulb
                                        color={coolantLevel}
                                        size={10}
                                    />
                                </div>
                                <CoolantTemp
                                    value={(metric) ? coolantTemp : (coolantTemp * 9/5) + 32}
                                    inverted={true}
                                    startAngle={90}
                                    endAngle={0}
                                    color={color}
                                    scale={metric}
                                />
                                <p className='sideGuageTitle'>{(metric) ? 'Coolant Temp °C' : 'Coolant Temp °F'}</p>
                                <Indicator
                                    value={(metric) ? mainPump : (mainPump * 14.5038)}
                                    inverted={false}
                                    startAngle={0}
                                    endAngle={-90}
                                    color={color}
                                    scale={metric}
                                />
                                <p className='mainPumpScale'>{(metric) ? 'Bar' : 'Psi'}</p>
                                <p className='sideGuageTitle'>Main Pump</p>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo">
                        <div id="gauge-container">
                            <div className="left-section">
                                <div className="sideGauge placeholder">
                                    <p></p>
                                </div>
                                <div className="sideGauge">
                                    <p>Head Position</p>
                                    <h4>{headPosition} mm</h4>
                                </div>
                                <div className="sideGauge">
                                    <p>Hole Depth</p>
                                    <h4>{holeDepth} m</h4>
                                </div><div className="sideGauge">
                                    <p>Driller ID</p>
                                    <h6>{driller}</h6>
                                </div>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={(metric) ? holdback : (holdback * 14.5038)}>
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
                                    <span>{(metric) ? holdback : Math.floor(holdback * 14.5038)}</span>
                                    <p className="unit">{(metric) ? 'Bar' : "Psi" }</p>
                                </div>
                                <h4 className="GaugeTitle">Holdback Pressure</h4>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={(metric) ? holdback : (holdback * 14.5038)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={(metric) ? 200 : 2500}
                                        tickInterval={(metric) ? 50 : 500}
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
                                    <span>{(metric) ? pulldown : Math.floor(pulldown * 14.5038)}</span>
                                    <p className="unit">{(metric) ? 'Bar' : "Psi" }</p>
                                </div>
                                <h4 className="GaugeTitle">PullDown Pressure</h4>
                                
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={parseInt(rotationRpm)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={30}
                                        tickInterval={2}
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
                                    <span>{parseInt(rotationRpm)}</span>
                                    <p className="unit">{rUnit}</p>
                                </div>
                                <h4 className="GaugeTitle">Head RPM</h4>
                            </div>
                &nbsp;
                    <div className="right-section">
                                <div className="sideGauge placeholder">
                                    <p></p>
                                </div>
                                <div className="sideGauge">
                                    <p>Head Rack Back</p>
                                    <Bulb
                                        color={headBackRack}
                                        size={10}
                                    />
                                </div>
                                <div className="sideGauge">
                                    <p>Foot Clamp</p>
                                    <Bulb
                                        color={footClamp}
                                        size={10}
                                    />
                                </div>
                                <div className="sideGauge">
                                    <p>Engine Hours</p>
                                    <h4>{engineHours} Hrs</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                :
                // Mobile
                <React.Fragment>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(waterPressure)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{waterPressure}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Water Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(rotationForwardPressure)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={100}
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
                                    <span>{rotationForwardPressure}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Rotation Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(bitWeight)}>
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
                                    <span>{bitWeight}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Bit Weight</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(penetrationRate)}>
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
                                    <span>{penetrationRate}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Penetration Rate</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(holdback)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={400}
                                        tickInterval={50}
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
                                    <span>{parseInt(holdback)}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Holdback Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(pulldown)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={400}
                                        tickInterval={50}
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
                                    <span>{parseInt(pulldown)}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">PullDown Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={parseInt(rotationRpm)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={30}
                                        tickInterval={2}
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
                                    <span>{parseInt(rotationRpm)}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Head RPM</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={engineRpm}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{engineRpm}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Engine RPM</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={oilPressure}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{oilPressure}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Oil Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={coolantTemp}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{coolantTemp}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Coolant Temp</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={mainPump}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={200}
                                        tickInterval={20}
                                        minorTickInterval={10}
                                    />
                                    <Geometry startAngle={225}
                                        endAngle={315}
                                    />
                                    <CircularValueIndicator
                                        type="twoColorNeedle"
                                        secondFraction={.4}
                                        width={5}
                                        color=""
                                        secondColor={color}
                                    />
                                </CircularGauge>

                                <div className="speed-value">
                                    <span>{mainPump}</span>
                                </div>
                                <h4 className="GaugeTitleSmall">Main Pump Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="infoContainer">
                        <div className="row">
                            <div className="col-12 drillStats">
                                <h6>Driller ID</h6>
                                <h1>{driller}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6 drillStats">
                                <h6>Head Position</h6>
                                <h1>{headPosition}</h1>
                            </div>
                            <div className="col-12 col-sm-6 drillStats">
                                <h6>Hole Depth</h6>
                                <h1>{holeDepth}</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-sm-6 drillStats">
                                <h6>Driller ID</h6>
                                <h1>{driller}</h1>
                            </div>
                            <div className="col-12 col-sm-6 drillStats">
                                <h6>Engine Hours:</h6>
                                <h1>{engineHours} Hrs</h1>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }

        </React.Fragment>
    )
}

export default Guages;