import {
  FETCH_ACTIVITIES_REQUEST,
  FETCH_ACTIVITIES_FAILURE,
  FETCH_ACTIVITIES_SUCCESS,
  POST_ACTIVITY_REQUEST,
  POST_ACTIVITY_FAILURE,
  POST_ACTIVITY_SUCCESS
} from "../actions/activityActions"

export function activityReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES_REQUEST:
      return {
        ...state,
        [action.itineraryName]: {
          ...state[action.itineraryName],
          isFetching: true,
        }
      }
    case FETCH_ACTIVITIES_FAILURE:
      return {
        ...state,
        [action.itineraryName]: {
          ...state[action.itineraryName],
          isFetching: false,
        }
      }
    case FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        [action.itineraryName]: {
          ...state[action.itineraryName],
          isFetching: false,
          activities: action.activities
        }
      }
      case POST_ACTIVITY_REQUEST:
        return {
          ...state,
          [action.itineraryName]: {
            ...state[action.itineraryName],
            isPosting: true,
          }
        }
      case POST_ACTIVITY_FAILURE:
        return {
          ...state,
          [action.itineraryName]: {
            ...state[action.itineraryName],
            isPosting: false,
          }
        }
      case POST_ACTIVITY_SUCCESS:
        return {
          ...state,
          [action.itineraryName]: {
            ...state[action.itineraryName],
            isPosting: false,
          }
        }  
    default:
      return state
  }

}
