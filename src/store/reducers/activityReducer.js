import {
  FETCH_ACTIVITIES_REQUEST,
  FETCH_ACTIVITIES_FAILURE,
  FETCH_ACTIVITIES_SUCCESS
} from "../actions/activityActions"

// const initialState = {
//   activities: [],
//   isFetching: false
// }

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
    default:
      return state
  }

}
