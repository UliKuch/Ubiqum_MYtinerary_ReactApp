import React from 'react';
import Loader from './Loader'

// redux
import { connect } from "react-redux";
import { fetchActivities } from "../store/actions/activityActions";

// Material-UI
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 220,
    margin: theme.spacing(1)
  },
  cardImage: {
    width: 200,
    height: 200
  }
}));


function Activity(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardImage}
        component="img"
        image={props.activity.img}
        title={"Image for " + props.activity.title + " activity"}
      />
      <CardContent>
        <Typography variant="h6">
          {props.activity.title}
        </Typography>
      </CardContent>
    </Card>
  )
}


function Activities(props) {
  // fetch activities
  // using .call() to avoid a linter error telling to add props to dependencies
    // or destruct props outside of hook. Apparently triggered by using
    // a function passed as props.
    // also see: https://github.com/facebook/react/issues/16265
  React.useEffect(() => { 
    props.fetchActivities.call(null, props.cityName, props.itineraryName, 
      window.localStorage.getItem("userToken"))
  }, [props.itineraryName, props.cityName, props.fetchActivities])

  const activities = !props.activities ? null : props.activities.map(activity => {
    return (
      <Activity 
      activity={activity}
      key={activity._id}
      />
    )
  })

  return (
    <Grid container direction="column">
      <Typography variant="h5" >
        Activities
      </Typography>
      <Grid item>
        {props.isFetching ? <Loader /> : 

          // TODO: display activities in Carousel

          <Grid container justify="space-around">
            {activities}
          </Grid>
        }
      </Grid>
    </Grid>
  )
}

function mapStateToProps(state, ownProps) {
  
  const {cityName} = ownProps;
  const {itineraryName} = ownProps;

  return {
    // ? : syntax to avoid error because of undefined values
      // since no proper initial state is defined in redux
    activities: state.activity[itineraryName] ?
        state.activity[itineraryName].activities : [],
    isFetching: state.activity[itineraryName] ?
        state.activity[itineraryName].isFetching : false,
    cityName,
    itineraryName
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchActivities: (cityName, itineraryName, token) =>
        dispatch(fetchActivities(cityName, itineraryName, token))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Activities);