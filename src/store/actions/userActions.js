const axios = require('axios');

// action types
export const POST_USER_REQUEST = "POST_USER_REQUEST";
export const POST_USER_FAILURE = "POST_USER_FAILURE";
export const POST_USER_SUCCESS = "POST_USER_SUCCESS";

// action creators
export function postUserRequest(user) {
  return {
    type: POST_USER_REQUEST,
    user
  }
}

export function postUserFailure() {
  return {
    type: POST_USER_FAILURE,
  }
}

export function postUserSuccess() {
  return {
    type: POST_USER_SUCCESS,
  }
}

// thunk action creator
export function postUser(user) {

  return async function(dispatch) {
    dispatch(postUserRequest(user))
    try {
      const response = await axios.post("http://localhost:5000/user/", user);
      console.log(response);
      return dispatch(postUserSuccess())
    } catch (error) {
      console.log(error);
      return dispatch(postUserFailure())
    }
  }
} 