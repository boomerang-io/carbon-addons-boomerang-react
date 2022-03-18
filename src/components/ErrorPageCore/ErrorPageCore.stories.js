import React from 'react';
import { text } from '@storybook/addon-knobs';

import ErrorPageCoreComponent from './index';

export default {
  title: 'ErrorPageCore',
};

export const Default = () => {
  return (
    <ErrorPageCoreComponent
      header={text('header', 'Header')}
      title={text('title', 'Title')}
      message={text('message', 'Message')}
    />
  );
};

export const MessageLink = () => {
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
};

MessageLink.story = {
  name: 'message link',
};
