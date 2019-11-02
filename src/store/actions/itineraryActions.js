const axios = require('axios');

// ----- action types -----
export const FETCH_ITINERARIES_REQUEST = "FETCH_ITINERARIES_REQUEST";
export const FETCH_ITINERARIES_FAILURE = "FETCH_ITINERARIES_FAILURE";
export const FETCH_ITINERARIES_SUCCESS = "FETCH_ITINERARIES_SUCCESS";

export const FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST";
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";

export const POST_COMMENT_REQUEST = "POST_COMMENTS_REQUEST";
export const POST_COMMENT_FAILURE = "POST_COMMENTS_FAILURE";
export const POST_COMMENT_SUCCESS = "POST_COMMENTS_SUCCESS";


// ----- action creators ------

// fetch itineraries
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

// fetch comments
export function fetchCommentsRequest(itin) {
  return {
    type: FETCH_COMMENTS_REQUEST,
    itin
  }
}
export function fetchCommentsFailure(itin) {
  return {
    type: FETCH_COMMENTS_FAILURE,
    itin
  }
}
export function fetchCommentsSuccess(itin, comments) {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    itin,
    comments
  }
}

// POST comment
export function postCommentRequest(itin) {
  return {
    type: POST_COMMENT_REQUEST,
    itin
  }
}
export function postCommentFailure(itin) {
  return {
    type: POST_COMMENT_FAILURE,
    itin
  }
}
export function postCommentSuccess(itin) {
  return {
    type: POST_COMMENT_SUCCESS,
    itin
  }
}

// ----- thunk action creators -----

// fetch itineraries
export function fetchItineraries(cityName, token) {
 
  return function(dispatch) {
    dispatch(fetchItinerariesRequest())

    return fetch("http://localhost:5000/cities/" + cityName + "/itineraries", {
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
          dispatch(fetchItinerariesFailure())
          console.log("An error occurred.", err)
        }
      )
      .then(data =>
        dispatch(fetchItinerariesSuccess(data))
      )
  }
}

// fetch comments
export function fetchComments(itin, cityName, token) {
 
  return async function(dispatch) {
    dispatch(fetchCommentsRequest(itin))

    try {
      const response = await axios.get(
        "http://localhost:5000/cities/" + cityName
        + "/itineraries/" + itin + "/comments", {
        // put token in header if token exists
        headers:
          token ?
          { Authorization: "Bearer " + token }
          :
          {}
        }
      )
      return dispatch(fetchCommentsSuccess(itin, response.data))
    } catch (error) {
      console.log(error);
      return dispatch(fetchCommentsFailure(itin))
    }
  }
}

// POST comment
export function postComment(commentBody, itin, cityName, token) {
 
  return async function(dispatch) {
    dispatch(postCommentRequest(itin))

    try {
      const body = {commentBody: commentBody}

      await axios.post(
        "http://localhost:5000/cities/" + cityName
        + "/itineraries/" + itin + "/comment",
        body,
        {headers: {
            "Authorization": "Bearer " + token,
        }}
      )
      return dispatch(postCommentSuccess(itin))
    } catch (error) {
      console.log(error);
      return dispatch(postCommentFailure(itin))
    }
  }
}
