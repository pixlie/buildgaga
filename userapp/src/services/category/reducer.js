import { FETCH_OBJECTIVE } from './actionTypes';


const initialState = {
  columns: [],
  rows: [],
};


export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OBJECTIVE:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
}