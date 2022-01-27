import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import AboutPlatform from './AboutPlatform';

storiesOf('AboutPlatform', module)
  .add('default', () => {
    return (
      <AboutPlatform
        organization={text('organization', 'IBM Boomerang Platform')}
        version={text('version', '5.0.0')}
      />
    );
  })
  .add('Flow Icons', () => {
    return (
      <AboutPlatform
        isFlowApp
        organization={text('organization', 'IBM Boomerang Platform')}
        version={text('version', '5.0.0')}
      />
    );
  });
