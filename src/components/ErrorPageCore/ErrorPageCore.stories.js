import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';

import ErrorPageCoreComponent from './index';

storiesOf('ErrorPageCore', module)
  .add('Default', () => {
    return (
      <ErrorPageCoreComponent
        header={text('header', 'Header')}
        title={text('title', 'Title')}
        message={text('message', 'Message')}
      />
    );
  })
  .add('message link', () => {
    return (
      <ErrorPageCoreComponent
        title={text('title', 'Title')}
        message={
          <p>
            Hello there, <a href="https://useboomerang.io">use Boomerang!</a>
          </p>
        }
      />
    );
  });
