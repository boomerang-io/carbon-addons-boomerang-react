import React from 'react';
import { action } from '@storybook/addon-actions';

import HeaderMenuButton from './index';

export default {
  title: 'HeaderMenuButton',
};

export const Default = () => {
  return <HeaderMenuButton text="Header Button" iconName="workspace" onClick={action('click')} />;
};

Default.story = {
  name: 'default',
};
