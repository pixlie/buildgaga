import React from 'react';

import { CellBox } from 'components/BulmaHelpers';


export default ({ id, label, one_liner, twitter, url }) => (
  <CellBox title={label} message={one_liner} colSize="6">
    <div className="tags">
      { twitter ? (
        <div className="tag is-info is-light">
          <a href={`https://twitter.com/${twitter}`} target="_blank">@{twitter}</a>
        </div>
      ) : null }
      { url ? (
        <div className="tag is-info is-light">
          <a href={`https://${url}`} target="_blank">www</a>
        </div>
      ) : null }
    </div>
  </CellBox>
);