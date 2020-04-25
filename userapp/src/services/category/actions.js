import axios from 'axios';

import { objectiveURL } from '../urls';
import { FETCH_OBJECTIVE } from './actionTypes';


export const fetchObjective = (filters, sortBy, callback) => dispatch => {
  return axios
    .get(objectiveURL)
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
        type: FETCH_OBJECTIVE,
        payload: {
          columns,
          rows
        }
      });
    })
    .catch(err => {
      console.log('Could not fetch objectives. Try again later.');
    });
};