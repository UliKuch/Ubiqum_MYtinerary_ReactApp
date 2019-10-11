import React from 'react';
import { Navbar, Footer } from './Landing.js';

// redux
import { connect } from "react-redux";
import { fetchCities, filterCities } from "../store/actions/cityActions";


function CitiesFilter(props) {
  return (
    <div className="container">
      <input className="form-control" type="text" onChange={props.onChange}/>
    </div>
  )
}


class Cities extends React.Component {
  componentDidMount() {
    this.props.fetchCities();
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
        <li key={city.name}> 
          <a href={"/cities/" + city.name}>
            {city.name + ", " + city.country}
          </a>
        </li>
      )
    })

    return (
      <div>
        <Navbar
          NavbarCitiesLink={true}
        />
        <CitiesFilter 
          onChange={(inp) => this.handleCitiesFilterChange(inp)}
        />
        <div>
          {this.props.isFetching ? <p>Fetching data...</p> : <ul>{cityList}</ul>}
        </div>
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
    fetchCities: () => dispatch(fetchCities()),
    filterCities: (filteredCities) => dispatch(filterCities(filteredCities))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Cities);