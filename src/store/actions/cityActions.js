// backend url
const url = require("../../config.js");

// ----- action types -----
export const FETCH_CITIES_REQUEST = "FETCH_CITIES_REQUEST";
export const FETCH_CITIES_FAILURE = "FETCH_CITIES_FAILURE";
export const FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS";
export const FILTER_CITIES = "FILTER_CITIES";
export const FIND_CITY_REQUEST = "FIND_CITY_REQUEST";
export const FIND_CITY_FAILURE = "FIND_CITY_FAILURE";
export const FIND_CITY_SUCCESS = "FIND_CITY_SUCCESS";


// ----- action creators ------

// fetch cities
export function fetchCitiesRequest() {
  return {
    type: FETCH_CITIES_REQUEST,
  }
}

export function fetchCitiesFailure() {
  return {
    type: FETCH_CITIES_FAILURE,
  }
}

export function fetchCitiesSuccess(cities) {
  return {
    type: FETCH_CITIES_SUCCESS,
    cities
  }
}


// filter cities
export function filterCities(filteredCities) {
  return {
    type: FILTER_CITIES,
    filteredCities
  }
}


// find city
export function findCityRequest() {
  return {
    type: FIND_CITY_REQUEST,
  }
}

export function findCityFailure() {
  return {
    type: FIND_CITY_FAILURE,
  }
}

export function findCitySuccess(city) {
  return {
    type: FIND_CITY_SUCCESS,
    city
  }
}

// ----- thunk action creators -----

// fetch cities
export function fetchCities(token) {
 
  return function(dispatch) {
    dispatch(fetchCitiesRequest())

    return fetch(`${url}/cities/all`, {
      // put token in header if token exists
      headers:
      token 
      ? { Authorization: `Bearer ${token}` }
      : {}
    })
      .then(
        res => res.json()
      )
      .then(data =>
        dispatch(fetchCitiesSuccess(data))
      )
      // using catch in spite of what redux documentation on async actions says
        // because solution suggested there does not work
      .catch(err => {
        console.log("An error occurred.", err);
        return dispatch(fetchCitiesFailure())
      })
  }
}


// find city
export function findCity(city, token) {
 
  return function(dispatch) {
    dispatch(findCityRequest())

    return fetch(`${url}/cities/${city}`, {
      // put token in header if token exists
      headers:
      token
      ? { Authorization: `Bearer ${token}` }
      : {}
    })
      .then(
        res => res.json()
      )
      .then(data =>
        dispatch(findCitySuccess(data))
      )
      // using catch in spite of what redux documentation on async actions says
        // because solution suggested there does not work
      .catch(err => {
        console.log("An error occurred. Maybe the requested city is not in our database.", err);
        return dispatch(findCityFailure());
      })
  }
}
