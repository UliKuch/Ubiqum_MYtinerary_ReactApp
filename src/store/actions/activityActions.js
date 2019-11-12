const axios = require('axios');

// ----- action types -----
export const FETCH_ACTIVITIES_REQUEST = "FETCH_ACTIVITIES_REQUEST";
export const FETCH_ACTIVITIES_FAILURE = "FETCH_ACTIVITIES_FAILURE";
export const FETCH_ACTIVITIES_SUCCESS = "FETCH_ACTIVITIES_SUCCESS";

export const POST_ACTIVITY_REQUEST = "POST_ACTIVITY_REQUEST";
export const POST_ACTIVITY_FAILURE = "POST_ACTIVITY_FAILURE";
export const POST_ACTIVITY_SUCCESS = "POST_ACTIVITY_SUCCESS";

// ----- action creators ------

// GET activities
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

// POST activity
export function postActivityRequest(itineraryName) {
  return {
    type: POST_ACTIVITY_REQUEST,
    itineraryName
  }
}
export function postActivityFailure(itineraryName) {
  return {
    type: POST_ACTIVITY_FAILURE,
    itineraryName
  }
}
export function postActivitySuccess(itineraryName) {
  return {
    type: POST_ACTIVITY_SUCCESS,
    itineraryName
  }
}


// ----- thunk action creators -----

// GET activities
export function fetchActivities(cityName, itineraryName, token) {
 
  return function(dispatch) {
    dispatch(fetchActivitiesRequest(itineraryName))

    return fetch(`http://localhost:5000/cities/${cityName}/itineraries/${itineraryName}`, {
          // put token in header if token exists
          headers:
            token
            ? { Authorization: "Bearer " + token }
            : {}
        })
      .then(
        res => res.json()
      )
      .then(data =>
        dispatch(fetchActivitiesSuccess(itineraryName, data))
      )
      // using catch in spite of what redux documentation on async actions says
        // because solution suggested there does not work
      .catch(err => {
        console.log("An error occurred.", err);
        return dispatch(fetchActivitiesFailure(itineraryName))
      })
  }
}

// POST activity
export function postActivity(cityName, itineraryName, activity, token) {
 
  return async function(dispatch) {
    dispatch(postActivityRequest(itineraryName))

    try {
      const response = await axios.post(
        `http://localhost:5000/cities/${cityName}/${itineraryName}/add-activity`,
        activity, {
          headers: {
            "Authorization": "Bearer " + token,
          }
        }
      )
      dispatch(fetchActivities(cityName, itineraryName, token))
      dispatch(postActivitySuccess(itineraryName));
      return response
    } catch (error) {
      console.log(error);
      return dispatch(postActivityFailure(itineraryName))
    }
  }
}