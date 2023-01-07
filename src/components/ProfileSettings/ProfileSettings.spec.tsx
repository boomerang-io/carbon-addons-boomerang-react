import React from "react";
import { expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { axe } from "jest-axe";
import ProfileSettings from "./ProfileSettings";
import { PROFILE_SETTINGS_DATA } from "./constants";
import { headerModalProps } from "../../internal/helpers";

const baseServiceUrl = "http://boomerang.com";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

test("Profile Settings - success", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${baseServiceUrl}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onPatch(`${baseServiceUrl}/users/profile`).reply(200);
  const { findByText, getByLabelText, queryByText } = render(
    <QueryClientProvider client={queryClient}>
      <ProfileSettings
        baseServiceUrl={baseServiceUrl}
        userName="Boomerang Joe"
        src="joe@ibm.com"
        {...headerModalProps}
      />
    </QueryClientProvider>
  );

  const btn = await findByText(/Save changes/i);
  expect(btn).toBeDisabled();
  const allToggle = getByLabelText("Team Name");
  const team1Toggle = getByLabelText("Team 1");
  const team2Toggle = getByLabelText("Team 2");
  fireEvent.click(allToggle);
  expect(team1Toggle).toBeEnabled();
  expect(team2Toggle).toBeEnabled();
  expect(btn).toBeEnabled();
  fireEvent.click(btn);
  await waitFor(() =>
    expect(queryByText(/For any questions or concerns about business personal information/i)).toBeNull()
  );
});

test("Profile Settings - error", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${baseServiceUrl}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onPatch(`${baseServiceUrl}/users/profile`).networkError();
  const { findByText, findByLabelText, getByText } = render(
    <QueryClientProvider client={queryClient}>
      <ProfileSettings
        baseServiceUrl={baseServiceUrl}
        userName="Boomerang Joe"
        src="joe@ibm.com"
        {...headerModalProps}
      />
    </QueryClientProvider>
  );
  const allToggle = await findByLabelText(/Team Name/i);
  fireEvent.click(allToggle);
  const btn = await findByText(/Save changes/i);
  fireEvent.click(btn);
  await waitFor(() => expect(getByText(/try again/i)).toBeInTheDocument());
});

test("Profile Settings - accessibility", async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <ProfileSettings
        baseServiceUrl={baseServiceUrl}
        userName="Boomerang Joe"
        src="joe@ibm.com"
        {...headerModalProps}
      />
    </QueryClientProvider>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
