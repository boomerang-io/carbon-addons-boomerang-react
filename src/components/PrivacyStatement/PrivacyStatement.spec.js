import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import PrivacyStatement from './PrivacyStatement.js';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { PRIVACY_DATA } from './constants';

const baseServiceUrl = 'http://boomerang.com';

test('Privacy Statement error', async () => {
  /**
   * Simulate deleting account
   * -pulls in mocked out data
   * -ends in failure based on
   *
   * NOTE: there is a conole warning here stating that when updating the state
   * of a component, you should use the act() function. Bug in React Hooks:
   * https://github.com/kentcdodds/@testing-library/react/issues/285
   *
   */

  const mock = new MockAdapter(axios);

  mock.onGet(`${baseServiceUrl}/users/consents`).reply(200, PRIVACY_DATA);

  mock.onPut(`${baseServiceUrl}/users/consent`).networkError();

  const { getByText, getByRole, findByRole } = render(
    <PrivacyStatement baseServiceUrl={baseServiceUrl} />
  );

  const btn = getByRole('button', { name: /Privacy Statement/i });
  fireEvent.click(btn);

  const deleteButton = await findByRole('button', { name: /Request account deletion/i });
  fireEvent.click(deleteButton);

  const confirmButton = getByText(/Delete my account/i);
  fireEvent.click(confirmButton);

  await waitFor(() =>
    expect(getByText(/Failed to recieve deletion request. Please try again./i)).toBeInTheDocument()
  );
});

test('Privacy Statement success', async () => {
  /**
   *
   */
  const mock = new MockAdapter(axios);

  mock.onGet(`${baseServiceUrl}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onPut(`${baseServiceUrl}/users/consent`).reply(200);

  const { getByRole, findByRole } = render(<PrivacyStatement baseServiceUrl={baseServiceUrl} />);

  const btn = getByRole('button', { name: /Privacy Statement/i });
  fireEvent.click(btn);

  const deleteButton = await findByRole('button', { name: /Request account deletion/i });
  fireEvent.click(deleteButton);

  const confirmButton = getByRole('button', { name: /Delete my account/i });
  fireEvent.click(confirmButton);
});
