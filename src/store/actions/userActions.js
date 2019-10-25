const axios = require('axios');

// ----- action types -----
export const POST_USER_REQUEST = "POST_USER_REQUEST";
export const POST_USER_FAILURE = "POST_USER_FAILURE";
export const POST_USER_SUCCESS = "POST_USER_SUCCESS";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";


// ----- action creators ------

// POST user
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

// Login user
export function loginUserRequest(user) {
  return {
    type: LOGIN_USER_REQUEST,
    user
  }
}
export function loginUserFailure() {
  return {
    type: LOGIN_USER_FAILURE,
  }
}
export function loginUserSuccess() {
  return {
    type: LOGIN_USER_SUCCESS,
  }
}

// Logout user
export function logoutUserRequest(user) {
  return {
    type: LOGOUT_USER_REQUEST,
    user
  }
}
export function logoutUserFailure() {
  return {
    type: LOGOUT_USER_FAILURE,
  }
}
export function logoutUserSuccess() {
  return {
    type: LOGOUT_USER_SUCCESS,
  }
}


// ----- thunk action creators -----

// POST user
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

// Login user
export function loginUser(user) {

  return async function(dispatch) {
    dispatch(loginUserRequest(user))
    try {
      const response = await axios.post("http://localhost:5000/user/login/", user);

      console.log(response.data.token);
      // do sth with response.data.token

      return dispatch(loginUserSuccess())
    } catch (error) {
      console.log(error);
      return dispatch(loginUserFailure())
    }
  }
} 

// Logout user
export function logoutUser(user) {

  return async function(dispatch) {
    dispatch(logoutUserRequest(user))
    try {
      const response = await axios.post("http://localhost:5000/user/logout/", user);
      console.log(response);
      return dispatch(logoutUserSuccess())
    } catch (error) {
      console.log(error);
      return dispatch(logoutUserFailure())
    }
  }
} 
