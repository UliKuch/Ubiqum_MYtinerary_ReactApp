import { combineReducers } from "redux";
import cityReducer from "./cityReducer";

const rootReducer = combineReducers({city: cityReducer});

export default rootReducer;