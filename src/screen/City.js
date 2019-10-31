import React from 'react';
import Footer from '../component/Footer';
import Itineraries from '../component/Itineraries.js'
import Loader from '../component/Loader'
import Navbar from '../component/Navbar'

// redux
import { connect } from "react-redux";
import { findCity } from "../store/actions/cityActions";

// Material-UI
import { Typography, Box } from '@material-ui/core';
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
  }
}));

function CityBox(props) {
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
      <Typography>
        Available MYtineraries:
      </Typography>
      <Itineraries
          cityName={city.name}
      />  
    </div>

  )
}

class City extends React.Component {
  componentDidMount() {
    const cityInput = this.props.match.params.city;
    this.props.findCity(cityInput, window.localStorage.getItem("userToken"));
  }

  render() {
    const city = this.props.city;

    return (
      <div>
        <Navbar />
        {(this.props.isFetching || !city.name) ? <Loader /> 
        : <CityBox
            city={city}
          />
        }
        <a href=".">Choose another city</a>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    city: state.findCity.city,
    isFetching: state.findCity.isFetching
  }
};

const mapDispatchToProps = dispatch => {
  return {
    findCity: (city, token) => dispatch(findCity(city, token))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(City);