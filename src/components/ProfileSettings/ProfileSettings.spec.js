import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { axe } from 'jest-axe';
import ProfileSettings from './ProfileSettings';
import { PROFILE_SETTINGS_DATA } from './constants';

const baseServiceUrl = 'http://boomerang.com';
const mock = new MockAdapter(axios);
test('Privacy Statement success', async () => {
  mock.onGet(`${baseServiceUrl}/launchpad/users`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onPatch(`${baseServiceUrl}/users/profile`).networkError();

  const { findByText, getByLabelText, getByText, queryByText } = render(
    <ProfileSettings baseServiceUrl={baseServiceUrl} userName="Boomerang Joe" src="joe@ibm.com" />
  );

  const userBtn = getByText('Boomerang Joe');
  fireEvent.click(userBtn);

  const btn = await findByText(/Save changes/i);

  const allToggle = getByLabelText('Team Name');
  const team1Toggle = getByLabelText('Team 1');
  const team2Toggle = getByLabelText('Team 2');

  fireEvent.click(allToggle);
  expect(team1Toggle).toBeEnabled();
  expect(team2Toggle).toBeEnabled();

  fireEvent.click(btn);

  await waitFor(() =>
    expect(
      queryByText(/For any questions or concerns about business personal information/i)
    ).toBeNull()
  );
});

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
  mock.onGet(`${baseServiceUrl}/launchpad/users`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onPatch(`${baseServiceUrl}/users/profile`).reply(500);

  const { findByText, getByText } = render(
    <ProfileSettings baseServiceUrl={baseServiceUrl} userName="Boomerang Joe" src="joe@ibm.com" />
  );

  const userBtn = getByText('Boomerang Joe');
  fireEvent.click(userBtn);

  const btn = await findByText(/Save changes/i);
  fireEvent.click(btn);

  await waitFor(() => expect(getByText(/try again/i)).toBeInTheDocument());
});

test('Privacy Statement accessibility', async () => {
  const { container } = render(
    <ProfileSettings baseServiceUrl={baseServiceUrl} userName="Boomerang Joe" src="joe@ibm.com" />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
