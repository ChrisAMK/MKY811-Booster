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


const color = '#f05b41';

function Rig21LiveCompressor(props) {

    const [dischargePressure, setDischargePressure] = useState(0);
    const [downholeAir, setDownholeAir] = useState(0);
    const [interstagePressure, setInterstagePressure] = useState(0);
    const [mastAngle, setMastAngle] = useState(0);
    const [deckRoll, setDeckRoll] = useState(0);
    const [deckPitch, setDeckPitch] = useState(0);
    const [metric, setMetric] = useState(0);


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

    const getData = async () => {

        try {
            const lastEntry = await API.getLastEntry();
            setDischargePressure(lastEntry[0].dischargePressure || 0);
            setDownholeAir(lastEntry[0].downholeAir || 0);
            setInterstagePressure(lastEntry[0].interstagePressure || 0);
            setMastAngle(lastEntry[0].mastAngle || 0);
            setDeckRoll(lastEntry[0].deckRoll || 0);
            setDeckPitch(lastEntry[0].deckPitch || 0);

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
                                <CircularGauge value={(metric) ? dischargePressure : (dischargePressure * 14.5038)}>
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
                                    <span>{(metric) ? dischargePressure : Math.floor(dischargePressure * 14.5038)}</span>
                                    <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                                </div>
                                <h4 className="GaugeTitle">Discharge Pressure</h4>
                            </div>
                             &nbsp;
                            <div className="center-section">
                                <CircularGauge value={(metric) ? downholeAir : (downholeAir * 14.5038)}>
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
                                    <span>{(metric) ? downholeAir : Math.floor(downholeAir * 14.5038)}</span>
                                    <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                                </div>
                                <h4 className="GaugeTitle">Downhole Pressure</h4>
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
                                <CircularGauge value={(metric) ? interstagePressure : (interstagePressure * 14.5038)}>
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
                                    <span>{(metric) ? interstagePressure : Math.floor(interstagePressure * 14.5038)}</span>
                                    <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                                </div>
                                <h4 className="GaugeTitle">Interstage Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo">
                        {/* <img src={require("../../assets/DrillBackground-3.png")} className="gaugeImg" alt="Logo" title="Click to go to Homepage" /> */}
                        <div id="gauge-container">
                            <br></br><br></br><br></br><br></br>
                            <h1>{mastAngle}</h1>
                            <h1>{deckPitch}</h1>
                            <h1>{deckRoll}</h1>
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
                                <CircularGauge value={(metric) ? interstagePressure : (interstagePressure * 14.5038)}>
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
                                    <span>{(metric) ? interstagePressure : Math.floor(interstagePressure * 14.5038)}</span>
                                    <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                                </div>
                                <h4 className="GaugeTitle">Interstage Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={(metric) ? interstagePressure : (interstagePressure * 14.5038)}>
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
                                    <span>{(metric) ? interstagePressure : Math.floor(interstagePressure * 14.5038)}</span>
                                    <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                                </div>
                                <h4 className="GaugeTitle">Interstage Pressure</h4>
                            </div>
                        </div>
                    </div>
                    <div id="gauge-demo-small">
                        <div className="gauge-container-small">
                            <img src={require("../../assets/340x340.png")} className="gaugeImgSmall" alt="Logo" title="Click to go to Homepage" />
                            <div className="center-section">
                                <CircularGauge value={(metric) ? interstagePressure : (interstagePressure * 14.5038)}>
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
                                    <span>{(metric) ? interstagePressure : Math.floor(interstagePressure * 14.5038)}</span>
                                    <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                                </div>
                                <h4 className="GaugeTitle">Interstage Pressure</h4>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }

        </React.Fragment>
    )
}

export default Rig21LiveCompressor;