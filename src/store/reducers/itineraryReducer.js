import {
  FETCH_ITINERARIES_REQUEST,
  FETCH_ITINERARIES_FAILURE,
  FETCH_ITINERARIES_SUCCESS
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
    default:
      return state
  }

}

export default itineraryReducer