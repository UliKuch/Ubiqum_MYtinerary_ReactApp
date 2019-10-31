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

    return fetch("http://localhost:5000/cities/all", {
      // put token in header if token exists
      headers:
      token ?
      {
        Authorization: "Bearer " + token 
      }
      :
      {}
    })
      .then(
        res => res.json(),
        // not using catch, see redux documentation (async actions)
        err => {
          dispatch(fetchCitiesFailure())
          console.log("An error occurred.", err)
        }
      )
      .then(data =>
        dispatch(fetchCitiesSuccess(data))
      )
  }
}


// find city
export function findCity(city, token) {
 
  return function(dispatch) {
    dispatch(findCityRequest())

    return fetch(`http://localhost:5000/cities/${city}`, {
      // put token in header if token exists
      headers:
      token ?
      {
        Authorization: "Bearer " + token 
      }
      :
      {}
    })
      .then(
        res => res.json(),
        // not using catch, see redux documentation (async actions)
        err => {
          dispatch(findCityFailure())
          console.log("An error occurred. Maybe the requested city is not in our database.", err)
        }
      )
      .then(data =>
        dispatch(findCitySuccess(data))
      )
  }
}
