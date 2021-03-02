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
import Indicator from '../../components/Indicator';
import EngineRpm from '../../components/engineRpm';
import OilPressure from '../../components/OilPressure';
import CoolantTemp from '../../components/CoolantTemp';

import Bulb from 'react-bulb';

const color = '#f05b41';

function Rig21LiveCompressor(props) {

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

        try {
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
        } catch (error) {
            console.log(error)
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
                        {/* <img src={require("../../assets/DrillBackground-3.png")} className="gaugeImg" alt="Logo" title="Click to go to Homepage" /> */}
                        <div id="gauge-container">
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
                        <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                    </div>
                    <h4 className="GaugeTitle">Sump Pressure</h4>
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
                        <h4 className="GaugeTitle">Discharge Pressure</h4>
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
                        <h4 className="GaugeTitle">Line Pressure</h4>
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
                    <h4 className="GaugeTitle">Interstage Pressure</h4>
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
                        <h4 className="GaugeTitle">Downhole Pressure</h4>
                    </div>
                    &nbsp;
                </div>
            </div>
                </React.Fragment>
                :
                // Mobile
                

                <React.Fragment>
                    
                    <div className="mobileScale">
                        <FormGroup className="toggleScale mobileScale">
                            <FormControlLabel
                                control={<ScaleSwitch checked={metric} onChange={handleChange} name="checkedA" />}
                                label={(metric) ? 'Metric' : 'Imperial'}
                                labelPlacement="bottom"
                            />
                        </FormGroup>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={(metric) ? waterPressure : ((waterPressure * 14.5038) / 100)}>
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
                                    <span style={{textAlign: "center"}}>{(metric) ? waterPressure : Math.floor(waterPressure * 14.5038)}</span>
                                    <p className="unitSmall">{(metric) ? 'Bar' : "Psi"}</p>
                                </div>
                                <h4 className="GaugeTitleSmall">Water Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
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
                                    <p className="unitSmall">{(metric) ? 'Bar' : "Psi"}</p>
                                </div>
                                <h4 className="GaugeTitleSmall">Rotation Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={(metric) ? bitWeight : (bitWeight * 2.20462)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={(metric) ? 200 : 400}
                                        tickInterval={(metric) ? 20 : 40}
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
                                    <p className="unitSmall">{(metric) ? 'Kgs' : "Lbs"}</p>
                                </div>
                                <h4 className="GaugeTitleSmall">Bit Weight</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
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
                                    <p className="unitSmall">{(metric) ? 'mm/m' : '"/m'}</p>
                                </div>
                                <h4 className="GaugeTitleSmall">Penetration Rate</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
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
                                    <p className="unitSmall">{(metric) ? 'Bar' : "Psi"}</p>
                                </div>
                                <h4 className="GaugeTitleSmall">Holdback Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
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
                                    <p className="unitSmall">{(metric) ? 'Bar' : "Psi"}</p>
                                </div>
                                <h4 className="GaugeTitleSmall">PullDown Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
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
                                    <p className="unitSmall">{rUnit}</p>
                                </div>
                                <h4 className="GaugeTitleSmall">Head RPM</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={engineRpm}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={30}
                                        tickInterval={5}
                                        minorTickInterval={1}
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
                                    <p className='unitSmall'>x100</p>
                                </div>
                                <h4 className="GaugeTitleSmall">Engine RPM</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={(metric) ? (oilPressure * 0.0689476) : oilPressure}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={(metric) ? 10 : 90}
                                        tickInterval={(metric) ? 1 : 10}
                                        minorTickInterval={1}
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
                                    <p className='unitSmall'>{(metric) ? 'Bar' : 'Psi'}</p>
                                </div>
                                <h4 className="GaugeTitleSmall">Oil Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={coolantTemp}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={(metric) ? 120 : 200}
                                        tickInterval={(metric) ? 20 : 50}
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
                                <h4 className='GaugeTitleSmall'>{(metric) ? 'Coolant Temp °C' : 'Coolant Temp °F'}</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={mainPump}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={(metric) ? 400 : 6000}
                                        tickInterval={20}
                                        minorTickInterval={50}
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
                                <p className='unitSmall'>{(metric) ? 'Bar' : 'Psi'}</p>
                                <h4 className="GaugeTitleSmall">Main Pump Pressure</h4>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }

        </React.Fragment>
    )
}

export default Rig21LiveCompressor;