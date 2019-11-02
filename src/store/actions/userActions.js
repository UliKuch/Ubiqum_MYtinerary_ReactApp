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

export const STORE_USER_INFO = "STORE_USER_INFO";

export const GET_FAVITIN_REQUEST = "GET_FAVITIN_REQUEST";
export const GET_FAVITIN_FAILURE = "GET_FAVITIN_FAILURE";
export const GET_FAVITIN_SUCCESS = "GET_FAVITIN_SUCCESS";

export const POST_FAVITIN_REQUEST = "POST_FAVITIN_REQUEST";
export const POST_FAVITIN_FAILURE = "POST_FAVITIN_FAILURE";
export const POST_FAVITIN_SUCCESS = "POST_FAVITIN_SUCCESS";


// ----- action creators ------

// POST user
export function postUserRequest() {
  return {
    type: POST_USER_REQUEST,
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
export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
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
export function logoutUserRequest() {
  return {
    type: LOGOUT_USER_REQUEST,
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

// Store user info in store
export function storeUserInfo(userInfo) {
  return {
    type: STORE_USER_INFO,
    userInfo: userInfo
  }
}

// GET favorite itineraries
export function getFavitinRequest() {
  return {
    type: GET_FAVITIN_REQUEST,
  }
}
export function getFavitinFailure() {
  return {
    type: GET_FAVITIN_FAILURE,
  }
}
export function getFavitinSuccess(favItin) {
  return {
    type: GET_FAVITIN_SUCCESS,
    favItin
  }
}

// POST favorite itineraries
export function postFavitinRequest() {
  return {
    type: POST_FAVITIN_REQUEST,
  }
}
export function postFavitinFailure() {
  return {
    type: POST_FAVITIN_FAILURE,
  }
}
export function postFavitinSuccess() {
  return {
    type: POST_FAVITIN_SUCCESS,
  }
}

// ----- thunk action creators -----

// POST user
export function postUser(user) {

  return async function(dispatch) {
    dispatch(postUserRequest())
    try {
      const response = await axios.post(
        "http://localhost:5000/user/", user
      );

      // Logging new user in
      if (response) {
        const loginData = {
          email: user.email,
          password: user.password
        }
        await dispatch(loginUser(loginData));
      }

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
    dispatch(loginUserRequest())
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login/", user
      );

      window.localStorage.setItem("userToken", response.data.token);

      return dispatch(loginUserSuccess())
      
    } catch (error) {
      console.log(error);
      return dispatch(loginUserFailure())
    }
  }
} 

// Logout user
export function logoutUser(token) {

  return async function(dispatch) {
    dispatch(logoutUserRequest())
    try {
      await axios.post(
        "http://localhost:5000/user/logout/", null, {
          headers: { Authorization: "Bearer " + token }
        }
      );

      window.localStorage.removeItem("userToken");
      console.log("Token successfully removed.")
      return dispatch(logoutUserSuccess())

    } catch (error) {
      console.log(error);
      return dispatch(logoutUserFailure())
    }
  }
} 

// GET favorite itineraries
export function getFavitin(token) {

  return async function(dispatch) {
    dispatch(getFavitinRequest())
    try {
      const response = await axios.get(
        "http://localhost:5000/user/favoriteItineraries", {
          headers: {
            "Authorization": "Bearer " + token,
          }
        }
      );

      return dispatch(getFavitinSuccess(response.data))
    } catch (error) {
      console.log(error);
      return dispatch(getFavitinFailure())
    }
  }
} 

// POST favorite itineraries
export function postFavitin(itin, token) {

  return async function(dispatch) {
    dispatch(postFavitinRequest())
    try {
      const body = {itineraryTitle: itin};
      await axios.post(
        "http://localhost:5000/user/favoriteItineraries", body, {
          headers: { Authorization: "Bearer " + token }
        }
      );

      // GET favorite itineraries to update itineraries in store
      dispatch(getFavitin(token))

      return dispatch(postFavitinSuccess())
    } catch (error) {
      console.log(error);
      return dispatch(postFavitinFailure())
    }
  }
} 