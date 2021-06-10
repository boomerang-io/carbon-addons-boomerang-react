import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorFullPage from './index';

const statusUrl = '/support/status';

storiesOf('ErrorFullPage', module)
  .add('default', () => {
    return <ErrorFullPage statusUrl={statusUrl} />;
  })
  .add('boomerang', () => {
    return <ErrorFullPage theme="boomerang" statusUrl={statusUrl} />;
  });
