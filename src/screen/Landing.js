import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Logo from '../component/Logo'

// redux
import { connect } from "react-redux";
import { fetchCities } from "../store/actions/cityActions";

// Material-UI
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


function LandingImages() {
  const images = {
    first: [
      {
        city: "Barcelona",
        link: "./images/city-images/barcelona.jpg",
      },
      {
        city: "Berlin",
        link: "./images/city-images/berlin.jpg",
      },
      {
        city: "Budapest",
        link: "./images/city-images/budapest.jpg",
      },
      {
        city: "Paris",
        link: "./images/city-images/paris.jpg",
      }
    ],
    second: [
      {
        city: "Vienna",
        link: "./images/city-images/vienna.jpg",
      },
      {
        city: "London",
        link: "./images/city-images/london.jpg",
      },
      {
        city: "Sarajevo",
        link: "./images/city-images/sarajevo.jpg",
      },
      {
        city: "Rome",
        link: "./images/city-images/rome.jpg",
      }
    ]
  };
  
  return (
    <div className="carousel-inner">

      {/* First slide */}
      <div className="container carousel-item active">
        <div className="row justify-content-center">
          {images.first.map(image => {
            return (
              <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 d-flex align-items-stretch">
                <div className="card mb-4">
                  <img className="card-img-top" src={image.link} alt={"Image of " + image.city} />
                  <div className="card-img-overlay d-flex justify-content-center align-items-center">
                    <h4 className="card-title">{image.city}</h4>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>


      {/* Second slide */}
      <div className="carousel-item">
      <div className="row justify-content-center">
          {images.second.map(image => {
            return (
              <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 d-flex align-items-stretch">
                <div className="card mb-4">
                  <img className="card-img-top" src={image.link} alt={"Image of " + image.city} />
                  <div className="card-img-overlay d-flex justify-content-center align-items-center">
                    <h4 className="card-title">{image.city}</h4>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
    </div>

  )
}


function LandingImageBox() {
  return (
    <div className="container">

      {/* Carousel Wrapper */}
      <div id="multi-item-carousel" className="carousel slide carousel-multi-item" data-ride="carousel">

        <LandingImages />
        
        <a className="carousel-control-prev" href="#multi-item-carousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#multi-item-carousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>

      </div>

    </div>

  )
}


const useStyles = makeStyles(theme => ({
  img: {
    height: "100%"
  },
  imageContainer: {
    height: 100,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  text: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

  }
}));

function LandingMain(props) {
  const classes = useStyles();

  return (
    <Container>
      <Typography
      align="center"
      className={classes.text}
      >
        Find your perfect trip, designed by insiders who know 
            and love their cities.
      </Typography>
      <Container 
      component={Link}
      to="/cities"
      >
        <Container
          className={classes.imageContainer}
        >
          <img
            className={classes.img}
            src="./images/circled-right-2.png"
            alt="Clickable button displaying an arrow."
          />
        </Container>
      </Container>
      <Typography
      align="center"
      className={classes.text}
      >
        Popular MYtineraries:
      </Typography>
      <LandingImageBox />
    </Container>
  )
}


class Landing extends React.Component {
  componentDidMount() {
    this.props.fetchCities();
  }

  render() {
    const citiesWithImages = this.props.cities.filter(city =>{
      return city.img
    })

    return (
    <div>
      <Navbar
        selectedMenuItem="Home"
      />
      <Logo />
      <LandingMain
        citiesWithImages={citiesWithImages}
      />
      <Footer />
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cities: state.city.cities,
    isFetching: state.city.isFetching
  }
};


const mapDispatchToProps = dispatch => {
  return {
    fetchCities: () => dispatch(fetchCities()),
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Landing);