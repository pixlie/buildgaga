import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';


import { Section, Hx } from 'components/BulmaHelpers';
import SubCategoryItem from './SubCategoryItem';
import SolutionItem from './SolutionItem';
import { fetchSolution } from 'services/solution/actions';


export const RootList = ({ rootCategory }) => (
  <Fragment>
    { Object.values(rootCategory).filter(root => root.children.length !== 0).map(root => (
      <Section key={`cat-${root.category.id}`}>
        <div className="columns">
          <div className="column is-3">
            <Hx x="2">{root.category.label}</Hx>
          </div>

          <div className="column is-9">
            <div className="columns is-multiline">
              { root.children.map(data => (
                <SubCategoryItem {...data} key={`sub-${data.id}`} />
              )) }
            </div>
          </div>
        </div>
      </Section>
    )) }
  </Fragment>
);


const SubList = ({ category, parent, solution }) => (
  <Section>
    <div className="columns">
      <div className="column is-3">
        <Hx x="2">{category.label}</Hx>
      </div>

      <div className="column is-9">
        <div className="columns is-multiline">
          { solution.map(data => (
            <SolutionItem {...data} key={`so-${data.id}`} />
          )) }
        </div>
      </div>
    </div>
  </Section>
);


const CategoryList = ({ category, categorySolution, solution, fetchSolution }) => {
  const { category_id, slug } = useParams();

  if (!category.isReady) {
    return (
      <Section>Loading categories...</Section>
    );
  }

  if (category_id === undefined) {
    // We are in the root, so top categories go on left side.
    // Child categories go on the right side.
    const rootCategory = {};
    for (const data of category.rows) {
      if (data.parent_fk === null) {
        // This is a root category
        rootCategory[data.id] = {
          category: data,
          children: [],
        };
      } else {
        rootCategory[data.parent_fk].children.push(data);
      }
    }

    return (
      <RootList rootCategory={rootCategory} />
    );
  } else {
    // We are inside a sub-category, so the sub-category and its parent go on the left.
    // Solutions under this sub-category go on the right side.
    const currentCategory = category.rows.find(x => x.id === parseInt(category_id));
    const parentCategory = category.rows.find(x => x.id === currentCategory.parent_fk);
    console.log(category);

    return (
      <SubList category={currentCategory} parent={parentCategory} />
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
)(CategoryList);