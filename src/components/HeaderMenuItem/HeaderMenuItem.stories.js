import React from 'react';
import { storiesOf } from '@storybook/react';

import HeaderMenuItem from './index'; // Using default export

storiesOf('HeaderMenuItem', module).add('default', () => {
  return (
    <HeaderMenuItem text="Send Feedback" iconName="workspace">
      {() => <span>you can put anything inside the modal </span>}
    </HeaderMenuItem>
  );
});
