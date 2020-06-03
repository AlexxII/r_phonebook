import { combineReducers } from "redux";
import { phonesReducer } from './phones/reducers'

export default combineReducers({
  phones: phonesReducer
})