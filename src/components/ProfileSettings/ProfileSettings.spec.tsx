/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/

import React from "react";
import { expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { axe } from "jest-axe";
import ProfileSettings from "./ProfileSettings";
import { PROFILE_SETTINGS_DATA } from "./constants";
import { headerModalProps } from "../../internal/helpers";

const baseServicesUrl = "http://boomerang.com";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

describe("Profile Settings", () => {
  test("snapshot", () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${baseServicesUrl}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
    mock.onPatch(`${baseServicesUrl}/users/profile`).reply(200);
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings
          baseServicesUrl={baseServicesUrl}
          userName="Boomerang Joe"
          src="joe@ibm.com"
          {...headerModalProps}
        />
      </QueryClientProvider>
    );
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${baseServicesUrl}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
    mock.onPatch(`${baseServicesUrl}/users/profile`).reply(200);
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings
          baseServicesUrl={baseServicesUrl}
          userName="Boomerang Joe"
          src="joe@ibm.com"
          {...headerModalProps}
        />
      </QueryClientProvider>
    );

    const btn = await screen.findByText(/Save changes/i);
    expect(btn).toBeDisabled();
    const allToggle = screen.getByLabelText("Team Name");
    const team1Toggle = screen.getByLabelText("Team 1");
    const team2Toggle = screen.getByLabelText("Team 2");
    fireEvent.click(allToggle);
    expect(team1Toggle).toBeEnabled();
    expect(team2Toggle).toBeEnabled();
    expect(btn).toBeEnabled();
    fireEvent.click(btn);
    await waitFor(() =>
      expect(screen.queryByText(/For any questions or concerns about business personal information/i)).toBeNull()
    );
  });

  test("error state", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${baseServicesUrl}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
    mock.onPatch(`${baseServicesUrl}/users/profile`).networkError();
    const { findByText, findByLabelText, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings
          baseServicesUrl={baseServicesUrl}
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

  test("a11y", async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings
          baseServicesUrl={baseServicesUrl}
          userName="Boomerang Joe"
          src="joe@ibm.com"
          {...headerModalProps}
        />
      </QueryClientProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
