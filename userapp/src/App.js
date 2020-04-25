import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "services/store";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Browser from "components/Browser";


export default ({ initialState = {} }) => (
  <Fragment>
    <Provider store={store(initialState)}>
      <BrowserRouter>
        <Navbar />

        <div id="main-content">
          <Switch>
            {/* <Route path="/fav">
              <Favorite />
            </Route> */}

            <Route path="/">
              <Browser />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>

    <Footer />
  </Fragment>
);