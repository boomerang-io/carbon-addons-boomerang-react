// /**
//  * Copyright IBM Corp. 2016, 2018
//  *
//  * This source code is licensed under the Apache-2.0 license found in the
//  * LICENSE file in the root directory of this source tree.
//  */

// /* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import PrivacyStatement from './PrivacyStatement';
import { PRIVACY_DATA } from './constants';

const mock = new MockAdapter(axios);

const props = () => ({
  baseServiceUrl: 'http://localhost:8080',
});

storiesOf('PrivacyStatement', module).add(
  'default',
  () => {
    mock.onGet('http://localhost:8080/users/consents').reply(200, PRIVACY_DATA);
    return <PrivacyStatement {...props()} />;
  },
  {
    info: {
      text: `
Privacy statement component is for displaying the user agreement form and allowing the user to delete their account from the Boomerang platform. 
          `,
    },
  }
);
