import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';


import Home from './Home';
import { fetchCategory } from 'services/category/actions';
import { fetchSolution } from 'services/solution/actions';
import CategoryList from './CategoryList';


const Browser = ({ category, fetchCategory, fetchSolution }) => {
  useEffect(() => {
    fetchCategory();
    fetchSolution();
  }, []);

  return (
    <Fragment>
      <Home />

      <CategoryList category={category} />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  category: state.category,
});

export default connect(
  mapStateToProps,
  { fetchCategory, fetchSolution }
)(Browser);