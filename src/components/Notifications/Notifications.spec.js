import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from 'carbon-components-react';

import NotificationsContainer from './NotificationsContainer';
import ToastNotification from './ToastNotification';
import notify from './notify';

jest.useFakeTimers();

test('toast notification displays correctly when triggered', () => {
  const { getByText } = render(
    <div>
      <Button
        onClick={() =>
          notify(
            <ToastNotification subtitle="This happened" title="Something happened" kind="success" />
          )
        }
      >
        Try Me
      </Button>
      <NotificationsContainer />
    </div>
  );

  const notificationButton = getByText(/Try Me/);
  fireEvent.click(notificationButton);
  jest.runAllTimers();
  expect(getByText(/something happened/i)).toBeInTheDocument();
});
