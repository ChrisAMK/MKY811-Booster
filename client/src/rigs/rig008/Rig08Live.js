// eslint-disable-next-line
import React, { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line

import Rig08LiveCompressor from './Rig08LiveCompressor';
import Rig08LiveEngine from './Rig08LiveEngine';
import Rig08LiveDrilling from './Rig08LiveDrilling';

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

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

function Rig8Live() {
    // We use page state to determine which sub-component is to be rendered inside the manager page
    const classes = useStyles();
    const [bottom, setBottom] = useState(false);
    const [page, setPage] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    // eslint-disable-next-line
    const [sliderTime, setSliderTime] = useState(0);
    const [live, setLive] = useState(true);
    const [selectedDate, setSelectedDate] = useState(Date.now())
  
    const [playback, setPlayback] = useState(false);
    
    const time = {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second
    };
  

    const toRender = useCallback(() => {
        switch (page) {
            case "":
                return <Rig08LiveDrilling live={live} time={time}/>
            case "Compressor":
                return <Rig08LiveCompressor live={live} time={time}/>
            case "Engine":
                return <Rig08LiveEngine live={live} time={time}/>
            case "Drilling":
                return <Rig08LiveDrilling live={live} time={time}/>
            default:
                return <Rig08LiveDrilling live={live} time={time}/>
        }
    },[page, live, time])
    
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
      },[]);
    
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
    
      const handlePlay = async () => {
        setPlayback(true);
      }
    
      const handlePause = () => {
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
                      <div className={classes.root} style={{ width: "100%", color: "#cc0e0e"}}>
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
                          {playback ?
                          <Button onClick={handlePause} className={classes.buttonGroupsL}><PauseIcon /></Button>
                          :
                          <Button onClick={handlePlay} className={classes.buttonGroupsM}><PlayArrowIcon /></Button>
                          }
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
                          style={{color: "#cc0e0e"}}
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
        }
    
        document.addEventListener('mouseup', mouseOff, false);
        document.addEventListener('keydown', keyDown, false);
    
      }, [handleChange])




    return (
        <React.Fragment>
            {(window.outerWidth > 900) ? <React.Fragment></React.Fragment> : <React.Fragment><br /><br /></React.Fragment>}
            <br></br>
              {['bottom'].map((anchor) => (
              <React.Fragment key={anchor}>
                  <div className="controls">
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
            <div className="inPage">
              <ButtonGroup variant="contained" aria-label="contained primary button group">
                  <Button onClick={() => setPage("Drilling")} className={classes.buttonGroupsL} style={{width: "150px"}}>Drilling</Button>
                  <Button onClick={() => setPage("Engine")} className={classes.buttonGroupsM} style={{width: "150px"}}>Engine</Button>
                  <Button onClick={() => setPage("Compressor")} className={classes.buttonGroupsR} style={{width: "150px"}}>Compressor</Button>
              </ButtonGroup>
            </div>
            <div className="contentContainer">
                {toRender()}
            </div>
            
        </React.Fragment>
    )
}

export default Rig8Live;