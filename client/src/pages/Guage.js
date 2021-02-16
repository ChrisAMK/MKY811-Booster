// eslint-disable-next-line
import React, { useState, PureComponent } from "react";

//import Switch from '@material-ui/core/Switch';
import CircularGauge, { Geometry, Scale as CircularScale, Size as CircularSize, ValueIndicator as CircularValueIndicator } from 'devextreme-react/circular-gauge';
import LinearGauge, { Label, MinorTick, Scale as LinearScale, Size as LinearSize, ValueIndicator as LinearValueIndicator } from 'devextreme-react/linear-gauge';
import Indicator from '../components/Indicator';

import Bulb from 'react-bulb';

const color = '#f05b41';

function Guages() {

    return (
        <React.Fragment>
            <div id="gauge-demo">
                <img src={require("../assets/DrillBackground-3.png")} className="gaugeImg" alt="Logo" title="Click to go to Homepage" />
                <div id="gauge-container">
                
                    <div className="left-section">
                        <Indicator
                            value={2 / 2}
                            inverted={false}
                            startAngle={180}
                            endAngle={90} color={color}
                        />
                        <p>Engine RPM</p>
                        <Indicator
                            value={2 / 2}
                            inverted={true}
                            startAngle={-90}
                            endAngle={-180}
                            color={color}
                        />
                        <p>Oil Pressure</p>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={2}>
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
                                secondFraction={0.24}
                                color="none"
                                secondColor={color}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{2}</span>
                        </div>
                        <h4 className="GaugeTitle">Water Pressure</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={2}>
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
                                secondFraction={0.24}
                                color="none"
                                secondColor={color}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{2}</span>
                        </div>
                        <h4 className="GaugeTitle">Rotation Pressure</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={2}>
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
                                secondFraction={0.24}
                                color="none"
                                secondColor={color}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{2}</span>
                        </div>
                        <h4 className="GaugeTitle">Bit Weight</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={2}>
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
                                secondFraction={0.24}
                                color="none"
                                secondColor={color}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{2}</span>
                        </div>
                        <h4 className="GaugeTitle">Penetration Rate</h4>
                    </div>
                    &nbsp;
                    <div className="right-section">
                        <div className="coolantLevel">
                        <p className="coolantLevel">Coolant Level</p>
                        <Bulb 
                                color={"red"}
                                size={10}
                            />
                        </div>
                        <Indicator
                            value={2 / 2}
                            inverted={true}
                            startAngle={90}
                            endAngle={0}
                            color={color}
                        />
                        <p>Coolant Temp</p>
                        <Indicator
                            value={2 / 2}
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
                            <h5>4m</h5>
                        </div>
                        <div className="sideGauge">
                            <p>Hole Depth</p>
                            <h5>247m</h5>
                        </div><div className="sideGauge">
                            <p>Driller ID</p>
                            <h5>Taffy</h5>
                        </div>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={2}>
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
                                secondFraction={0.24}
                                color="none"
                                secondColor={color}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{2}</span>
                        </div>
                        <h4 className="GaugeTitle">Holdback Pressure</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={2}>
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
                                secondFraction={0.24}
                                color="none"
                                secondColor={color}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{2}</span>
                        </div>
                        <h4 className="GaugeTitle">PullDown Pressure</h4>
                    </div>
                    &nbsp;
                    <div className="center-section">
                        <CircularGauge value={2}>
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
                                secondFraction={0.24}
                                color="none"
                                secondColor={color}
                            />
                        </CircularGauge>

                        <div className="speed-value">
                            <span>{2}</span>
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
                                color={"red"}
                                size={10}
                            />
                        </div>
                        <div className="sideGauge">
                            <p>Foot Clamp</p>
                            <Bulb 
                                color={"red"}
                                size={10}
                            />
                        </div><div className="sideGauge">
                            <p>Engine Hours</p>
                            <h5>1023 Hrs</h5>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Guages;