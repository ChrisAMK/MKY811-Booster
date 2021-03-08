import React, {useState} from 'react';
import Rig08Live from './Rig08Live';
import Rig08Alerts from './Rig08Alerts';
import Rig08Statistics from './Rig08Statistics';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Slider from '@material-ui/core/Slider';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
  }));

  function valuetext(value) {
    return `${value}°C`;
  }

const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function Rig21() {
        // We use page state to determine which sub-component is to be rendered inside the manager page
        const [page, setPage] = useState("");
        const [year, setYear] = useState(2021);
        const [month, setMonth] = useState(6);
        const [day, setDay] = useState(16);
        const [hour, setHour] = useState(12);
        const [minute, setMinute] = useState(30);
        const [second, setSecond] = useState(30);
        const [live, setLive] = useState(true);

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
                    return <Rig08Live live={live} time={time}/>
                case "Alerts":
                    return <Rig08Alerts live={live}/>
                case "Statistics":
                    return <Rig08Statistics live={live}/>
                case "Live":
                    return <Rig08Live live={live}/>
                default:
                    return <Rig08Live live={live}/>
            }
        }

        const handleChange = (event, newValue) => {
          setLive(false);
          switch (event.target.id) {
            case "":
              return;
            case "year":
              setYear(newValue);
              return;
            case "month":
              setMonth(newValue);
              return;
            case "day":
              setDay(newValue);
              return;
            case "hour":
              setHour(newValue);
              return;
            case "minute":
              setMinute(newValue);
              return;
            case "second":
              setSecond(newValue);
              return;
            default:
              console.log("Invalid Value")
          }
        }

        const toggleLive = () => {
          live ? setLive(false) : setLive(true);
        }

        const classes = useStyles();
        const [state, setState] = React.useState({
            top: false,
            left: false,
            bottom: false,
            right: false,
        });

        const toggleDrawer = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
              return;
            }
        
            setState({ ...state, [anchor]: open });
          };
        
          const list = (anchor) => (
            <div
              className={clsx(classes.list, {
                [classes.fullList]: anchor === 'bottom',
              })}
              role="presentation"
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <List>
                <ListItem>
                <div className={classes.root}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <div style={{textAlign: "center"}}>
                        <h4>{`${months[(month - 1)]} ${day} ${year}`}</h4>
                        <h6>{`${hour}:${minute}:${second}`}</h6>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                </ListItem>
                {['Year','Month', 'Day', 'Hour', 'Minute', 'Second'].map((text, index) => (
                  <ListItem key={text}>
                    <div className={classes.root}>
                      <Grid container spacing={3}>
                        <Grid item xs={11}>
                        <div className={classes.root} style={{width:"100%"}}>
                          <Slider
                            defaultValue={((text === "Year") ? 2020 : (text === "Month") ? 6 : (text === "Day") ? 16 : (text === "Hour") ? 12 : (text === "Minute") ? 30 : (text === 'Second') ? 30 : 30)}
                            onChange={handleChange}
                            getAriaValueText={valuetext}
                            value={(text === "Year") ? year : (text === "Month") ? month : (text === "Day") ? day : (text === "Hour") ? hour : (text === "Minute") ? minute : (text === 'Second') ? second : 30}
                            aria-label="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            id={(text === "Year") ? "year" : (text === "Month") ? "month" : (text === "Day") ? "day" : (text === "Hour") ? "hour" : (text === "Minute") ? "minute" : (text === 'Second') ? "second" : 'unknown'}
                            marks
                            min={((text === "Year") ? 2020 : (text === "Month") ? 1 : (text === "Day") ? 1 : (text === "Hour") ? 0 : (text === "Minute") ? 0 : (text === 'Second') ? 0 : 0)}
                            max={((text === "Year") ? 2030 : (text === "Month") ? 12 : (text === "Day") ? 31 : (text === "Hour") ? 24 : (text === "Minute") ? 60 : (text === 'Second') ? 60 : 60)}
                          />
                          </div>
                        </Grid>
                        <Grid item xs={1}>
                          <ListItemText primary={text} />
                        </Grid>
                      </Grid>
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
          );
    return(
        <React.Fragment>
            {(window.outerWidth > 900) ? <React.Fragment></React.Fragment>: <React.Fragment><br /><br /></React.Fragment>}
            <div className="navButton">
                <Button onClick={() => setPage("Live")}>Live</Button>
                <Button onClick={() => setPage("Statistics")}>Statistics</Button>
                <Button onClick={() => setPage("Alerts")}>Alerts</Button>
            </div>
            <h1 style={{textAlign: "center"}}>RIG 08</h1>
            <div className="contdrols">
              
              {['bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <div className="controls">
                        <Button onClick={toggleDrawer(anchor, true)} className="timeControlButton">{"Select Time"}</Button>
                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                        <Button onClick={toggleLive} className={(live) ? "blob" : ""}>Live</Button>
                    </div>
                    <div className="timeDisplay">
                      <Typography component={"h5"} variant={"h5"}>{`${month}/${day}/${year}  ${hour}:${minute}:${second}`}</Typography>
                    </div>
                </React.Fragment>
              ))}
            </div>
            
            {toRender()}
        </React.Fragment>
    )
}

export default Rig21;