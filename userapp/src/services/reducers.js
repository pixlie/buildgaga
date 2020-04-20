import { combineReducers } from 'redux';


import global from './global/reducer';
import objective from './objective/reducer';


export default combineReducers({
  global,
  objective,
});