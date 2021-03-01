import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});


// This function is rendered when the user enters an incorrect URL
function Landing() {
    const classes = useStyles();
    return(
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
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
      <CardActions>
        <Button size="small" color="primary">
          Live
        </Button>
        <Button size="small" color="primary">
          Statistics
        </Button>
        <Button size="small" color="primary">
          Alerts
        </Button>
      </CardActions>
    </Card>
    )
}

export default Landing;