import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import HeaderMenuButton from './index';

storiesOf('HeaderMenuButton', module).add('default', () => {
  return <HeaderMenuButton text="Header Button" iconName="workspace" onClick={action('click')} />;
});
