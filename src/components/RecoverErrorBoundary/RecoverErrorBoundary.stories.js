import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from 'carbon-components-react';
import ErrorDragon from '../ErrorDragon';
import ErrorBoundaryPoc from './index';

const TestComponent = () => {
  throw new Error("test");
}

storiesOf('ErrorBoundaryPoc', module)
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
        <ErrorBoundaryPoc>
          <div>Hey! An error will appear soon!</div>
          {error && <TestComponent />}
        </ErrorBoundaryPoc>
      </div>
    );
  });
