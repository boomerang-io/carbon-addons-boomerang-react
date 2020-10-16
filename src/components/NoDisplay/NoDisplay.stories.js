import React from 'react';
import { storiesOf } from '@storybook/react';

import NoDisplayComponent from './index';

storiesOf('NoDisplay', module)
  .add('default', () => {
    return (
      <div style={{ background: '#fff' }}>
        <NoDisplayComponent />
      </div>
    );
  })
  .add('message', () => {
    return <NoDisplayComponent text="Looks like you need to add some repos." />;
  });
