import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorDragon from '../ErrorDragon';
import ErrorBoundary from './index';

const ErrorComponent = () => {
  throw new Error('test');
};

storiesOf('ErrorBoundary', module)
  .add('default', () => {
    return (
      <div style={{ height: '100vh', width: '40rem' }}>
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      </div>
    );
  })
  .add('ErrorDragon', () => {
    return (
      <div style={{ height: '100vh', width: '40rem' }}>
        <ErrorBoundary errorComponent={ErrorDragon}>
          <ErrorComponent />
        </ErrorBoundary>
      </div>
    );
  });
