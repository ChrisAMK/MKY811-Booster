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

const Rigs = {
  rig21: {

  }
}

// This function is rendered when the user enters an incorrect URL
function Landing() {
  const classes = useStyles();
  return (
    <div className="container">
      <div className="row">
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
                <Typography variant="body2" color="textSecondary" component="p">
                  Diamond<hr></hr>
                  Currently stationed in Newman
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions className={classes.root}>
            <Button size="small" color="primary" className={classes.root}>
              Live
            </Button>
            <Button size="small" color="primary" className={classes.root}>
              Statistics
            </Button>
            <Button size="small" color="primary" className={classes.root}>
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
                <Typography variant="body2" color="textSecondary" component="p">
                  RC<hr></hr>
                  Currently stationed in Karratha
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions className={classes.root}>
            <Link to="/Rig08" className={classes.root}>
              <Button size="small" color="primary">
                Live
              </Button>
            </Link>
            <Link to="/Rig08" className={classes.root}>
              <Button size="small" color="primary">
                Statistics
              </Button>
            </Link>
            <Link to="/Rig08" className={classes.root}>
              <Button size="small" color="primary">
                Alerts
              </Button>
            </Link>
          </CardActions>
        </Card>
        </div>
      </div>
    </div>
    
  )
}

export default Landing;