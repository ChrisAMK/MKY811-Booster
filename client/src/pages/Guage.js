// eslint-disable-next-line
import React, { useState, PureComponent, useEffect } from "react";
// eslint-disable-next-line
import API from "../utils/API";

//import Switch from '@material-ui/core/Switch';
import CircularGauge, { Geometry, Scale as CircularScale, Size as CircularSize, ValueIndicator as CircularValueIndicator } from 'devextreme-react/circular-gauge';
import Indicator from '../components/Indicator';

import Bulb from 'react-bulb';

const color = '#f05b41';

function Guages() {
    
    const [ engineRpm, setEngineRpm ] = useState(0);
    const [ oilPressure, setOilPressure ] = useState(0);
    const [ engineHours, setEngineHours ] = useState(0);
    const [ coolantTemp, setCoolantTemp ] = useState(0);
    const [ headPosition, setHeadPosition ] = useState(0);
    const [ holeDepth, setHoleDepth ] = useState(0);
    const [ rotationRpm, setRotationRpm ] = useState(0);
    const [ penetrationRate, setPenetrationRate ] = useState(0);
    const [ mastAngle, setMastAngle ] = useState(0);
    const [ deckRoll, setDeckRoll ] = useState(0);
    const [ deckPitch, setDeckPitch ] = useState(0);
    const [ headBackRack, setHeadBackRack ] = useState("");
    const [ footClamp, setFootClamp ] = useState("");
    const [ coolantLevel, setCoolantLevel ] = useState("");
    const [ rotationReversePressure, setRotationReversePressure ] = useState(0);
    const [ rotationForwardPressure, setRotationForwardPressure ] = useState(0);
    const [ holdback, setHoldback ] = useState(0);
    const [ pulldown, setPulldown ] = useState(0);
    const [ waterPressure, setWaterPressure ] = useState(0);
    const [ mainPump, setMainPump ] = useState(0);
    const [ winchDown, setWinchDown ] = useState(0);
    const [ winchUp, setWinchUp ] = useState(0);
    const [ bitWeight, setBitWeight ] = useState(0);
    const [ driller, setDriller ] = useState(0);

    
    useEffect(() => {

        const getData = async () => {
        
            const lastEntry = await API.getLastEntry();
            console.log(lastEntry)
            setEngineRpm(lastEntry[0].engineRPM);
            setOilPressure(lastEntry[0].oilPressure);
            setEngineHours(lastEntry[0].engineHours);
            setCoolantTemp(lastEntry[0].coolantTemp);
            setHeadPosition(lastEntry[0].headPosition);
            setHoleDepth(lastEntry[0].holeDepth);
            setRotationRpm(lastEntry[0].rotationRpm);
            setPenetrationRate(lastEntry[0].penetrationRate);
            setMastAngle(lastEntry[0].mastAngle);
            setDeckRoll(lastEntry[0].deckRoll);
            setDeckPitch(lastEntry[0].deckPitch);
            setRotationReversePressure(lastEntry[0].rotationReversePressure);
            setRotationForwardPressure(lastEntry[0].rotationForwardPressure);
            setHoldback(lastEntry[0].holdBackPressure);
            setPulldown(lastEntry[0].pulldownPressure);
            setWaterPressure(lastEntry[0].waterPressure);
            setWinchUp(lastEntry[0].winchUpPressure);
            setWinchDown(lastEntry[0].winchDownPressure);
            setBitWeight(lastEntry[0].bitWeight);
            setDriller(lastEntry[0].driller);
            
            //  

            /// BOOLEANS
            if (lastEntry[0].coolantLevelSensor === "1") {
                setCoolantLevel("green");
            } else {
                setCoolantLevel("green");
            }
    
            if (lastEntry[0].footClampPressureSwitch === "1") {
                setFootClamp("green");
            } else {
                setFootClamp("red");
            }
    
            if (lastEntry[0].headBackRack === "1") {
                setHeadBackRack("green");
            } else {
                setHeadBackRack("red");
            }
        }
        




        getData()

        
    }, [])


    return (
        <React.Fragment>
            <div id="gauge-demo">
                <img src={require("../assets/DrillBackground-3.png")} className="gaugeImg" alt="Logo" title="Click to go to Homepage" />
                <div id="gauge-container">
                
                    <div className="left-section">
                        <Indicator
                            value={parseInt(engineRpm)}
                            inverted={false}
                            startAngle={180}
                            endAngle={90} 
                            color={color}
                        />
                        <p>Engine RPM</p>
                        <Indicator
                            value={parseInt(oilPressure)}
                            inverted={true}
                            startAngle={-90}
                            endAngle={-180}
                            color={color}
                        />
                        <p>Oil Pressure</p>
                    </div>
                    &nbsp;
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
                                secondFraction={.24}
                                width={3.5}
                                color=""
                                secondColor={color}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{waterPressure}</span>
                        </div>
                        <h4 className="GaugeTitle">Water Pressure</h4>
                    </div>
                    &nbsp;
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
                                secondFraction={0.3}
                                color="none"
                                secondColor={color}
                                width={3.5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{rotationForwardPressure}</span>
                        </div>
                        <h4 className="GaugeTitle">Rotation Pressure</h4>
                    </div>
                    &nbsp;
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
                                secondFraction={0.3}
                                color="none"
                                secondColor={color}
                                width={3.5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{bitWeight}</span>
                        </div>
                        <h4 className="GaugeTitle">Bit Weight</h4>
                    </div>
                    &nbsp;
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
                                secondFraction={0.3}
                                color="none"
                                secondColor={color}
                                width={3.5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{penetrationRate}</span>
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
                        <Indicator
                            value={parseInt(coolantTemp)}
                            inverted={true}
                            startAngle={90}
                            endAngle={0}
                            color={color}
                        />
                        <p>Coolant Temp</p>
                        <Indicator
                            value={parseInt(mainPump)}
                            inverted={false}
                            startAngle={0}
                            endAngle={-90}
                            color={color}
                        />
                        <p>Main Pump</p>
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
                            <h5>{parseInt(headPosition)}</h5>
                        </div>
                        <div className="sideGauge">
                            <p>Hole Depth</p>
                            <h5>{holeDepth} m</h5>
                        </div><div className="sideGauge">
                            <p>Driller ID</p>
                            <h5>{driller}</h5>
                        </div>
                    </div>
                    &nbsp;
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
                                secondFraction={0.27}
                                color="none"
                                secondColor={color}
                                width={3.5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{parseInt(holdback)}</span>
                        </div>
                        <h4 className="GaugeTitle">Holdback Pressure</h4>
                    </div>
                    &nbsp;
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
                                secondFraction={0.24}
                                color="none"
                                secondColor={color}
                                width={3.5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{parseInt(pulldown)}</span>
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
                                secondFraction={0.37}
                                color="none"
                                secondColor={color}
                                width={3.5}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{parseInt(rotationRpm)}</span>
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
                            <h5>{engineHours} Hrs</h5>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Guages;