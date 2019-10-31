import {
  POST_USER_REQUEST,
  POST_USER_FAILURE, 
  POST_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  STORE_USER_INFO,
  GET_FAVITIN_REQUEST,
  GET_FAVITIN_SUCCESS,
  GET_FAVITIN_FAILURE,
  POST_FAVITIN_REQUEST,
  POST_FAVITIN_FAILURE,
  POST_FAVITIN_SUCCESS
} from "../actions/userActions";

const postInitialState = {
  isPosting: false
}

// POST user
function postUserReducer(state = postInitialState, action) {
  switch (action.type) {
    case POST_USER_REQUEST:
      return Object.assign({}, state, {
        isPosting: true
      })
    case POST_USER_FAILURE:
      return Object.assign({}, state, {
        isPosting: false
      })
    case POST_USER_SUCCESS:
      return Object.assign({}, state, {
        isPosting: false
      })
    default:
      return state
  }
}

const userInitialState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isLoggedIn: false,
  userEmail: "",
  userImage: "",
  userId: "",
  favoriteItineraries: [],
  gettingFavoriteItineraries: false,
  postingFavoriteItinerary: false
}

// Login/Logout User
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case STORE_USER_INFO:
      return Object.assign({}, state, {
        userEmail: action.userInfo.userEmail,
        userImage: action.userInfo.userImage,
        userId: action.userInfo.userId,
        isLoggedIn: true
      })
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isLoggingIn: true
      })
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        isLoggingIn: false
      })
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoggingIn: false,
        isLoggedIn: true
      })
    case LOGOUT_USER_REQUEST:
      return Object.assign({}, state, {
        isLoggingOut: true
      })
    case LOGOUT_USER_FAILURE:
      return Object.assign({}, state, {
        isLoggingOut: false
      })
    case LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoggingOut: false,
        isLoggedIn: false,
        userEmail: "",
        userImage: "",
        userId: ""
      })
    case GET_FAVITIN_REQUEST:
      return Object.assign({}, state, {
        gettingFavoriteItineraries: true
      })
    case GET_FAVITIN_FAILURE:
      return Object.assign({}, state, {
        gettingFavoriteItineraries: false
      })
    case GET_FAVITIN_SUCCESS:
      return Object.assign({}, state, {
        gettingFavoriteItineraries: false,
        favoriteItineraries: action.favItin
      })
    case POST_FAVITIN_REQUEST:
      return Object.assign({}, state, {
        postingFavoriteItinerary: true
      })
    case POST_FAVITIN_FAILURE:
      return Object.assign({}, state, {
        postingFavoriteItinerary: false
      })
    case POST_FAVITIN_SUCCESS:
      return Object.assign({}, state, {
        postingFavoriteItinerary: false
      })
      default:
      return state
  }
}

export {userReducer, postUserReducer}