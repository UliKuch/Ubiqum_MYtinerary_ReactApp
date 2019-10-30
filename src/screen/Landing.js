import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Logo from '../component/Logo'

// Carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// redux
import { connect } from "react-redux";
import { fetchCities } from "../store/actions/cityActions";

// Material-UI
import { Container, Typography, Box, CardMedia, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    width: 200
  }
}));

// for carousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function LandingCarouselImage(props) {
  const classes = useStyles();

  return(
    <Box
      display="flex"
      justifyContent="center"
      component={Link}
      to={`/cities/${props.city.name}`}

    >
      <Card>
        <CardMedia
          image={props.city.img}
          className={classes.cityImage}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.city.name}
            </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}


function LandingCarousel(props) {
  const images = props.cities.map(city => {
    return (<LandingCarouselImage 
      city={city}
      key={city.name}
      /> )
  })

  return (
    <Carousel
      arrows
      swipeable
      draggable
      showDots={true}
      renderButtonGroupOutside={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay
      autoPlaySpeed={2000}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="carousel-container"
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {images}
    </Carousel>
  )
}


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
      <Box
          className={classes.arrowImageContainer}
        >
        <Box 
          component={Link}
          to="/cities"
        >
          <img
            className={classes.img}
            src="./images/circled-right-2.png"
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
        cities={props.citiesWithImages}
      />
    </Container>
  )
}


class Landing extends React.Component {
  componentDidMount() {
    this.props.fetchCities();

    //TODO: PROBLEM: logs you in if you access landing page with
    // url including token (e.g. if you load page from the urls saved in your browser)

    // if token in url (google login), save token in local storage
    if (this.props.match.params.token) {
      window.localStorage.setItem("userToken", this.props.match.params.token);
    };
  }

  render() {
    // max. 12 cities with images
    let imageCounter = 0;
    const citiesWithImages = this.props.cities.filter(city => {
      if (city.img) {
        imageCounter++;
      }
      return city.img && (imageCounter < 13)
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