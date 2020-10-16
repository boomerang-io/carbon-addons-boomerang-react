import React from 'react';
import { storiesOf } from '@storybook/react';

import ErrorComponent from './index';

storiesOf('ErrorMessage', module).add('default', () => {
  return <ErrorComponent />;
});
