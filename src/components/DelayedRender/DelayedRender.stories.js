import React from 'react';
import { storiesOf } from '@storybook/react';

import DelayedRender from './index';

storiesOf('DelayedRender', module).add('default', () => {
  return <DelayedRender delay={1000}>I render after a second</DelayedRender>;
});
