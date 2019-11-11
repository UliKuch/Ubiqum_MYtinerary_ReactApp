import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Logo from '../component/Logo';
import Loader from '../component/Loader';

// redux
import { connect } from "react-redux";
import { fetchCities } from "../store/actions/cityActions";

// Material-UI
import {
  Container,
  Typography,
  Box,
  CardMedia,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Slide
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// decoding jwt
const jwtDecode = require('jwt-decode');

const useStyles = makeStyles(theme => ({
  img: {
    height: "100%"
  },
  arrowImageContainer: {
    height: 100,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  text: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  cityImage: {
    height: 200,
    width: 200,
    // if screen size is smaller than 600px (xs), change height & width
    [theme.breakpoints.down('xs')]: {
      height: 100,
      width: 100
    },
   },
  card: {
    height: 300,
    maxWidth: 200,
    margin: theme.spacing(1),
    // if screen size is smaller than 600px (xs), change height & width
    [theme.breakpoints.down('xs')]: {
      height: 150,
      maxWidth: 100,
      margin: theme.spacing(1),
    },
    "&:hover": {
      cursor: "pointer",
    }
  },
  cardText: {
    // if screen size is smaller than 600px (xs), change font size
    [theme.breakpoints.down('xs')]: {
      fontSize: 14
    }
  },
  cardsGridContainer: {
    height: 700,
    maxWidth: 500,
    // if screen size is smaller than 600px (xs), change height & width
    [theme.breakpoints.down('xs')]: {
      height: 400,
      maxWidth: 300
    },
  },
  tab: {
    minHeight: 10,
    maxHeight: 10,
    minWidth: 10
  },
  tabs: {
    minHeight: 10,
    maxHeight: 10,
    minWidth: 10
  }, 
  cardContent: {
    display: "flex",
    justifyContent: "center"
  }
}));


function CitiesTab(props) {
  const classes = useStyles();

  const citiesNumber = props.index;

  return (
    <Tab
      className={classes.tab}
      onClick={event => props.handleClick(event, citiesNumber)}
      {...a11yProps(props.index)}
    />
  )
}


// supplementary function called by each tab
function a11yProps(index) {
  return {
    id: `cities-tab-${index}`,
    'aria-controls': `cities-tabpanel-${index}`,
  };
}


function CitiesCards(props) {
  const classes = useStyles();

  let history = useHistory();

  const cards = props.cities.map(city => {
    return (
      <Card
        key={city.name}
        className={classes.card}
        onClick={() => history.push(`/cities/${city.name}`)}
      >
        <CardMedia
          image={city.img}
          className={classes.cityImage}
          component="img"
          title={"Image for " + city.name}
        />
        <CardContent
          className={classes.cardContent}
        >
            <Typography
              className={classes.cardText}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {city.name}
            </Typography>
        </CardContent>
      </Card>
    )
  })

  return(
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
      <Box
        role="tabpanel"
        hidden={props.value !== props.index}
        id={`cities-tabpanel-${props.index}`}
        aria-labelledby={`cities-tab-${props.index}`}
      >
        <Grid
          container
          justify="center"
          className={classes.cardsGridContainer}
        >
          {cards}
        </Grid>
      </Box>
    </Slide>
  )
}


function LandingCarousel(props) {
  const classes = useStyles();

  const citiesSubarrays = props.citiesSubarrays;

  // value defining which tab is to be displayed
  const [value, setValue] = React.useState(0);

  // store length of citiesSubarrays object in variable outside of use effect hook
  let citiesSubarraysLength = !props.citiesSubarrays ? 0 : citiesSubarrays.length;

  // set a timer to change which tab is displayed
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (value < (citiesSubarraysLength - 1)) {
      setValue(value + 1)
      } else {
      setValue(0)
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [citiesSubarraysLength, value]);  
  
  // handle click on tab for manual change of tabs
  const handleClick = (event, newValue) => {
    setValue(newValue);
  };

  const cards = !props.citiesSubarrays ? null : citiesSubarrays.map((cities, index) => {
    return (
      <CitiesCards
        cities={cities}
        key={cities[0].name}
        index={index}
        value={value}
      />
    )
  })

  const citiesTabs = !props.citiesSubarrays ? null : citiesSubarrays.map((cities, index) => {
    return (
      <CitiesTab 
        cities={cities}
        key={cities[0].name}
        index={index}
        handleClick={handleClick}
      />
    )
  })

  return (
    <Grid container justify="center">
      {props.isFetching ? <Loader /> :
        <div>
          <Grid container justify="center">
            {cards}
          </Grid>
          <Grid container justify="center">
            <Tabs
              className={classes.tabs}
              value={value}
              aria-label="cities"
            >
              {citiesTabs}
            </Tabs>
          </Grid>
        </div>
      }
    </Grid>
  )
}


function Landing(props) {
  const classes = useStyles();

  const token = window.localStorage.getItem("userToken");

  React.useEffect(() => {
    // if token in url (google login), save token in local storage
      // and reroute to landing page w/o token in url
    if (props.match.params.token) {
      // *1000 because token stores time in seconds, but js uses milliseconds
      const tokenCreated = jwtDecode(props.match.params.token).iat * 1000;

      // only add token if it is not older than 30 seconds
      if ((Date.now() - tokenCreated) < 30000) {
        window.localStorage.setItem("userToken", props.match.params.token);
        console.log("Token has been added to local storage");
        console.log("Time elapsed after token creation (in milliseconds): " + 
            (Date.now() - tokenCreated));
      } else {
        console.log("Token could not be saved. Please log in again.");
        console.log("Time elapsed after token creation (in milliseconds): " + 
            (Date.now() - tokenCreated));
      }

      props.history.push("/")
    };

    props.fetchCities.call(null, token);
  }, [props.match.params.token, props.history, token, props.fetchCities])

  // max. 12 cities with images
  let imageCounter = 0;
  const citiesWithImages = props.cities.filter(city => {
    if (city.img) {
      imageCounter++;
    }
    return city.img && (imageCounter < 13)
  })
  
  // split cities array in subarrays of 4 cities each
  let citiesSubarrays = [];
  while (citiesWithImages.length > 0) {
    citiesSubarrays.push(citiesWithImages.splice(0, 4))
  };

  return (
    <div>
      <Navbar
        selectedMenuItem="Home"
      />
      <Logo />
        <Container>
        <Typography
        align="center"
        className={classes.text}
        >
          Find your perfect trip, designed by insiders who know 
              and love their cities.
        </Typography>
        <Box
            className={classes.arrowImageContainer}
          >
          <Box 
            component={Link}
            to="/cities"
          >
            <img
              className={classes.img}
              src="/images/circled-right-2.png"
              alt="Clickable button displaying an arrow."
            />
          </Box>
        </Box>
        <Typography
        align="center"
        className={classes.text}
        >
          Popular MYtineraries:
        </Typography>
        <LandingCarousel
          citiesSubarrays={citiesSubarrays}
          isFetching={props.isFetching}
        />
      </Container>
      <Footer />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    cities: state.city.cities,
    isFetching: state.city.isFetching
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCities: token => dispatch(fetchCities(token)),
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Landing);