// action types
export const FETCH_ITINERARIES_REQUEST = "FETCH_ITINERARIES_REQUEST";
export const FETCH_ITINERARIES_FAILURE = "FETCH_ITINERARIES_FAILURE";
export const FETCH_ITINERARIES_SUCCESS = "FETCH_ITINERARIES_SUCCESS";


// action creators
export function fetchItinerariesRequest() {
  return {
    type: FETCH_ITINERARIES_REQUEST
  }
}

export function fetchItinerariesFailure() {
  return {
    type: FETCH_ITINERARIES_FAILURE,
  }
}

export function fetchItinerariesSuccess(itineraries) {
  return {
    type: FETCH_ITINERARIES_SUCCESS,
    itineraries
  }
}

// thunk action creator
export function fetchItineraries(cityName) {
 
  return function(dispatch) {
    dispatch(fetchItinerariesRequest())

    return fetch("http://localhost:5000/cities/" + cityName + "/itineraries")
      .then(
        res => res.json(),
        // not using catch, see redux documentation (async actions)
        err => {
          dispatch(fetchItinerariesFailure())
          console.log("An error occurred.", err)
        }
      )
      .then(data =>
        dispatch(fetchItinerariesSuccess(data))
      )
  }
}
