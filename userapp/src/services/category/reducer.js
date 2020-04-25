import { FETCH_CATEGORY } from './actionTypes';


const initialState = {
  columns: [],
  rows: [],
};


export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
}