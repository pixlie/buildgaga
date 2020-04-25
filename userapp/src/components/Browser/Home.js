import React from 'react';

import { Section, Hx } from 'components/BulmaHelpers';


export default () => (
  <Section size="is-medium">
    <Hx x="1">
      Building software can seem daunting
    </Hx>
    <Hx x="3" titleClass="subtitle">
      What if we made it easier?
    </Hx>
    <div className="content is-medium">
      <p>
        There are a lot of platforms, software, documentation, communities and other resources available to make software development easier.
        BuildGaga is an attempt to quickly point you to the right direction.
      </p>
    </div>
  </Section>
);