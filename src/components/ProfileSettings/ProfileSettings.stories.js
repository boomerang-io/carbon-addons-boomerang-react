import React from 'react';
import axios from 'axios';
import ProfileSettings from './ProfileSettings';
import { storiesOf } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import { PROFILE_SETTINGS_DATA } from './constants';

const mock = new MockAdapter(axios);

storiesOf('ProfileSettings', module).add('default', () => {
  mock.onGet('http://localhost.com/launchpad/users').reply(200, PROFILE_SETTINGS_DATA);
  mock.onPatch('http://localhost.com/users/profile').reply(200);
  return (
    <div style={{ width: '16rem' }}>
      <ProfileSettings
        baseServiceUrl="http://localhost.com"
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        userName={'Boomerang Ada'}
      />
    </div>
  );
});
