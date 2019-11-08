import React from 'react';
import Footer from '../component/Footer';
import Loader from '../component/Loader'
import Navbar from '../component/Navbar'

// redux
import { connect } from "react-redux";
import { findCity } from "../store/actions/cityActions";
import { postItinerary } from "../store/actions/itineraryActions";

// Material-UI
import {
  Box,
  Typography,
  TextField,
  Grid,
  Avatar,
  Button,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


// styles instead of makeStyles in order to use props (cityImage)
const styles = (cityImage) => ({
  cityImage: {
    backgroundImage: `url(${cityImage})`,
  }
});

const useStyles = makeStyles(theme => ({
  cityImage: {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cityName: {
    backgroundColor: theme.palette.background.paper,
    opacity: "0.6",
    width: "100%",
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  textFieldTitleText: {
    ...theme.typography.h5
  },
  textField: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    maxWidth: 300
  },
  priceMenu: {
    maxWidth: 300,
  },
  container: {
    width: "100%"
  },
  avatar: {
    height: 60,
    width: 60
  },
  marginRight: {
    marginRight: 8
  },
  itinGridContainer: {
    overflow: "hidden",
  },
  textUsernameWrap: {
    maxWidth: "100%"
  },
  textUsername: {
    display: "block"
  },
  form: {
    padding: 8
  },
  submitButton: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    maxWidth: 300
  },
}));


function ItineraryForm(props) {
  const classes = useStyles()

  const [values, setValues] = React.useState({
    // set initial values to avoid uncontrolled components
    title: "",
    duration: "",
    price: 1,
    hashtags: ""
  });
  
  const handleChangeTextField = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  // for price select element
  const prices = [
    {
      value: '1',
      label: '$',
    },
    {
      value: '2',
      label: '$$',
    },
    {
      value: '3',
      label: '$$$',
    },
  ]

  return (
    <form
      className={classes.form}
      onSubmit={event => props.handleSubmit(event, values)}
    >
      <Grid
        container
        className={classes.itinGridContainer}
        spacing={2}
      >

        <Grid
          item container
          id="userinfo"
          xs={3}
          alignItems="center"
          direction="column"
          className={classes.itinGridContainer}
        >

          <Avatar
            src={props.user.userImage}
            alt={"Profile picture of " + (props.user.username || props.user.userEmail)}
            imgProps={{ onError: (e) => { e.target.src = "/images/userIcon.png" } }}
            className={classes.avatar}
          />

          <Grid
            item
            className={classes.textUsernameWrap}
          >
            <Typography
            noWrap
            variant="caption" 
            className={classes.textUsername}
            >
              {props.user.username || props.user.userEmail}
            </Typography>
          </Grid>

        </Grid>

        <Grid
          item container
          id="itinDescription"
          xs={9}
          direction="column"
        >

          <Grid item container>
            <TextField
              required
              id="Title"
              label="Title"
              placeholder="Enter Title"
              value={values.title}
              onChange={handleChangeTextField("title")}
              className={classes.textField}
              InputProps={{
                classes: {
                  input: classes.textFieldTitleText,
                },
              }}
            />
          </Grid>

          <Grid container item>
            <TextField
              required
              id="Duration"
              label="Duration"
              helperText="Enter duration in hours"
              value={values.duration}
              onChange={handleChangeTextField("duration")}
              className={classes.textField}
              type="number"
              inputProps={{
                min: 1,
                max: 168
              }}
            />
          </Grid>

          <Grid container item>
            <TextField
              required
              id="Price"
              label="Price"
              helperText="Select a value"
              value={values.price}
              onChange={handleChangeTextField("price")}
              className={classes.textField}
              type="number"
              select
              SelectProps={{
                MenuProps: {
                  className: classes.priceMenu,
                },
              }}
            >
              {prices.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item container direction="column">
            <TextField
              required
              id="Hashtags"
              label="Hashtags"
              placeholder="Enter Hashtags"
              helperText="Enter hashtags separated by spaces, without the hashtag symbol (#)."
              value={values.hashtags}
              onChange={handleChangeTextField("hashtags")}
              className={classes.textField}
            />
          </Grid>

          <Grid
            container item
            id="addActivities"

              // TODO: Add activities

          >
          </Grid>
                    
          <Button
            variant="contained"
            color="secondary"
            className={classes.submitButton}
            type="submit"          
          >
            Submit
          </Button>


        </Grid>
      </Grid>
    </form>
  )
}

function CityLogo(props) {
  const city = props.city;

  const classes = useStyles();

  return (
    <div>
      <Box
        style={styles(city.img).cityImage}
        className={classes.cityImage}
      >
        <Typography
          variant="h3"
          component="h1"
          className={classes.cityName}
        >
          {city.name}
        </Typography>
      </Box>
    </div>
  )
}

function AddItinerary(props) {
  const cityNameFromUrl = props.match.params.city;
  const token = window.localStorage.getItem("userToken")

  // fetch city info
  React.useEffect(() => {  
    props.findCity.call(null, cityNameFromUrl, token)
  }, [cityNameFromUrl, props.findCity, token])
  
  const handleSubmit = async (event, itin) => {
    // prevents page reload
    event.preventDefault();

    // POST itinerary
    await props.postItinerary(itin, cityNameFromUrl, token);

    // route to city page
    props.history.push(`/cities/${cityNameFromUrl}`);
  }

  return (
    <div>
      <Navbar />
      {
        (props.isFetching || !props.city.name)
        ?
        <Loader /> 
        :
        <CityLogo
          city={props.city}
        />
      }
      <ItineraryForm
        user={props.user}
        handleSubmit={(event, itin) => handleSubmit(event, itin)}
      />
      <Footer />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    city: state.findCity.city,
    isFetching: state.findCity.isFetching,
    user: state.user,
    isPostingItinerary: state.postItinerary.isPosting
  }
};

const mapDispatchToProps = dispatch => {
  return {
    findCity: (city, token) => dispatch(findCity(city, token)),
    postItinerary: (itin, cityName, token) => dispatch(postItinerary(itin, cityName, token))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AddItinerary);