import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';

import GraphicWrangler from '../GraphicWrangler';

import ErrorPageComponent from './index';

storiesOf('ErrorPage', module)
  .add('Default', () => {
    return (
      <ErrorPageComponent
        header={text('header', 'Header')}
        title={text('title', 'Title')}
        message={text('message', 'Message')}
        graphic={<GraphicWrangler />}
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
        graphic={<GraphicWrangler />}
      />
    );
  });
