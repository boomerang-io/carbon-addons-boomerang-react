// /**
//  * Copyright IBM Corp. 2016, 2018
//  *
//  * This source code is licensed under the Apache-2.0 license found in the
//  * LICENSE file in the root directory of this source tree.
//  */

// /* eslint-disable no-console */

import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import PrivacyStatement from './PrivacyStatement';
import { PRIVACY_DATA } from './constants';

const mock = new MockAdapter(axios);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false }, mutations: { throwOnError: true } },
});

const props = () => ({
  baseServiceUrl: 'http://ibm.com',
});

export default {
  title: 'PrivacyStatement',
};

export const Default = () => {
  mock.onGet('http://ibm.com/users/consents').reply(200, PRIVACY_DATA);
  return (
    <QueryClientProvider client={queryClient}>
      <PrivacyStatement {...props()} />
    </QueryClientProvider>
  );
};

Default.story = {
  name: 'default',

  parameters: {
    info: {
      text: `
Privacy statement component is for displaying the user agreement form and allowing the user to delete their account from the Boomerang platform. 
          `,
    },
  },
};
