import {
  FETCH_ITINERARIES_REQUEST,
  FETCH_ITINERARIES_FAILURE,
  FETCH_ITINERARIES_SUCCESS,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_FAILURE,
  FETCH_COMMENTS_SUCCESS,
  POST_COMMENT_REQUEST,
  POST_COMMENT_FAILURE,
  POST_COMMENT_SUCCESS,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_FAILURE,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  POST_ITINERARY_SUCCESS,
  POST_ITINERARY_REQUEST,
  POST_ITINERARY_FAILURE
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
    case EDIT_COMMENT_REQUEST:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          editingComment: true
        }
      }
    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          editingComment: false
        }
      }
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          editingComment: false
        }
      }
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          deletingComment: true
        }
      }
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          deletingComment: false
        }
      }
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        [action.itin]: {
          ...state[action.itin],
          deletingComment: false
        }
      }
    default:
      return state
  }
}

const postItineraryInitialState = {
  isPosting: false
}

// POST itinerary
function postItineraryReducer(state = postItineraryInitialState, action) {
  switch (action.type) {
    case POST_ITINERARY_REQUEST:
      return Object.assign({}, state, {
        isPosting: true
      })
    case POST_ITINERARY_FAILURE:
      return Object.assign({}, state, {
        isPosting: false
      })
    case POST_ITINERARY_SUCCESS:
      return Object.assign({}, state, {
        isPosting: false
      })  
    default:
      return state
  }

}

export {itineraryReducer, postItineraryReducer}