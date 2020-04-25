import React, { Fragment } from 'react';


import { Section, CellBox, Hx } from 'components/BulmaHelpers';
import { transformData } from 'services/utils';


export default ({ category }) => {
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
      { Object.values(rootCategory).filter(root => root.children.length !== 0).map(root => (
        <Section key={`cat-${root.category.id}`}>
          <div className="columns">
            <div className="column is-3">
              <Hx x="2">{root.category.label}</Hx>
            </div>

            <div className="column is-9">
              <div className="columns is-multiline">
                { root.children.map(data => (
                  <CellBox key={`ob-${data.id}`} title={data.label} message={data.one_liner} colSize="6">
                    <div className="tag is-info is-light">Coming soon</div>
                  </CellBox>
                )) }
              </div>
            </div>
          </div>
        </Section>
      )) }
    </Fragment>
  );
}