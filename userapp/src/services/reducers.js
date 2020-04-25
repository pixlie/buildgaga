import { combineReducers } from 'redux';


import global from './global/reducer';
import category from './category/reducer';


export default combineReducers({
  global,
  category,
});