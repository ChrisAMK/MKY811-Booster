import React, { useState, useEffect, useCallback } from 'react';
import Rig08Live from './Rig08Live';
import Rig08Alerts from './Rig08Alerts';
import Rig08Statistics from './Rig08Statistics';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Slider from '@material-ui/core/Slider';
import DateFnsUtils from '@date-io/date-fns';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line
import API from '../../utils/API';
import { set } from 'date-fns';

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

function Rig8() {
  // We use page state to determine which sub-component is to be rendered inside the manager page
  const classes = useStyles();
  const [bottom, setBottom] = useState(false);
  const [page, setPage] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  // eslint-disable-next-line
  const [sliderTime, setSliderTime] = useState(0);
  const [live, setLive] = useState(true);
  const [selectedDate, setSelectedDate] = useState(Date.now())

  const [playback, setPlayback] = useState(false);
  const [paused, setPaused] = useState(true);
  const [fastForward, setFF] = useState(false);
  const [rewind, setRewind] = useState(false);
  
  const time = {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    second: second
  };

  const toRender = () => {
    switch (page) {
      case "":
        return <Rig08Live live={live} time={time} />
      case "Alerts":
        return <Rig08Alerts live={live} />
      case "Statistics":
        return <Rig08Statistics live={live} />
      case "Live":
        return <Rig08Live live={live} />
      default:
        return <Rig08Live live={live} />
    }
  }

  const freezeControls = () => {
    setPaused(false);
    setPlayback(false);
    setRewind(false);
    setFF(false);
  }

  const handleDateChange = (date) => {
    setLive(false);
    freezeControls();
    setDay(date.getDate());
    setMonth(months[date.getMonth()]);
    setYear(date.getFullYear());
    setSelectedDate(date);
  };

  const handleChange = useCallback((event, newValue) => {
    setLive(false);
    freezeControls();
    if (event.type === "mouseup" || event.type === "mousemove" || event.type === "mousedown") {
      if (newValue) {
        setSliderTime(newValue);
        setHour(Math.round((newValue / 60) / 60));
        setMinute(Math.round(((newValue % 86400) % 3600) / 60));
        setSecond(((newValue % 86400) % 3600) % 60);
      }
    }
  });

  const toggleLive = () => {
    live ? setLive(false) : setLive(true);
    freezeControls()
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if ((event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
      return;
    }

    setBottom(open);
  };

  const handleRR = () => {
    freezeControls()
    setSecond(second - 1);
    setRewind(true);
  }

  const handlePlay = async () => {
    freezeControls()
    setMinute(minute + 1)
    const fullMinute = await API.getFullMinute('rig08', year, month, day, hour, minute);
    console.log(fullMinute);
    setPlayback(true);
  }

  const handlePause = () => {
    freezeControls()
    setPaused(true);
  }

  const handleFF = () => {
    freezeControls()
    if (second >= 59) {
      setSecond(0);
      setMinute(minute + 1);
    } else if (minute >= 59) {
      setMinute(0);
      setSecond(second + 1);
    }
    
    setFF(true);
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
                  <div className={classes.root} style={{ width: "100%" }}>
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
                </Grid>
                <Grid item xs={2}>
                  <div className={classes.btnGroup}>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                      <Button onClick={handleRR} className={rewind ? "active" : "disabled"}><FastRewindIcon /></Button>
                      {playback ?
                      <Button onClick={handlePause} className={paused ? "active" : "active"}><PauseIcon /></Button>
                      :
                      <Button onClick={handlePlay} className={playback ? "active" : "disabled"}><PlayArrowIcon /></Button>
                      }
                      <Button onClick={handleFF} className={fastForward ? "active" : "disabled"}><FastForwardIcon /></Button>
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
                <Grid item xs={2}></Grid>
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
    let unmounted = false;
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

    return () => {
      unmounted = true;
  }

  }, [handleChange])

  return (
    <React.Fragment>
      {(window.outerWidth > 900) ? <React.Fragment></React.Fragment> : <React.Fragment><br /><br /></React.Fragment>}
      <div className="navButton">
        <Button onClick={() => setPage("Live")}>Live</Button>
        <Button onClick={() => setPage("Statistics")}>Statistics</Button>
        <Button onClick={() => setPage("Alerts")}>Alerts</Button>
      </div>
      <h1 style={{ textAlign: "center" }}>RIG 08</h1>
      <div className="contdrols">
        {['bottom'].map((anchor) => (
          <React.Fragment key={anchor}>
            <div className="controls">
              <Button onClick={toggleDrawer(anchor, true)} className="timeControlButton">{"Select Time"}</Button>
              <Drawer anchor={anchor} open={bottom} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
              <Button onClick={toggleLive} className={(live) ? "blob" : ""}>Live</Button>
            </div>
          </React.Fragment>
        ))}
      </div>

      {toRender()}
    </React.Fragment>
  )
}

export default Rig8;