import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';


import Home from './Home';
import { fetchCategory } from 'services/category/actions';
import { fetchCategorySolution } from 'services/categorySolution/actions';
import CategoryList from './CategoryList';
import Root from './Root';


const Browser = ({ fetchCategory, fetchCategorySolution }) => {
  useEffect(() => {
    fetchCategory();
    fetchCategorySolution();
  }, []);

  return (
    <Fragment>
      <Home />

      <Switch>
        <Route path="/category/:category_id/:slug" exact>
          <CategoryList />
        </Route>

        <Route path="/category" exact>
          <Root />
        </Route>

        <Route path="/solution/:solution_id/:slug" exact></Route>

        <Route path="/" exact>
          <Root />
        </Route>
      </Switch>
    </Fragment>
  );
}


export default connect(
  () => ({}),
  { fetchCategory, fetchCategorySolution }
)(Browser);