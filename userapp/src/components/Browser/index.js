import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';


import Home from './Home';
import { CellBox } from 'components/BulmaHelpers';
import { fetchObjective } from 'services/category/actions';
import { transformData } from 'services/utils';


const CategoryList = ({ category }) => {
  const rootCategory = {};

  for (const item of category.rows) {
    const data = transformData(category.columns, item);
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
    <Fragment>
      { Object.values(rootCategory).map(root => (
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-3">
                <h2 className="title is-2">{root.category.label}</h2>
              </div>

              <div className="column is-9">
                <div className="columns is-multiline">
                  { root.children.map(data => (
                    <CellBox key={`ob-${data.id}`} title={data.label} message={data.one_liner} colSize="6">
                      <div className="tag is-medium is-warning">{root.category.label}</div>
                    </CellBox>
                  )) }
                </div>
              </div>
            </div>
          </div>
        </section>
      )) }
    </Fragment>
  );
}


const Browser = ({ category, fetchObjective }) => {
  useEffect(() => {
    fetchObjective();
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
  { fetchObjective }
)(Browser);