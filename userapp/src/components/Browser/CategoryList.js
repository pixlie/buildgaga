import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Section } from 'components/BulmaHelpers';
import { fetchSolution } from 'services/solution/actions';
import Root from './Root';
import SubCategory from './SubCategory';


const Category = ({ category, categorySolution, solution, fetchSolution }) => {
  const { category_id } = useParams();
  if (!category.isReady) {
    return (
      <Section>Loading categories...</Section>
    );
  }

  if (category_id === undefined) {
    return (
      <Root />
    );
  } else {
    const currentCategory = category.rows.find(x => x.id === parseInt(category_id));

    if (currentCategory.parent_fk === null) {
      // This is a root level category
      return (
        <Root currentCategory={currentCategory} />
      );
    }

    // We are in a sub-category
    return (
      <SubCategory currentCategory={currentCategory} />
    )
  }
}


const mapStateToProps = state => ({
  category: state.category,
  categorySolution: state.categorySolution,
  solution: state.solution,
});


export default connect(
  mapStateToProps,
  { fetchSolution }
)(Category);