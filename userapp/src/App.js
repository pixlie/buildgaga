import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'services/store';
import Navbar from 'components/Navbar';
import Browser from 'components/Browser';


export default ({ initialState = {} }) => (
  <Provider store={store(initialState)}>
    <BrowserRouter>
      <Navbar />

      <Switch>
        {/* <Route path="/fav">
          <Favorite />
        </Route> */}

        <Route path="/">
          <Browser />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
);