import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    width: '100%',
  },

  buttonGroups: {
    background: 'rgb(60, 60, 60)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(30, 30, 30, .3)',
    width: "100%",
    flexGrow: 1,
    '&:hover': {
      color: "#cc0e0e",
      textDecoration: "none",
    },
  },

  title: {
    color: "black",
    '&:hover': {
      color: "black",
      textDecoration: "none",
    },
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  img: {
    height: 600,
  }
}));

// This function is rendered when the user enters an incorrect URL
function Landing() {
  const classes = useStyles();
  return (
    <div className="container">
      <div className="row spacer" style={{paddingTop: "100px"}}>
        <div className="col-6">
        <Card className={classes.root}>
          <Link to="/Rig21" className={classes.title}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="300"
                image={require('../assets/RIG-15.jpg')}
                title="Rig 21"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Rig 21
                </Typography>
                <hr></hr>
                <Typography variant="body2" color="textSecondary" component="p">
                  Diamond
                  </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Currently Drilling at RTX
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions className={classes.root}>
            <Button color="primary" className={classes.buttonGroups} href="/Rig21">
              Live
            </Button>
            <Button color="primary" className={classes.buttonGroups} href="/Rig21">
              Statistics
            </Button>
            <Button color="primary" className={classes.buttonGroups} href="/Rig21">
              Alerts
            </Button>
          </CardActions>
        </Card>
        </div>
        <div className="col-6">
        <Card className={classes.root}>
          <Link to="/Rig08" className={classes.title}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Rig 8"
                height="300"
                image={require('../assets/RIG-9.jpg')}
                title="Rig 8"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Rig 8
                </Typography>
                <hr></hr>
                <Typography variant="body2" color="textSecondary" component="p">
                  RC
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Currently Drilling at CloudBreak
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions className={classes.root}>
            <Button color="primary" className={classes.buttonGroups} href="/Rig08">
              Live
            </Button>
            <Button color="primary" className={classes.buttonGroups} href="/Rig08">
              Statistics
            </Button>
            <Button color="primary" className={classes.buttonGroups} href="/Rig08">
              Alerts
            </Button>
          </CardActions>
        </Card>
        </div>
      </div>
    </div>
    
  )
}

export default Landing;