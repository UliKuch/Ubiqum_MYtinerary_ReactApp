import { combineReducers } from "redux";
import {citiesReducer, findCityReducer} from "./cityReducer";
import {itineraryReducer, postItineraryReducer} from "./itineraryReducer";
import {activityReducer} from "./activityReducer";
import {userReducer, postUserReducer} from "./userReducer";

const rootReducer = combineReducers({
  city: citiesReducer,
  findCity: findCityReducer,
  itinerary: itineraryReducer,
  postItinerary: postItineraryReducer,
  activity: activityReducer,
  user: userReducer,
  postUser: postUserReducer,
});

export default rootReducer;