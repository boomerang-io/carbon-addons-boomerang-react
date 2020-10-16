import React from 'react';
import { storiesOf } from '@storybook/react';

import ErrorDragonComponent from './index';

const statusUrl = '/status';

storiesOf('ErrorDragon', module).add('default', () => {
  return <ErrorDragonComponent statusUrl={statusUrl} />;
});
