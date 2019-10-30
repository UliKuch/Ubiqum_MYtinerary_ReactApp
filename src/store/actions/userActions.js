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

export function storeUserInfo(userInfo) {
  return {
    type: STORE_USER_INFO,
    userInfo: userInfo
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
      console.log(response);

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

      console.log(response.data.token);
      window.localStorage.setItem("userToken", response.data.token);

      return dispatch(loginUserSuccess())
      
    } catch (error) {
      console.log(error);
      return dispatch(loginUserFailure())
    }
  }
} 

// Logout user
export function logoutUser(email) {

  return async function(dispatch) {
    dispatch(logoutUserRequest())
    try {
      // // no server-side logout implemented yet
      // const response = await axios.post(
      //   "http://localhost:5000/user/logout/", email
      // );
      // console.log(response);

      window.localStorage.removeItem("token");
      console.log("Token successfully removed.")
      return dispatch(logoutUserSuccess())

    } catch (error) {
      console.log(error);
      return dispatch(logoutUserFailure())
    }
  }
} 
