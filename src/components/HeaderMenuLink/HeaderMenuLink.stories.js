import React from 'react';
import { storiesOf } from '@storybook/react';

import HeaderMenuLink from './index'; // Using default export

storiesOf('HeaderMenuLink', module).add('default', () => {
  return (
    <HeaderMenuLink text="Navigate from Platform" iconName="workspace" href="https://www.ibm.com" />
  );
});
