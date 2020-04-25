import { FETCH_SOLUTION } from './actionTypes';


const initialState = {
  columns: [],
  rows: [],
};


export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SOLUTION:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
}