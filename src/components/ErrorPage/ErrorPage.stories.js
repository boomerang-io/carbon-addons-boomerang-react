import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';

import ErrorPageComponent from './index';

storiesOf('ErrorPage', module)
  .add('Default', () => {
    return (
      <ErrorPageComponent
        header={text('header', 'Header')}
        title={text('title', 'Title')}
        message={text('message', 'Message')}
      />
    );
  })
  .add('message link', () => {
    return (
      <ErrorPageComponent
        title={text('title', 'Title')}
        message={
          <p>
            Hello there, <a href="https://useboomerang.io">use Boomerang!</a>
          </p>
        }
      />
    );
  });
