// eslint-disable-next-line
import React, { useState, PureComponent, useEffect, Component, useCallback } from "react";
// eslint-disable-next-line
import API from "../../utils/API";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Slider from '@material-ui/core/Slider';
import DateFnsUtils from '@date-io/date-fns';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//import Switch from '@material-ui/core/Switch';
import CircularGauge, { Geometry, Scale as CircularScale, Size as CircularSize, ValueIndicator as CircularValueIndicator } from 'devextreme-react/circular-gauge';
import Indicator from '../../components/Indicator';
import EngineRpm from '../../components/engineRpm';
import OilPressure from '../../components/OilPressure';
import CoolantTemp from '../../components/CoolantTemp';

import Bulb from 'react-bulb';

const color = '#cc0e0e';

const theme = createMuiTheme({
    overrides: {

        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: '#cc0e0e',
            },
        },
        MuiPickersDay: {
            day: {
                color: 'black',
            },
            daySelected: {
                backgroundColor: '#cc0e0e',
                "&:hover": {
                    backgroundColor: "#d8545c"
                },
            },
            current: {
                color: '#cc0e0e',
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color: '#cc0e0e',
            },
        },
    },
});


const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    buttonGroupsL: {
        background: '#cc0e0e',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        "&:hover": {
            backgroundColor: "rgb(60, 60, 60)",
            color: "white",
        },
    },
    buttonGroupsM: {
        background: '#cc0e0e',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        "&:hover": {
            backgroundColor: "rgb(60, 60, 60)",
            color: "white",
        },
    },
    buttonGroupsR: {
        background: '#cc0e0e',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        "&:hover": {
            backgroundColor: "rgb(60, 60, 60)",
            color: "white",
        },
    },

    buttonGroupsT: {
        background: '#cc0e0e',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        "&:hover": {
            backgroundColor: "#cc0e0e"
        },
    },

    buttonGroupsLive: {
        background: '#cc0e0e',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },

    buttonGroupsOff: {
        background: '#cc0e0e',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        "&:hover": {
            backgroundColor: "#cc0e0e"
        },
    },

    btnGroup: {
        display: 'flex',
        marginTop: '20px',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function valuetext(value) {
    return `${value}°C`;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function Rig21Live() {

    const classes = useStyles();
    const [engineRpm, setEngineRpm] = useState(0);
    const [oilPressure, setOilPressure] = useState(0);
    const [engineHours, setEngineHours] = useState(0);
    const [coolantTemp, setCoolantTemp] = useState(0);
    const [headPosition, setHeadPosition] = useState(0);
    const [holeDepth, setHoleDepth] = useState(0);
    const [rotationRpm, setRotationRpm] = useState(0);
    const [penetrationRate, setPenetrationRate] = useState(0);
    const [headBackRack, setHeadBackRack] = useState("");
    const [footClamp, setFootClamp] = useState("");
    const [coolantLevel, setCoolantLevel] = useState("");
    const [holdback, setHoldback] = useState(0);
    const [pulldown, setPulldown] = useState(0);
    const [waterPressure, setWaterPressure] = useState(0);
    const [mainPump, setMainPump] = useState(0);
    const [bitWeight, setBitWeight] = useState(0);
    const [driller, setDriller] = useState(0);
    const [metric, setMetric] = useState(true);
    const [bottom, setBottom] = useState(false);
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState("");
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [yearD, setYearD] = useState(0);
    const [monthD, setMonthD] = useState("");
    const [dayD, setDayD] = useState(0);
    const [hourD, setHourD] = useState(0);
    const [minuteD, setMinuteD] = useState(0);
    const [secondD, setSecondD] = useState(0);
    const [mastAngle, setMastAngle] = useState(0);
    const [deckRoll, setDeckRoll] = useState(0);
    const [deckPitch, setDeckPitch] = useState(0);


    // eslint-disable-next-line
    const [sliderTime, setSliderTime] = useState(0);
    const [live, setLive] = useState(true);
    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [ready, setReady] = useState(false);

    const handleLiveChange = () => {
        if (metric) {
            setMetric(false);
        } else {
            setMetric(true);
        }
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

    const handleDateChange = (date) => {
        setLive(false);
        setDay(date.getDate());
        setMonth(months[date.getMonth()]);
        setYear(date.getFullYear());
        setSelectedDate(date);
    };

    const handleChange = useCallback((event, newValue) => {
        setLive(false);
        if (event.type === "mouseup" || event.type === "mousemove" || event.type === "mousedown") {
            if (newValue) {
                setSliderTime(newValue);
                setHour(Math.floor((newValue / 60) / 60));
                setMinute(Math.floor(((newValue % 86400) % 3600) / 60));
                setSecond(((newValue % 86400) % 3600) % 60);
            }
        }
    }, []);

    const toggleLive = () => {
        live ? setLive(false) : setLive(true);
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if ((event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
            return;
        }

        setBottom(open);
    };

    const handleRR = () => {
        setSecond(second - 1);
        if (second < 1) {
            setSecond(59);
            if (minute < 1) {
                setHour(hour - 1);
                setMinute(59);
                setSecond(59);
            } else {
                setMinute(minute - 1);
            }
        }
    }

    const handleFF = () => {
        setSecond(second + 1);
        if (second > 58) {
            setSecond(0);
            if (minute > 58) {
                setHour(hour + 1);
                setMinute(0);
                setSecond(0);
            } else {
                setMinute(minute + 1);
            }
        }
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'bottom',
            })}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Year'].map((text, index) => (
                    <ListItem key={text}>
                        <div className={classes.root}>
                            <Grid container spacing={3}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={3}>
                                    <ThemeProvider theme={theme}>
                                        <div className={classes.root} style={{ width: "100%", color: "#cc0e0e" }}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justify="space-around">
                                                    <KeyboardDatePicker
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="Date picker dialog"
                                                        format="dd/MM/yyyy"
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </ThemeProvider>
                                </Grid>
                                <Grid item xs={2}>

                                    <div className={classes.btnGroup}>
                                        <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                                            <Button onClick={handleRR} className={classes.buttonGroupsL}><FastRewindIcon /></Button>
                                            {/* {playback ?
                                                <Button onClick={handlePause} className={classes.buttonGroupsL}><PauseIcon /></Button>
                                                :
                                                <Button onClick={handlePlay} className={classes.buttonGroupsM}><PlayArrowIcon /></Button>
                                            } */}
                                            <Button onClick={handleFF} className={classes.buttonGroupsR}><FastForwardIcon /></Button>
                                        </ButtonGroup>
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    {(year === "" || hour === "") ?
                                        <div style={{ width: "100%", textAlign: "center", marginTop: "25px" }}>
                                            <Typography component={"h5"} variant={"h5"} id="here">No Date Selected</Typography>
                                        </div>
                                        :
                                        <div style={{ width: "100%", textAlign: "center", marginTop: "25px" }}>
                                            <Typography component={"h5"} variant={"h5"}>{`${day} ${month} ${year}  ${hour}:${minute}:${second}`}</Typography>
                                        </div>
                                    }

                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.root} style={{ width: "100%" }}>
                                        <Slider
                                            defaultValue={30}
                                            onChange={handleChange}
                                            getAriaValueText={valuetext}
                                            value={sliderTime}
                                            aria-label="continuous-slider"
                                            valueLabelDisplay="off"
                                            id={"sliderTime"}
                                            min={0}
                                            max={86400}
                                            color="secondary"
                                            style={{ color: "#cc0e0e" }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </ListItem>
                ))}
            </List>
        </div>
    );


    useEffect(() => {

        const getData = async () => {
            if (live === true) {
                try {
                    const lastEntry = await API.getLastEntry("rig021");
                    console.log(lastEntry);
                    const driller = lastEntry[0].driller.split("\x00");
                    setEngineRpm(parseInt(lastEntry[0].engineRPM) || 0);
                    setOilPressure(parseInt(lastEntry[0].oilPressure) || 0);
                    setEngineHours(parseInt(lastEntry[0].engineHours) || 0);
                    setCoolantTemp(parseInt(lastEntry[0].coolantTemp) || 0);
                    setHeadPosition(parseInt(lastEntry[0].headPosition) || 0);
                    setHoleDepth(parseInt(lastEntry[0].holeDepth) || 0);
                    setRotationRpm(parseInt(lastEntry[0].rotationRpm) || 0);
                    setPenetrationRate(parseInt(lastEntry[0].penetrationRate) || 0);
                    setMainPump(parseInt(lastEntry[0].mainPumpPressure) || 0);
                    setHoldback(parseInt(lastEntry[0].holdBackPressure) || 0);
                    setPulldown(parseInt(lastEntry[0].pulldownPressure) || 0);
                    setWaterPressure(parseInt(lastEntry[0].waterPressure) || 0);
                    setBitWeight(parseInt(lastEntry[0].bitWeight) || 0);
                    setDriller(driller[0].toUpperCase() || 0);
                    setYearD(lastEntry[0].year || 0);
                    setMonthD(lastEntry[0].month || 0);
                    setDayD(lastEntry[0].date || 0);
                    setHourD(lastEntry[0].hour || 0);
                    setMinuteD(lastEntry[0].minute || 0);
                    setSecondD(lastEntry[0].second || 0);
                    setMastAngle(lastEntry[0].mastAngle || 0)
                    setDeckRoll(lastEntry[0].deckRoll || 0);
                    setDeckPitch(lastEntry[0].deckPitch || 0);

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
                    setReady(true);
                } catch (error) {
                    console.log(error)
                }

            } else {
                try {
                    const searchEntry = await API.getExactTime("rig021", "drilling", year, month, day, hour, minute, second);
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
                    setMainPump(parseInt(searchEntry[0].mainPumpPressure) || 0);
                    setHoldback(parseInt(searchEntry[0].holdBackPressure) || 0);
                    setPulldown(parseInt(searchEntry[0].pulldownPressure) || 0);
                    setWaterPressure(parseInt(searchEntry[0].waterPressure) || 0);
                    setBitWeight(parseInt(searchEntry[0].bitWeight) || 0);
                    setDriller(driller[0].toUpperCase() || 0);
                    setYearD(searchEntry[0].year || 0);
                    setMonthD(searchEntry[0].month || 0);
                    setDayD(searchEntry[0].date || 0);
                    setHourD(searchEntry[0].hour || 0);
                    setMinuteD(searchEntry[0].minute || 0);
                    setSecondD(searchEntry[0].second || 0);
                    setMastAngle(searchEntry[0].mastAngle || 0)
                    setDeckRoll(searchEntry[0].deckRoll || 0);
                    setDeckPitch(searchEntry[0].deckPitch || 0);

                    /// BOOLEANS
                    if (searchEntry[0].coolantLevelSensor === false) {
                        setCoolantLevel("red");
                    } else {
                        setCoolantLevel("green");
                    }

                    if (searchEntry[0].footClampPressureSwitch === false) {
                        setFootClamp("red");
                    } else {
                        setFootClamp("green");
                    }

                    if (searchEntry[0].headBackRackProxyStatus === false) {
                        setHeadBackRack("red");
                    } else {
                        setHeadBackRack("green");
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        const keyDown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    console.log("Arrow Up");
                    break;
                case "ArrowRight":
                    console.log("Arrow Right");
                    break;
                case "ArrowLeft":
                    console.log("Arrow Left")
                    break;
                case "ArrowDown":
                    console.log("Arrow Down")
                    break;
                default:
                    return;
            }
            console.log("KEY")
        }
        const mouseOff = (event) => {
            if (event.target.className === "MuiSlider-thumb MuiSlider-thumbColorPrimary MuiSlider-active") {
                handleChange(event)
            }
            return;
        }

        document.addEventListener('mouseup', mouseOff, false);
        document.addEventListener('keydown', keyDown, false);

        let timer = setInterval(() => {
            getData()
        }, 1000);

        return () => {
            clearInterval(timer);
        }

    }, [handleChange, year, month, day, hour, minute, second, live]);

    return (
        <React.Fragment>

            {(window.outerWidth > 1500) ?
                <React.Fragment>
                    {['bottom'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <div className="controls21">
                                <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                                    <Button onClick={toggleDrawer(anchor, true)} className={classes.buttonGroupsT}>{"Select Time"}</Button>
                                    <Drawer anchor={anchor} open={bottom} onClose={toggleDrawer(anchor, false)}>
                                        {list(anchor)}
                                    </Drawer>

                                </ButtonGroup>
                                <ButtonGroup variant="contained" aria-label="contained primary button group">
                                    <Button onClick={toggleLive} className={(live) ? "buttonGroupsLive" : classes.buttonGroupsOff}>Live</Button>
                                </ButtonGroup>

                            </div>
                        </React.Fragment>
                    ))}
                    <div style={{ marginTop: "-10px" }}>
                        <div id="gauge-demo">
                            <img src={require("../../assets/DrillBackground-3.png")} className="gaugeImg" alt="Logo" title="Click to go to Homepage" />
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
                                        <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
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
                                        <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
                                    </div>
                                    <h4 className="GaugeTitle">Rotation Pressure</h4>
                                </div>
                                <div className="currentTime">
                                    {/* <p className="currentTime title21">Last Recorded Time: <br></br><span className="timeFont">{ready ? `${monthD} ${dayD} ${yearD} @ ${hourD}:${minuteD}:${secondD}` : "Select a Time to Start"}</span></p> */}
                                    <p className="currentTime title21">No data has been Captured, Fake data above <br></br><span className="timeFont">{ready ? `Waiting on Rig Setup` : "Select a Time to Start"}</span></p>
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
                                        <p className="unit">{(metric) ? 'Kgs' : "Lbs"}</p>
                                    </div>
                                    <h4 className="GaugeTitle">Bit Weight</h4>
                                    <FormGroup className="toggleScale">
                                        <FormControlLabel
                                            control={<ScaleSwitch checked={metric} onChange={handleLiveChange} name="checkedA" />}
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
                                    <div className="coolantLevel">
                                        <p className="coolantLevel">Coolant Level</p>
                                        <Bulb
                                            color={coolantLevel}
                                            size={10}
                                        />
                                    </div>
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
                                        <p className="unit">{(metric) ? 'Bar' : "Psi"}</p>
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
                    </div>
                </React.Fragment>
                :
                // Mobile


                <React.Fragment>

                    <div className="mobileScale">
                        <FormGroup className="toggleScale mobileScale">
                            <FormControlLabel
                                control={<ScaleSwitch checked={metric} onChange={handleLiveChange} name="checkedA" />}
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

export default Rig21Live;