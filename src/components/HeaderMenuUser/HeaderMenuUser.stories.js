import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';

import HeaderMenuUser from './HeaderMenuUser';

const styleProp = {
  minHeight: '57px',
  backgroundColor: '#50565b',
  width: '200px',
};

storiesOf('HeaderMenuUser', module).add('default', () => {
  return (
    <div style={styleProp}>
      <HeaderMenuUser
        src={text('imgSrc', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50')}
        userName={text('userName', 'Gravatar User')}
      />
    </div>
  );
});
