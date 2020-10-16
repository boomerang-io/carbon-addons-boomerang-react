import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import ReportBug from './ReportBug.js';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const baseServiceUrl = 'http://boomerang.com';

test('Report Issue sending', async () => {
  /**
   * In this test we do not mock out the response for a submission,
   * so we want to show that the state of the submission button should still
   * be displaying "Sending" since we have not recieved a response
   */
  const { getByText, getByLabelText } = render(<ReportBug baseServiceUrl={baseServiceUrl} />);
  const btn = getByText(/Report issue/i);
  fireEvent.click(btn);
  const input = getByLabelText('Describe your experience');
  const newValue = 'i have a problem';

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

  mock.onPost(`${baseServiceUrl}'/support/bugs'`).networkError();

  const { getByText, getByLabelText } = render(<ReportBug baseServiceUrl={baseServiceUrl} />);
  const btn = getByText(/Report issue/i);
  fireEvent.click(btn);
  const input = getByLabelText('Describe your experience');
  const newValue = 'i have a problem';

  fireEvent.change(input, { target: { value: newValue } });

  fireEvent.click(getByText(/Send/i));

  await wait(() =>
    expect(getByText(/Failed to send message. Please try again./i)).toBeInTheDocument()
  );
});
