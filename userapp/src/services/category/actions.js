import axios from 'axios';

import { categoryURL } from '../urls';
import { INITIATE_FETCH_CATEGORY, FETCH_CATEGORY } from './actionTypes';


export const fetchCategory = (filters, sortBy, callback) => dispatch => {
  dispatch({
    type: INITIATE_FETCH_CATEGORY,
  });

  return axios
    .get(categoryURL)
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
        type: FETCH_CATEGORY,
        payload: {
          columns,
          rows
        }
      });
    })
    .catch(err => {
      console.log('Could not fetch categories. Try again later.');
    });
};