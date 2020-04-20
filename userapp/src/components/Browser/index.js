import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';


import Home from './Home';
import { CellBox } from 'components/BulmaHelpers';
import { fetchObjective } from 'services/objective/actions';
import { transformData } from 'services/utils';


const Browser = ({ objective, fetchObjective }) => {
  useEffect(() => {
    fetchObjective();
  }, []);

  return (
    <Fragment>
      <Home />

      <div className="columns">
        { objective.rows.filter(x => x[1] !== null).map(item => {
          const data = transformData(objective.columns, item);
          const parent = transformData(objective.columns, objective.rows.find(x => x[0] === data.parent_fk));

          return (
            <CellBox key={`ob-${data.id}`} title={data.label} message={data.one_liner}>
              <div className="tag is-medium is-warning">{parent.label}</div>
            </CellBox>
          );
        }) }
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  objective: state.objective,
});

export default connect(
  mapStateToProps,
  { fetchObjective }
)(Browser);