import React, {useState} from 'react';
import Rig8Live from './Rig21Live';
import Rig8Alerts from './Rig21Alerts';
import Rig8Statistics from './Rig21Statistics';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({

    buttonGroups: {
      border: 0,
      color: '#cc0e0e',
      background: 'white',
      borderRadius: 3,
      "&:hover": {
        backgroundColor: "#d8545c",
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

function Rig21() {
        const classes = useStyles();
        // We use page state to determine which sub-component is to be rendered inside the manager page
        const [page, setPage] = useState("");

        // Manager function navigation function
        const handlePageChange = (navPage) => {
            setPage(navPage)
        }
    
        const toRender = () => {
            switch (page) {
                case "":
                    return <Rig8Live handlePageChange={handlePageChange}/>
                case "Alerts":
                    return <Rig8Alerts handlePageChange={handlePageChange}/>
                case "Statistics":
                    return <Rig8Statistics handlePageChange={handlePageChange}/>
                case "Live":
                    return <Rig8Live handlePageChange={handlePageChange}/>
                default:
                    return <Rig8Live handlePageChange={handlePageChange}/>
            }
        }  

    return(
        <React.Fragment>
            {(window.outerWidth > 900) ? <React.Fragment></React.Fragment>: <React.Fragment><br /><br /></React.Fragment>}
            <div className="navButton">
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={() => setPage("Live")} style={{width: "150px"}}  className={classes.buttonGroups}>Live</Button>
                    <Button onClick={() => setPage("Statistics")} style={{width: "150px"}}  className={classes.buttonGroups}>Statistics</Button>
                    <Button onClick={() => setPage("Alerts")} style={{width: "150px"}}  className={classes.buttonGroups}>Alerts</Button>
                </ ButtonGroup>
            </div>
            <h1 className={classes.rigTitle}>RIG 21</h1>
            {toRender()}
        </React.Fragment>
    )
}

export default Rig21;