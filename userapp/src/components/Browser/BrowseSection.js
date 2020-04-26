import React from 'react';

import { Section, Hx } from 'components/BulmaHelpers';


export default ({ label, children }) => (
  <Section>
    <div className="columns">
      <div className="column is-3">
        <Hx x="2">{label}</Hx>
      </div>

      <div className="column is-9">
        <div className="columns is-multiline">
          { children }
        </div>
      </div>
    </div>
  </Section>
);