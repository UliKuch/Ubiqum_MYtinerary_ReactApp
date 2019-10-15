import React from 'react';
import { Footer } from './Landing.js';
import Itineraries from '../component/Itineraries.js'
import Loader from '../component/Loader'

// redux
import { connect } from "react-redux";
import { findCity } from "../store/actions/cityActions";


class City extends React.Component {


  componentDidMount() {
    const cityInput = this.props.match.params.city;
    this.props.findCity(cityInput);
  }

  render() {
    const city = this.props.city;

    return (
      <div>
        {(this.props.isFetching || !city.name) ? <Loader /> :
          <div>
            <h2>{city.name}</h2>
            <p>Available MYtineraries:</p>
            <Itineraries
                cityName={city.name}
            />  
          </div>
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
    findCity: (city) => dispatch(findCity(city))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(City);