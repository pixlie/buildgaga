import { combineReducers } from 'redux';


import global from './global/reducer';
import category from './category/reducer';
import solution from './solution/reducer';


export default combineReducers({
  global,
  category,
  solution,
});