import React from 'react';
import { connect } from 'react-redux';

import { CellBox, Hx } from 'components/BulmaHelpers';
import { slugify } from 'utils';


const SubCategoryItem = ({ id, one_liner, label, categorySolution }) => {
  if (categorySolution.isReady) {
    const solutions = categorySolution.rows.filter(cs => cs.category_fk === id);
    const hasSolutions = solutions.length > 0;
    const url = hasSolutions ? `/category/${id}/${slugify(label)}/` : null;  

    if (hasSolutions) {
      return (
        <CellBox title={label} message={one_liner} colSize="6" url={url}>
          <div className="tag is-success">{solutions.length} solution(s)</div>
        </CellBox>
      );
    }
  }
  return (
    <CellBox title={label} message={one_liner} colSize="6">
      <div className="tag is-info is-light">Coming soon</div>
    </CellBox>
  );
};


const mapStateToProps = state => ({
  categorySolution: state.categorySolution
});


export default connect(
  mapStateToProps,
  { }
)(SubCategoryItem);