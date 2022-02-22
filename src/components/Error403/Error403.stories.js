import React from 'react';
import { text } from '@storybook/addon-knobs';

import Error403Component from './index';

export default {
  title: 'Error403',
};

export const Default = () => {
  return <Error403Component />;
};

Default.story = {
  name: 'default',
};

export const CustomText = () => {
  return (
    <Error403Component
      header={text('header', 'Header')}
      title={text('title', 'Title')}
      message={text('message', 'Message')}
    />
  );
};

CustomText.story = {
  name: 'custom text',
};

export const NoText = () => {
  return <Error403Component header={null} title={null} message={null} />;
};

NoText.story = {
  name: 'no text',
};

export const Boomerang = () => {
  return <Error403Component theme="boomerang" />;
};

Boomerang.story = {
  name: 'boomerang',
};
