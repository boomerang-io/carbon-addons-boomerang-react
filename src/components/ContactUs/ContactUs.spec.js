import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import ContactUs from './ContactUs.js';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// test for user accessability commented out for now
/* test('contact us rendered', async () => {
  // Render new instance in every test to prevent leaking state
  const { getByText, debug, container } = render(<ContactUs />);
  const btn = getByText(/Contact/i);
  debug();
  fireEvent.t
  debug();
  const results = await axe(container.innerHTML);
  expect(results).toHaveNoViolations();
}); */

const baseServiceUrl = 'http://boomerang.com';

test('contact us sending', async () => {
  /**
   * In this test we do not mock out the response from the contact server,
   * so we want to show that the state of the submission button should still
   * be in "Sending" since we have not recieved a response
   */
  const { getByText, getByLabelText } = render(<ContactUs baseServiceUrl={baseServiceUrl} />);
  const btn = getByText(/Contact/i);
  fireEvent.click(btn);
  const input = getByLabelText("What's your comment or concern?");
  const newValue = 'new Value';

  fireEvent.change(input, { target: { value: newValue } });

  fireEvent.click(getByText(/Send/i));

  await wait(() => expect(getByText(/Sending/i)).toBeInTheDocument());
});

test('contact us error', async () => {
  /**
   * Here we mock out an error on request
   * so we want to see that the error message pops up after
   * the contact us submission
   */
  const mock = new MockAdapter(axios);

  mock.onPost(`${baseServiceUrl}/support/contact`).networkError();

  const { getByText, getByLabelText } = render(<ContactUs baseServiceUrl={baseServiceUrl} />);
  const btn = getByText(/Contact/i);
  fireEvent.click(btn);
  const input = getByLabelText("What's your comment or concern?");
  const newValue = 'new Value';

  fireEvent.change(input, { target: { value: newValue } });

  fireEvent.click(getByText(/Send/i));

  await wait(() =>
    expect(getByText(/Failed to send message. Please try again./i)).toBeInTheDocument()
  );
});

test('contact us success', async () => {
  /**
   * contact us submission occurs successfully
   * we shouldn't expect to see the form still open since it
   * has successfully closed on submission
   */
  const mock = new MockAdapter(axios);

  mock.onPost(`${baseServiceUrl}/support/contact`).reply(200);

  const { getByText, getByLabelText, queryByText } = render(
    <ContactUs baseServiceUrl={baseServiceUrl} />
  );
  const btn = getByText(/Contact/i);
  fireEvent.click(btn);
  const input = getByLabelText("What's your comment or concern?");
  const newValue = 'new Value';

  fireEvent.change(input, { target: { value: newValue } });

  fireEvent.click(getByText(/Send/i));

  await wait(() => expect(queryByText(/What's your comment or concern/i)).toBeNull());
});
