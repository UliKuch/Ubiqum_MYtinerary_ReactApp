// action types
export const FETCH_ACTIVITIES_REQUEST = "FETCH_ACTIVITIES_REQUEST";
export const FETCH_ACTIVITIES_FAILURE = "FETCH_ACTIVITIES_FAILURE";
export const FETCH_ACTIVITIES_SUCCESS = "FETCH_ACTIVITIES_SUCCESS";

// action creators
export function fetchActivitiesRequest(itineraryName) {
  return {
    type: FETCH_ACTIVITIES_REQUEST,
    itineraryName
  }
}

export function fetchActivitiesFailure(itineraryName) {
  return {
    type: FETCH_ACTIVITIES_FAILURE,
    itineraryName
  }
}

export function fetchActivitiesSuccess(itineraryName, activities) {
  return {
    type: FETCH_ACTIVITIES_SUCCESS,
    itineraryName,
    activities
  }
}

// thunk action creator
export function fetchActivities(cityName, itineraryName) {
 
  return function(dispatch) {
    dispatch(fetchActivitiesRequest(itineraryName))

    return fetch("http://localhost:5000/cities/" + cityName + "/itineraries/" + itineraryName)
      .then(
        res => res.json(),
        // not using catch, see redux documentation (async actions)
        err => {
          dispatch(fetchActivitiesFailure(itineraryName))
          console.log("An error occurred.", err)
        }
      )
      .then(data =>
        dispatch(fetchActivitiesSuccess(itineraryName, data))
      )
  }
}
