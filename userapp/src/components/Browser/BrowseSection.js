import React from 'react';
import { Link } from 'react-router-dom';

import { Section, Hx } from 'components/BulmaHelpers';


export default ({ label, headingURL, children }) => (
  <Section>
    <div className="columns">
      <div className="column is-3">
        { headingURL ? (
          <Hx x="2"><Link to={headingURL}>{label}</Link></Hx>
        ) : (
          <Hx x="2">{label}</Hx>
         ) }
      </div>

      <div className="column is-9">
        <div className="columns is-multiline">
          { children }
        </div>
      </div>
    </div>
  </Section>
);