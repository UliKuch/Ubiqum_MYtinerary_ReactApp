const axios = require('axios');

// ----- action types -----
export const FETCH_ITINERARIES_REQUEST = "FETCH_ITINERARIES_REQUEST";
export const FETCH_ITINERARIES_FAILURE = "FETCH_ITINERARIES_FAILURE";
export const FETCH_ITINERARIES_SUCCESS = "FETCH_ITINERARIES_SUCCESS";

export const FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST";
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";

export const POST_COMMENT_REQUEST = "POST_COMMENT_REQUEST";
export const POST_COMMENT_FAILURE = "POST_COMMENT_FAILURE";
export const POST_COMMENT_SUCCESS = "POST_COMMENT_SUCCESS";

export const EDIT_COMMENT_REQUEST = "EDIT_COMMENT_REQUEST";
export const EDIT_COMMENT_FAILURE = "EDIT_COMMENT_FAILURE";
export const EDIT_COMMENT_SUCCESS = "EDIT_COMMENT_SUCCESS";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";

export const POST_ITINERARY_REQUEST = "POST_ITINERARY_REQUEST";
export const POST_ITINERARY_FAILURE = "POST_ITINERARY_FAILURE";
export const POST_ITINERARY_SUCCESS = "POST_ITINERARY_SUCCESS";

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

// edit comment
export function editCommentRequest(itin) {
  return {
    type: EDIT_COMMENT_REQUEST,
    itin
  }
}
export function editCommentFailure(itin) {
  return {
    type: EDIT_COMMENT_FAILURE,
    itin
  }
}
export function editCommentSuccess(itin) {
  return {
    type: EDIT_COMMENT_SUCCESS,
    itin
  }
}

// DELETE comment
export function deleteCommentRequest(itin) {
  return {
    type: DELETE_COMMENT_REQUEST,
    itin
  }
}
export function deleteCommentFailure(itin) {
  return {
    type: DELETE_COMMENT_FAILURE,
    itin
  }
}
export function deleteCommentSuccess(itin) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    itin
  }
}

// POST itinerary
export function postItineraryRequest() {
  return {
    type: POST_ITINERARY_REQUEST
  }
}
export function postItineraryFailure() {
  return {
    type: POST_ITINERARY_FAILURE
  }
}
export function postItinerarySuccess() {
  return {
    type: POST_ITINERARY_SUCCESS
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
        res => res.json()
      )
      .then(data =>
        dispatch(fetchItinerariesSuccess(data))
      )
      // using catch in spite of what redux documentation on async actions says
        // because solution suggested there does not work    
      .catch(err => {
        console.log("An error occurred.", err);
        return dispatch(fetchItinerariesFailure())
      })
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

// edit comment
export function editComment(commentBody, commentId, itin, cityName, token) {
 
  return async function(dispatch) {
    dispatch(editCommentRequest(itin))

    try {
      const body = {
        commentBody: commentBody,
        commentId: commentId
      }

      await axios.put(
        "http://localhost:5000/cities/" + cityName
        + "/itineraries/" + itin + "/comment",
        body,
        {headers: {
            "Authorization": "Bearer " + token,
        }}
      )
      return dispatch(editCommentSuccess(itin))
    } catch (error) {
      console.log(error);
      return dispatch(editCommentFailure(itin))
    }
  }
}

// DELETE comment
export function deleteComment(commentId, itin, cityName, token) {
 
  return async function(dispatch) {
    dispatch(deleteCommentRequest(itin))

    try {
      await axios.delete(
        "http://localhost:5000/cities/" + cityName
        + "/itineraries/" + itin + "/comment/" + commentId,
        {headers: {
            "Authorization": "Bearer " + token,
        }}
      )
      return dispatch(deleteCommentSuccess(itin))
    } catch (error) {
      console.log(error);
      return dispatch(deleteCommentFailure(itin))
    }
  }
}

// POST itinerary
export function postItinerary(itin, cityName, token) {
 
  return async function(dispatch) {
    dispatch(postItineraryRequest())

    try {
      const response = await axios.post(
        `http://localhost:5000/cities/${cityName}/add-itinerary`,
        itin,
        {headers: {
            "Authorization": "Bearer " + token,
        }}
      )
      dispatch(postItinerarySuccess())
      return response
    } catch (error) {
      console.log(error);
      return dispatch(postItineraryFailure())
    }
  }
}