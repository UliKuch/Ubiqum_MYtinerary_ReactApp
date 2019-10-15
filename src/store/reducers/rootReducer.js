import { combineReducers } from "redux";
import {citiesReducer, findCityReducer} from "./cityReducer";
import itineraryReducer from "./itineraryReducer"
import {activityReducer} from "./activityReducer"

const rootReducer = combineReducers({
  city: citiesReducer,
  findCity: findCityReducer,
  itinerary: itineraryReducer,
  activity: activityReducer,
});

export default rootReducer;