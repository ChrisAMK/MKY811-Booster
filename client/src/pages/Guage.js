// eslint-disable-next-line
import React, { useState, PureComponent } from "react";

//import Switch from '@material-ui/core/Switch';
import CircularGauge, { Geometry, Scale as CircularScale, Size as CircularSize, ValueIndicator as CircularValueIndicator } from 'devextreme-react/circular-gauge';
import LinearGauge, { Label, MinorTick, Scale as LinearScale, Size as LinearSize, ValueIndicator as LinearValueIndicator } from 'devextreme-react/linear-gauge';
import Indicator from '../components/Indicator';

const color = '#f05b41';

function Guages() {

    return (
        <React.Fragment>
            <div id="gauge-demo">
                <div id="gauge-container">
                    <div className="left-section">
                        <Indicator
                            value={2 / 2}
                            inverted={false}
                            startAngle={180}
                            endAngle={90} color={color}
                        />
                        <Indicator
                            value={2 / 2}
                            inverted={true}
                            startAngle={-90}
                            endAngle={-180}
                            color={color}
                        />
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
                        <h4 className="GaugeTitle">Engine RPM</h4>
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
                        <h4 className="GaugeTitle">Pulldown Pressure</h4>
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
                        <h4 className="GaugeTitle">Head RPM</h4>
                    </div>
                    &nbsp;
                    <div className="right-section">
                        <Indicator
                            value={2 / 2}
                            inverted={true}
                            startAngle={90}
                            endAngle={0}
                            color={color}
                        />
                        <Indicator
                            value={2 / 2}
                            inverted={false}
                            startAngle={0}
                            endAngle={-90}
                            color={color}
                        />
                    </div>
                </div>
            </div>
            <div id="gauge-demo">
                <div id="gauge-container">
                    <div className="left-section">
                        <Indicator
                            value={2 / 2}
                            inverted={false}
                            startAngle={180}
                            endAngle={90} color={color}
                        />
                        <Indicator
                            value={2 / 2}
                            inverted={true}
                            startAngle={-90}
                            endAngle={-180}
                            color={color}
                        />
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

                        <LinearGauge value={50 - 2 * 0.24} id="fuel-gauge">
                            <LinearSize width={90} height={20} />
                            <LinearScale
                                startValue={0}
                                endValue={50}
                                tickInterval={25}
                                minorTickInterval={12.5}
                            >
                                <MinorTick visible={true} />
                                <Label visible={false} />
                            </LinearScale>
                            <LinearValueIndicator
                                size={8}
                                offset={7}
                                color={color}
                            />
                        </LinearGauge>
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

                        <LinearGauge value={50 - 2 * 0.24} id="fuel-gauge">
                            <LinearSize width={90} height={20} />
                            <LinearScale
                                startValue={0}
                                endValue={50}
                                tickInterval={25}
                                minorTickInterval={12.5}
                            >
                                <MinorTick visible={true} />
                                <Label visible={false} />
                            </LinearScale>
                            <LinearValueIndicator
                                size={8}
                                offset={7}
                                color={color}
                            />
                        </LinearGauge>
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

                        <LinearGauge value={50 - 2 * 0.24} id="fuel-gauge">
                            <LinearSize width={90} height={20} />
                            <LinearScale
                                startValue={0}
                                endValue={50}
                                tickInterval={25}
                                minorTickInterval={12.5}
                            >
                                <MinorTick visible={true} />
                                <Label visible={false} />
                            </LinearScale>
                            <LinearValueIndicator
                                size={8}
                                offset={7}
                                color={color}
                            />
                        </LinearGauge>
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

                        <LinearGauge value={50 - 2 * 0.24} id="fuel-gauge">
                            <LinearSize width={90} height={20} />
                            <LinearScale
                                startValue={0}
                                endValue={50}
                                tickInterval={25}
                                minorTickInterval={12.5}
                            >
                                <MinorTick visible={true} />
                                <Label visible={false} />
                            </LinearScale>
                            <LinearValueIndicator
                                size={8}
                                offset={7}
                                color={color}
                            />
                        </LinearGauge>
                    </div>
                &nbsp;
                    <div className="right-section">
                        <Indicator
                            value={2 / 2}
                            inverted={true}
                            startAngle={90}
                            endAngle={0}
                            color={color}
                        />
                        <Indicator
                            value={2 / 2}
                            inverted={false}
                            startAngle={0}
                            endAngle={-90}
                            color={color}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Guages;