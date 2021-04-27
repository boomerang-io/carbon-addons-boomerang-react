import React from 'react';
import { storiesOf } from '@storybook/react';
import RecoverErrorBoundary from './index';

const TestComponent = () => {
  throw new Error("test");
}

storiesOf('RecoverErrorBoundary', module)
  .add('default', () => {
    const [ error, setError ] = React.useState(false);

    React.useEffect(() => {
      if(error) {
        setError(false);
      }
      else {
        setTimeout(() => {
          setError(true);
        }, 5000);
      }
    }, [error]);

    return (
      <div style={{ height: '100vh', width: '40rem' }}>
        <RecoverErrorBoundary>
          <div>Hey! An error will appear soon!</div>
          {error && <TestComponent />}
        </RecoverErrorBoundary>
      </div>
    );
  });
