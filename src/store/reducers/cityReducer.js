import {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_FAILURE,
  FETCH_CITIES_SUCCESS,
  FILTER_CITIES
} from "../actions/cityActions"

const initialState = {
  cities: [],
  filteredCities: [],
  isFetching: false
}

function cityReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CITIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_CITIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case FETCH_CITIES_SUCCESS:      
      return Object.assign({}, state, {
        cities: action.cities,
        filteredCities: action.cities,
        isFetching: false
      })
    case FILTER_CITIES:
      return Object.assign({}, state, {
        filteredCities: action.filteredCities,
      })
    default:
      return state
  }
}

export default cityReducer