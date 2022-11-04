import { expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'jest... Remove this comment to see the full error message
import { axe } from "jest-axe";
import ProfileSettings from "./ProfileSettings";
import { PROFILE_SETTINGS_DATA } from "./constants";

const baseServiceUrl = "http://boomerang.com";

const queryClient = new QueryClient({
  // @ts-expect-error TS(2322): Type '{ refetchOnWindowFocus: false; throwOnError:... Remove this comment to see the full error message
  defaultOptions: { queries: { refetchOnWindowFocus: false, throwOnError: false }, mutations: { throwOnError: true } },
});

test("Profile Settings success", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${baseServiceUrl}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onPatch(`${baseServiceUrl}/users/profile`).reply(200);
  const { findByText, getByLabelText, getByText, queryByText } = render(
    <QueryClientProvider client={queryClient}>
      <ProfileSettings baseServiceUrl={baseServiceUrl} userName="Boomerang Joe" src="joe@ibm.com" />
    </QueryClientProvider>
  );
  const userBtn = getByText("Boomerang Joe");
  fireEvent.click(userBtn);
  const btn = await findByText(/Save changes/i);
  (expect(btn) as any).toBeDisabled();
  const allToggle = getByLabelText("Team Name");
  const team1Toggle = getByLabelText("Team 1");
  const team2Toggle = getByLabelText("Team 2");
  fireEvent.click(allToggle);
  (expect(team1Toggle) as any).toBeEnabled();
  (expect(team2Toggle) as any).toBeEnabled();
  (expect(btn) as any).toBeEnabled();
  fireEvent.click(btn);
  await waitFor(() =>
    expect(queryByText(/For any questions or concerns about business personal information/i)).toBeNull()
  );
});

test("Profile Settings error", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${baseServiceUrl}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onPatch(`${baseServiceUrl}/users/profile`).networkError();
  const { findByText, findByLabelText, getByText } = render(
    <QueryClientProvider client={queryClient}>
      <ProfileSettings baseServiceUrl={baseServiceUrl} userName="Boomerang Joe" src="joe@ibm.com" />
    </QueryClientProvider>
  );
  const userBtn = getByText("Boomerang Joe");
  fireEvent.click(userBtn);
  const allToggle = await findByLabelText(/Team Name/i);
  fireEvent.click(allToggle);
  const btn = await findByText(/Save changes/i);
  fireEvent.click(btn);
  await waitFor(() => (expect(getByText(/try again/i)) as any).toBeInTheDocument());
});

test("Profile Settings accessibility", async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <ProfileSettings baseServiceUrl={baseServiceUrl} userName="Boomerang Joe" src="joe@ibm.com" />
    </QueryClientProvider>
  );
  const results = await axe(container);
  (expect(results) as any).toHaveNoViolations();
});
