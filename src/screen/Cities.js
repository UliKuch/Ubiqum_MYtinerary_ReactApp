import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../component/Footer';
import Loader from '../component/Loader'
import Navbar from '../component/Navbar'

// redux
import { connect } from "react-redux";
import { fetchCities, filterCities } from "../store/actions/cityActions";

// Material-UI
import { Container, TextField, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function CitiesFilter(props) {
  return (
    <Container>
      <TextField 
      fullWidth
      margin="dense"
      variant="outlined"
      onChange={props.onChange}
      />
    </Container>
  )
}

// styles instead of makeStyles in order to use props (cityImage)
const styles = (cityImage) => ({
  listItem: {
    backgroundImage: `url(${cityImage})`
  }
});

const useStyles = makeStyles(theme => ({
  listItem: {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "black",
    textAlign: "center",
    marginTop: theme.spacing(1),
    height: 80,
    "&:hover": {
      textDecoration: "none",
      color: "black",
    },
  },
  listItemText: {
    backgroundColor: theme.palette.background.paper,
    opacity: "0.6",
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    overflow: "hidden"
  }
}));

function City(props) {
  const classes = useStyles();

  return(
    <ListItem
      component={Link}
      to={`/cities/${props.city.name}`}
      style={styles(props.city.img).listItem}
      className={classes.listItem}
    >
      <ListItemText
        primary={props.city.name}
        className={classes.listItemText}
        primaryTypographyProps={{
          variant: "h6"
        }}
      />
    </ListItem>
  )
}


class Cities extends React.Component {
  componentDidMount() {
    this.props.fetchCities(window.localStorage.getItem("userToken"));
  }

  handleCitiesFilterChange(inp) {
    const regex = new RegExp("^" + inp.target.value, "i");
    const filtCities = this.props.cities.filter(city => {
      return regex.test(city.name)
    })
    this.props.filterCities(filtCities);
  }

  render() {
    const cityList = this.props.filteredCities.map(city => {     
      return (
        <City
        key={city.name}
        city={city}
        />
      )
    })

    return (
      <div>
        <Navbar
          selectedMenuItem="Cities"
        />
        <CitiesFilter 
          onChange={(inp) => this.handleCitiesFilterChange(inp)}
        />
        <Container>
          {this.props.isFetching ? <Loader /> : <List>{cityList}</List>}
        </Container>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cities: state.city.cities,
    filteredCities: state.city.filteredCities,
    isFetching: state.city.isFetching
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCities: token => dispatch(fetchCities(token)),
    filterCities: (filteredCities) => dispatch(filterCities(filteredCities))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Cities);