import {
  POST_USER_REQUEST,
  POST_USER_FAILURE, 
  POST_USER_SUCCESS
} from "../actions/userActions";

const initialState = {
  isPosting: false
}

function userReducer(state = initialState, action) {
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

export default userReducer