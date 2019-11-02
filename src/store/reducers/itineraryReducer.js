import {
  FETCH_ITINERARIES_REQUEST,
  FETCH_ITINERARIES_FAILURE,
  FETCH_ITINERARIES_SUCCESS,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_FAILURE,
  FETCH_COMMENTS_SUCCESS,
  POST_COMMENT_REQUEST,
  POST_COMMENT_FAILURE,
  POST_COMMENT_SUCCESS
} from "../actions/itineraryActions"

const initialState = {
  itineraries: [],
  isFetching: false
}

function itineraryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITINERARIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_ITINERARIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case FETCH_ITINERARIES_SUCCESS:
      return  Object.assign({}, state, {
        itineraries: action.itineraries,
        isFetching: false
      })
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          fetchingComments: true
        }
      }
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          fetchingComments: false
        }
      }
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          fetchingComments: false,
          comments: action.comments
        }
      }
    case POST_COMMENT_REQUEST:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          postingComment: true
        }
      }
    case POST_COMMENT_FAILURE:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          postingComment: false
        }
      }
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          postingComment: false
        }
      }
    default:
      return state
  }
}

export default itineraryReducer