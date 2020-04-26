import axios from 'axios';

import { categorySolutionURL } from '../urls';
import { INITIATE_FETCH_CATEGORY_SOLUTION, FETCH_CATEGORY_SOLUTION } from './actionTypes';


export const fetchCategorySolution = (filters, sortBy, callback) => dispatch => {
  dispatch({
    type: INITIATE_FETCH_CATEGORY_SOLUTION
  });

  return axios
    .get(categorySolutionURL)
    .then(res => {
      let { columns, rows } = res.data;

      if (!!filters && filters.length > 0) {
        rows = rows.filter(p =>
          filters.find(f => p.availableSizes.find(size => size === f))
        );
      }

      // if (!!sortBy) {
      //   rows = rows.sort();
      // }

      if (!!callback) {
        callback();
      }

      return dispatch({
        type: FETCH_CATEGORY_SOLUTION,
        payload: {
          columns,
          rows
        }
      });
    })
    .catch(err => {
      console.log('Could not fetch categorySolutions. Try again later.');
    });
};