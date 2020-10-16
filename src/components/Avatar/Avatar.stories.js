import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';

import Avatar from './Avatar';

const styleProp = { backgroundColor: '#50565b' };

storiesOf('Avatar', module).add('default', () => {
  return (
    <div style={styleProp}>
      <Avatar
        src={text('src', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"')}
        userName={text('userName', 'Gratav User')}
      />
    </div>
  );
});
