import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorFullPage from './index';

const statusUrl = '/status';

storiesOf('ErrorFullPage', module)
  .add('default', () => {
    return <ErrorFullPage />;
  })
  .add('boomerang', () => {
    return <ErrorFullPage theme="boomerang" statusUrl={statusUrl} />;
  });
