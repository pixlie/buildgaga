import React from 'react';

import { CellBox } from 'components/BulmaHelpers';


export default ({ id, label, one_liner }) => (
  <CellBox title={label} message={one_liner} colSize="6">
  </CellBox>
);