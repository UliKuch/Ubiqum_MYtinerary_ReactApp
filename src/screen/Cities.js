import React from 'react';
import {Navbar, Logo} from './Landing.js';

function CitiesFilter(props) {
  return (
    <div className="container">
      <input className="form-control" type="text" onChange={props.onChange}/>
    </div>
  )
}


class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      cities: [],
      filteredCities: [],
    }
  }

  fetchCities() {
    this.setState({isFetching: true});
    fetch("http://localhost:5000/cities/all")
      .then(res => res.json())
      .then(data => this.setState({
        cities: data,
        // if this function gets called more often than once, filteredCities has to be defined differently
        filteredCities: data,
        isFetching: false,
      }))
  }

  componentDidMount() {
    this.fetchCities();
  }

  handleCitiesFilterChange(inp) {
    const regex = new RegExp("^" + inp.target.value, "i");
    const filtCities = this.state.cities.filter(city => {
      return regex.test(city.name)
    })

    this.setState({
      filteredCities: filtCities,
    })

  }

  render () {
    const cityList = this.state.filteredCities.map(city => {
      return (
        <li key={city.name}>{city.name + ", " + city.country}</li>
      )
    })

    return (
      <div>
        <Navbar
        NavbarCitiesLink={true}
        />
        <Logo />
        <CitiesFilter 
          onChange={(inp) => this.handleCitiesFilterChange(inp)}
        />
        <div>
          {this.state.isFetching ? <p>Fetching data...</p> : <ul>{cityList}</ul>}
        </div>
      </div>
    )
  }
}

export default Cities;