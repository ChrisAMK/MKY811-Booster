// eslint-disable-next-line
import React, { useState, useEffect } from "react";
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

const color = '#cc0e0e';

function Rig08LiveDrilling(props) {

    const [engineRpm, setEngineRpm] = useState(0);
    const [oilPressure, setOilPressure] = useState(0);
    const [holdback, setHoldback] = useState(0);
    const [downholeAir, setDownholeAir] = useState(0);
    const [mainPump, setMainPump] = useState(0);
    const [penetrationRate, setPenetrationRate] = useState(0);
    const [coolantTemp, setCoolantTemp] = useState(0);
    const [headPosition, setHeadPosition] = useState(0);
    const [holeDepth, setHoleDepth] = useState(0);
    const [driller, setDriller] = useState("");
    const [bitWeight, setBitWeight] = useState(0);
    const [pulldown, setPulldown] = useState(0);
    const [rotationRpm, setRotationRpm] = useState(0);
    const [waterPressure, setWaterPressure] = useState(0);
    const [rodloaderPosition, setRodloaderPosition] = useState("");
    const [headRef, setHeadRef] = useState("");
    const [engineHours, setEngineHours] = useState(0);
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [second, setSecond] = useState("");
    const [mastAngle, setMastAngle] = useState(0);
    const [deckRoll, setDeckRoll] = useState(0);
    const [deckPitch, setDeckPitch] = useState(0);
    const [outsideTemp, setOutsideTemp] = useState(0);
    const [metric, setMetric] = useState(true);
    const [ready, setReady] = useState(false);

    const toggleMetric = () => {
        metric ? setMetric(false) : setMetric(true);
    };

    const ScaleSwitch = withStyles({
        switchBase: {
            color: "#cc0e0e",
            '&$checked': {
                color: "#cc0e0e",
            },
            '&$checked + $track': {
                backgroundColor: "#cc0e0e",
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
                    const lastEntry = await API.getLastEntry("rig08", "drilling");
                    console.log(lastEntry, "HERE");
                    const driller = lastEntry[0].driller.split("\x00");
                    setEngineRpm(parseInt(lastEntry[0].engineRPM) || 0);
                    setOilPressure(parseInt(lastEntry[0].oilPressure) || 0);
                    setEngineHours(parseInt(lastEntry[0].engineHours) || 0);
                    setCoolantTemp(parseInt(lastEntry[0].coolantTemp) || 0);
                    setHeadPosition(parseInt(lastEntry[0].headPosition) || 0);
                    setHoleDepth(parseInt(lastEntry[0].holeDepth) || 0);
                    setRotationRpm(parseInt(lastEntry[0].rotationRpm) || 0);
                    setPenetrationRate(parseInt(lastEntry[0].penetrationRate) || 0);
                    setDownholeAir(parseInt(lastEntry[0].DownholeAirPressure) || 0);
                    setMainPump(parseInt(lastEntry[0].mainPumpPressure) || 0);
                    setHoldback(parseInt(lastEntry[0].holdBackPressure) || 0);
                    setPulldown(parseInt(lastEntry[0].pulldownPressure) || 0);
                    setWaterPressure(parseInt(lastEntry[0].waterPressure) || 0);
                    setBitWeight(parseInt(lastEntry[0].bitWeight) || 0);
                    setDriller(driller[0].toUpperCase() || 0);
                    setYear(lastEntry[0].year || 0);
                    setMonth(lastEntry[0].month || 0);
                    setDay(lastEntry[0].date || 0);
                    setHour(lastEntry[0].hour || 0);
                    setMinute(lastEntry[0].minute || 0);
                    setSecond(lastEntry[0].second || 0);
                    setMastAngle(lastEntry[0].mastAngle || 0)
                    setDeckRoll(lastEntry[0].deckRoll || 0);
                    setDeckPitch(lastEntry[0].deckPitch || 0);
                    setOutsideTemp(lastEntry[0].outsideTemp || 0);

                    /// BOOLEANS
                    if (lastEntry[0].rodLoaderPosition === null) {
                        setRodloaderPosition("red");
                    } else {
                        setRodloaderPosition("green");
                    }

                    if (lastEntry[0].headRefPosition === true) {
                        setHeadRef("green");
                    } else {
                        setHeadRef("red");
                    }

                    setReady(true);
                } catch (error) {
                    console.log(error)
                }
            } else if (!(unmounted)) {
                try {
                    const searchEntry = await API.getExactTime("rig08", "drilling", props.time.year, props.time.month, props.time.day, props.time.hour, props.time.minute, props.time.second);
                    console.log(searchEntry)
                    const driller = searchEntry[0].driller.split("\x00")
                    setEngineRpm(parseInt(searchEntry[0].engineRPM) || 0);
                    setOilPressure(parseInt(searchEntry[0].oilPressure) || 0);
                    setEngineHours(parseInt(searchEntry[0].engineHours) || 0);
                    setCoolantTemp(parseInt(searchEntry[0].coolantTemp) || 0);
                    setHeadPosition(parseInt(searchEntry[0].headPosition) || 0);
                    setHoleDepth(parseInt(searchEntry[0].holeDepth) || 0);
                    setRotationRpm(parseInt(searchEntry[0].rotationRpm) || 0);
                    setPenetrationRate(parseInt(searchEntry[0].penetrationRate) || 0);
                    setDownholeAir(parseInt(searchEntry[0].DownholeAirPressure) || 0);
                    setMainPump(parseInt(searchEntry[0].mainPumpPressure) || 0);
                    setHoldback(parseInt(searchEntry[0].holdBackPressure) || 0);
                    setPulldown(parseInt(searchEntry[0].pulldownPressure) || 0);
                    setWaterPressure(parseInt(searchEntry[0].waterPressure) || 0);
                    setBitWeight(parseInt(searchEntry[0].bitWeight) || 0);
                    setDriller(driller[0].toUpperCase() || 0);
                    setYear(searchEntry[0].year || 0);
                    setMonth(searchEntry[0].month || 0);
                    setDay(searchEntry[0].date || 0);
                    setHour(searchEntry[0].hour || 0);
                    setMinute(searchEntry[0].minute || 0);
                    setSecond(searchEntry[0].second || 0);
                    setHour(searchEntry[0].hour || 0);
                    setMinute(searchEntry[0].minute || 0);
                    setSecond(searchEntry[0].second || 0);
                    setMastAngle(parseInt(searchEntry[0].mastAngle) || 0);
                    setDeckRoll(parseInt(searchEntry[0].deckRoll) || 0);
                    setDeckPitch(parseInt(searchEntry[0].deckPitch) || 0);
                    setOutsideTemp(searchEntry[0].outsideTemp || 0);

                    /// BOOLEANS
                    if (searchEntry[0].rodLoaderPosition === null) {
                        setRodloaderPosition("red");
                    } else {
                        setRodloaderPosition("green");
                    }

                    if (searchEntry[0].headRefPosition === true) {
                        setHeadRef("green");
                    } else {
                        setHeadRef("red");
                    }
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

            {(window.outerWidth > 1500) ?
                <React.Fragment>
                    <div id="gauge-demo">
                        {/* <img src={require("../../assets/DrillBackground-3.png")} className="gaugeImg" alt="Logo" title="Click to go to Homepage" /> */}
                        <div id="gauge-container">
                            <div className="left-section">
                                <EngineRpm
                                    value={engineRpm / 100}
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
                                <h4 className="GaugeTitle">Holdback Pressure</h4>
                            </div>
                            <div className="currentTime">
                                <p className="currentTime title">Last Recorded Time: <br></br><span className="timeFont">{ready ? `${month} ${day} ${year} @ ${hour}:${minute}:${second}` : "Select a Time to Start"}</span></p>
                            </div>
                    &nbsp;
                    <div className="center-section">
                                <CircularGauge value={(metric) ? downholeAir : (downholeAir * 14.5038)}>
                                    <CircularSize width={260} />
                                    <CircularScale
                                        startValue={0}
                                        endValue={(metric) ? 500 : 1200}
                                        tickInterval={(metric) ? 100 : 300}
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
                                    <span>{(metric) ? downholeAir : Math.floor(downholeAir * 14.5038)}</span>
                                    <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                                </div>
                                <h4 className="GaugeTitle">Air Pressure</h4>
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
                                <h4 className="GaugeTitle">Rotation Pressure</h4>
                                <FormGroup className="toggleScale">
                                    <FormControlLabel
                                        control={<ScaleSwitch checked={metric} onChange={toggleMetric} name="checkedA" />}
                                        label={(metric) ? 'Metric' : 'Imperial'}
                                        labelPlacement="bottom"
                                    />
                                </FormGroup>
                            </div>
                            <div className="rigSetup">
                                <p className="rigSetup title">Mast Angle | Deck Roll | Deck Pitch<br></br><span className={"rigAngles"}>{ready ? `${mastAngle / 10}° | ${Math.round((95 - (deckRoll / 100) * 2) * 10) / 10}° | ${Math.round((95 - (deckPitch / 100) * 2) * 10) / 10}°` : ""}</span></p>
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
                                <CoolantTemp
                                    value={(metric) ? coolantTemp : (coolantTemp * 9 / 5) + 32}
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
                    <div className="holesetup">
                        <div id="gauge-demo">
                            <div id="gauge-container">
                                <div className="left-section ">
                                    <div className="sideGauge placeholder">
                                        <p></p>
                                    </div>
                                    <div className="sideGauge">
                                        <p>Head Position</p>
                                        <h2>{headPosition} mm</h2>
                                    </div><hr></hr>
                                    <div className="sideGauge">
                                        <p>Hole Depth</p>
                                        <h2>{holeDepth} m</h2>
                                    </div><hr></hr>
                                    <div className="sideGauge">
                                        <p>Driller ID</p>
                                        <h2 className="drillerName"><p></p>{ready ? `  ${driller}` : ""}</h2>
                                    </div><hr></hr>
                                </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={(metric) ? bitWeight : (bitWeight * 2.20462)}>
                            <CircularSize width={260} />
                            <CircularScale
                                startValue={0}
                                endValue={(metric) ? 1000 : 3000}
                                tickInterval={250}
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
                            <p className="unit">{(metric) ? 'Kgs' : "Lbs"}</p>
                        </div>
                        <h4 className="GaugeTitle">Bit Weight</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                                    <CircularGauge value={(metric) ? pulldown : (pulldown * 14.5038)}>
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
                                        <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
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
                                        <p className="unit">Rpm</p>
                                    </div>
                                    <h4 className="GaugeTitle">Head RPM</h4>
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
                                        <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                                    </div>
                                    <h4 className="GaugeTitle">Water Pressure</h4>
                                </div>
                &nbsp;
                <div className="right-section">
                                    <div className="sideGauge placeholder">
                                        <p></p>
                                    </div>
                                    <div className="sideGauge">
                                        <p>RL Prox | Head Ref</p>
                                        <Bulb
                                            color={rodloaderPosition}
                                            size={10}
                                        />
                                        {" | "}
                                        <Bulb
                                            color={headRef}
                                            size={10}
                                        />
                                    </div><hr></hr>
                                    <div className="sideGauge">
                                        <p>Outside Temp</p>
                                        <h2>{outsideTemp}°C</h2>
                                    </div><hr></hr>
                                    <div className="sideGauge">
                                        <p>Engine Hours</p>
                                        <h2>{engineHours} Hrs</h2>
                                    </div><hr></hr>
                                </div>
                            </div>
                        </div>
                    </div>

                </React.Fragment>
                :
                // Mobile


                <React.Fragment>

                    <div className="mobileScale">
                        <FormGroup className="toggleScale mobileScale">
                            <FormControlLabel
                                control={<ScaleSwitch checked={metric} onChange={toggleMetric} name="checkedA" />}
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
                                    <span style={{ textAlign: "center" }}>{(metric) ? waterPressure : Math.floor(waterPressure * 14.5038)}</span>
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
                                    <p className="unitSmall">Rpm</p>
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

export default Rig08LiveDrilling;