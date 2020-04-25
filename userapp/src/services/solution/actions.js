import axios from 'axios';

import { solutionURL } from '../urls';
import { FETCH_SOLUTION } from './actionTypes';


export const fetchSolution = (filters, sortBy, callback) => dispatch => {
  return axios
    .get(solutionURL)
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
        type: FETCH_SOLUTION,
        payload: {
          columns,
          rows
        }
      });
    })
    .catch(err => {
      console.log('Could not fetch solutions. Try again later.');
    });
};