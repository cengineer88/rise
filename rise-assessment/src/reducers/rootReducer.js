import { combineReducers } from "redux";
import jobListReducer from "./job-list-reducer";

export default combineReducers({
  jobList: jobListReducer,
});
