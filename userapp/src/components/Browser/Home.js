import React from 'react';

import { Section, Hx } from 'components/BulmaHelpers';


export default () => (
  <Section>
    <Hx x="1">
      Building software seems daunting?
    </Hx>
    <Hx x="3" titleClass="subtitle">
      Here are the resources to make it easier.
    </Hx>
    <div className="tag is-medium is-warning">We just launched!</div>
  </Section>
);