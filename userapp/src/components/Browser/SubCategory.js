import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchSolution } from 'services/solution/actions';
import { Section } from 'components/BulmaHelpers';
import BrowseSection from './BrowseSection';
import SolutionItem from './SolutionItem';


const SubCategory = ({ category, solution, categorySolution, currentCategory, fetchSolution }) => {
  // We are inside a sub-category, so the sub-category and its parent go on the left.
  // Solutions under this sub-category go on the right side.
  useEffect(() => {
    fetchSolution();
  }, []);

  if (!category.isReady || !solution.isReady || !categorySolution.isReady) {
    return (
      <Section>Loading categories/solutions...</Section>
    );
  }

  relatedSolutionID = categorySolution.rows.filter(x => x.category_fk === currentCategory.id).map(x => x.solution_fk);
  const rootCategory = {
    category: currentCategory,
    children: solution.rows.filter(y => relatedSolutionID.includes(y.id)),
  }

  return (
    <Fragment>
      { Object.values(rootCategory).filter(root => root.children.length !== 0).map((item, i) => (
        <BrowseSection key={`sec-${i}`} {...item.category}>
          <Fragment>
            { item.children.map(data => (
              <SolutionItem {...data} key={`sc-${data.id}`} />
            )) }
          </Fragment>
        </BrowseSection>
      )) }
    </Fragment>
  );
}


const mapStateToProps = state => ({
  category: state.category,
  categorySolution: state.categorySolution,
  solution: state.solution,
});


export default connect(
  mapStateToProps,
  { fetchSolution }
)(SubCategory);