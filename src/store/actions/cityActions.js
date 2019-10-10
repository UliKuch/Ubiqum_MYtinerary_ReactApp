// action types
export const FETCH_CITIES_REQUEST = "FETCH_CITIES_REQUEST";
export const FETCH_CITIES_FAILURE = "FETCH_CITIES_FAILURE";
export const FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS";
export const FILTER_CITIES = "FILTER_CITIES";


// action creators
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

export function filterCities(filteredCities) {
  return {
    type: FILTER_CITIES,
    filteredCities
  }
}

// thunk action creator
export function fetchCities() {
 
  return function(dispatch) {
    dispatch(fetchCitiesRequest())

    return fetch("http://localhost:5000/cities/all")
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
