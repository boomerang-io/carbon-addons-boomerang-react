import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';

import Error403Component from './index';

storiesOf('Error403', module)
  .add('default', () => {
    return <Error403Component />;
  })
  .add('custom text', () => {
    return (
      <Error403Component
        header={text('header', 'Header')}
        title={text('title', 'Title')}
        message={text('message', 'Message')}
      />
    );
  })
  .add('no text', () => {
    return <Error403Component header={null} title={null} message={null} />;
  });
