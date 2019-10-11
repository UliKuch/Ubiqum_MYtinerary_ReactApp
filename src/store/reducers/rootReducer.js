import { combineReducers } from "redux";
import {citiesReducer, findCityReducer} from "./cityReducer";
import itineraryReducer from "./itineraryReducer"

const rootReducer = combineReducers({
  city: citiesReducer,
  findCity: findCityReducer,
  itinerary: itineraryReducer
});

export default rootReducer;