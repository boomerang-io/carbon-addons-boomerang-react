import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';

import Error404Component from './index';

storiesOf('Error404', module)
  .add('default', () => {
    return <Error404Component />;
  })
  .add('custom text', () => {
    return (
      <Error404Component
        header={text('header', 'Header')}
        title={text('title', 'Title')}
        message={text('message', 'Message')}
      />
    );
  })
  .add('no text', () => {
    return <Error404Component header={null} title={null} message={null} />;
  });
