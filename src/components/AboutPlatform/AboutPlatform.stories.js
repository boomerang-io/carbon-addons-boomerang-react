import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';

import AboutPlatform from './AboutPlatform';

storiesOf('AboutPlatform', module).add('default', () => {
  return (
    <AboutPlatform
      organization={text('organization', 'IBM Boomerang Platform')}
      version={text('version', '5.0.0')}
    />
  );
});
