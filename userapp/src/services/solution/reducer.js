import { INITIATE_FETCH_SOLUTION, FETCH_SOLUTION } from './actionTypes';
import { transformData } from 'utils';


const initialState = {
  columns: [],
  rows: [],
  isFetching: false,
  isReady: false,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_FETCH_SOLUTION:
      return {
        ...state,
        isFetching: true,
      };

      case FETCH_SOLUTION:
      return {
        columns: action.payload.columns,
        rows: action.payload.rows.map(row => transformData(action.payload.columns, row)),
        isFetching: false,
        isReady: true,
      };

    default:
      return state;
  }
}