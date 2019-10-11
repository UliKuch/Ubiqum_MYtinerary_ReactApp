import {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_FAILURE,
  FETCH_CITIES_SUCCESS,
  FILTER_CITIES,
  FIND_CITY_REQUEST,
  FIND_CITY_FAILURE,
  FIND_CITY_SUCCESS
} from "../actions/cityActions"

const initialState = {
  cities: [],
  filteredCities: [],
  isFetching: false
}

const findCityInitialState = {
  city: [],
  isFetching: false
}

function citiesReducer(state = initialState, action) {
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

function findCityReducer(state = findCityInitialState, action) {
  switch (action.type) {
    case FIND_CITY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FIND_CITY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case FIND_CITY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        city: action.city
      })    
    default:
      return state;
  }
}

export {citiesReducer, findCityReducer}