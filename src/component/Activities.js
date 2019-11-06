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
  CardContent,
  Tab,
  Tabs,
  Slide
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
  },
  tabs: {
    minHeight: 10,
    maxHeight: 10
  },
}));

function ActivityTab(props) {
  const activityNumber = props.index;
  return (
    <Tab
      onClick={event => props.handleClick(event, activityNumber)}
      {...a11yProps(props.index)}
    />
  )
}

function Activity(props) {
  const classes = useStyles();

  return (
    <Slide
      direction="left"
      // trigger animation if value defining which tab is to be displayed
          // is equal to index of this activity
      in={props.value === props.index}
      mountOnEnter unmountOnExit
      timeout={{
        enter: 500,
        exit: 500,
      }}
    >
      <Card
        className={classes.card}
        role="tabpanel"
        hidden={props.value !== props.index}
        id={`activity-tabpanel-${props.index}`}
        aria-labelledby={`activity-tab-${props.index}`}
      >
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
    </Slide>
  )
}

// supplementary function called by each tab
function a11yProps(index) {
  return {
    id: `activity-tab-${index}`,
    'aria-controls': `activity-tabpanel-${index}`,
  };
}

function Activities(props) {
  const classes = useStyles()

  // fetch activities
  // using .call() to avoid a linter error telling to add props to dependencies
    // or destruct props outside of hook. Apparently triggered by using
    // a function passed as props.
    // also see: https://github.com/facebook/react/issues/16265
  React.useEffect(() => { 
    props.fetchActivities.call(null, props.cityName, props.itineraryName, 
      window.localStorage.getItem("userToken"))
  }, [props.itineraryName, props.cityName, props.fetchActivities])

  // value defining which tab is to be displayed
  const [value, setValue] = React.useState(0);

  // store length of activities object in variable outside of use effect hook
      // to avoid errors because of undefined props.activities values
  let activitiesLength = !props.activities ? 0 : props.activities.length;

  // set a timer to change which tab is displayed
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (value < (activitiesLength - 1)) {
      setValue(value + 1)
      } else {
      setValue(0)
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [activitiesLength, value]);

  // handle click on tab for manual change of tabs
  const handleClick = (event, newValue) => {
    console.log("handleChange has been triggered");
    setValue(newValue);
  };

  const activityTabs = !props.activities ? null : props.activities.map((activity, index) => {
    return (
      <ActivityTab 
        activity={activity}
        key={activity._id}
        index={index}
        handleClick={(event, newValue) => handleClick(event, newValue)}
      />
    )
  })

  const activities = !props.activities ? null : props.activities.map((activity, index) => {
    return (
      <Activity 
        activity={activity}
        key={activity._id}
        index={index}
        value={value}
      />
    )
  })

  return (
    <Grid container direction="column">
      <Typography variant="h5" >
        Activities
      </Typography>
      <Grid item container justify="center">
        {props.isFetching ? <Loader /> : 
        <div>
          <Grid container justify="center">
            {activities}
          </Grid>
          <Tabs
            className={classes.tabs}
            value={value}
            aria-label="activities"
          >
            {activityTabs}
          </Tabs>
        </div>
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