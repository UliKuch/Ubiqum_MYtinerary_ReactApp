import { combineReducers } from "redux";
import {citiesReducer, findCityReducer} from "./cityReducer";
import itineraryReducer from "./itineraryReducer";
import {activityReducer} from "./activityReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  city: citiesReducer,
  findCity: findCityReducer,
  itinerary: itineraryReducer,
  activity: activityReducer,
  user: userReducer,
});

export default rootReducer;