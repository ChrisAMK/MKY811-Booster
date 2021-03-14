import React, { useState } from 'react';
import Rig08Live from './Rig08Live';
import Rig08Alerts from './Rig08Alerts';
import Rig08Statistics from './Rig08Statistics';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({


  buttonGroups: {
    border: 0,
    color: '#cc0e0e',
    background: 'white',
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#cc0e0e",
      color: "white"
    },
  },

  rigTitle: {
    textAlign: "center",
    position: "absolute",
    marginTop:"-45px",
    right: "10px",
    paddingTop: "2.5px",
    paddingBottom: "2.5px",
    color: "white",
    textShadow: "2px 2px red",
}

}));

function Rig8() {
  const classes = useStyles();
  // We use page state to determine which sub-component is to be rendered inside the manager page
  const [page, setPage] = useState("");

  const toRender = () => {
    switch (page) {
      case "":
        return <Rig08Live/>
      case "Alerts":
        return <Rig08Alerts/>
      case "Statistics":
        return <Rig08Statistics/>
      case "Live":
        return <Rig08Live/>
      default:
        return <Rig08Live/>
    }
  }

  return (
    <React.Fragment>
      {(window.outerWidth > 900) ? <React.Fragment></React.Fragment> : <React.Fragment><br /><br /></React.Fragment>}
      <div className="navButton">
      <ButtonGroup variant="text" color="primary" aria-label="contained primary button group">
        <Button onClick={() => setPage("Live")} style={{width: "150px"}} className={classes.buttonGroups}>Live</Button>
        <Button onClick={() => setPage("Statistics")} style={{width: "150px"}} className={classes.buttonGroups}>Statistics</Button>
        <Button onClick={() => setPage("Alerts")} style={{width: "150px"}} className={classes.buttonGroups}>Alerts</Button>
      </ ButtonGroup>
      </div>
      <h1 className={classes.rigTitle}>RIG 08</h1>

      {toRender()}
    </React.Fragment>
  )
}

export default Rig8;