import React from 'react';
import { text } from '@storybook/addon-knobs';

import Avatar from './Avatar';

const styleProp = { backgroundColor: '#50565b' };

export default {
  title: 'Avatar',
};

export const Default = () => {
  return (
    <div style={styleProp}>
      <Avatar
        src={text('src', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"')}
        userName={text('userName', 'Gratav User')}
      />
    </div>
  );
};

Default.story = {
  name: 'default',
};
