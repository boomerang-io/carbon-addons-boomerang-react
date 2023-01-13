import React from "react";
import { expect, test, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { serviceUrl } from "../../config/servicesConfig";
import PrivacyStatement from "./PrivacyStatement";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { axe } from "jest-axe";
import { PRIVACY_DATA } from "./constants";
import { headerModalProps } from "../../internal/helpers";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const baseServicesUrl = "https://useboomerang.io";
const { reload } = window.location;

beforeAll(() => {
  Object.defineProperty(window, "location", {
    writable: true,
    value: { reload: vi.fn() },
  });
});

afterAll(() => {
  window.location.reload = reload;
});

test("Privacy Statement - snapshot", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${baseServicesUrl}/users/consents`).reply(200, PRIVACY_DATA);
  const { baseElement } = render(
    <QueryClientProvider client={queryClient}>
      <PrivacyStatement baseServicesUrl={baseServicesUrl} {...headerModalProps} />
    </QueryClientProvider>
  );
  expect(baseElement).toMatchSnapshot();
});

test("Privacy Statement - error state", async () => {
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
  mock.onGet(serviceUrl.getStatement({ baseServicesUrl })).reply(200, PRIVACY_DATA);
  mock.onPut(serviceUrl.resourceUserConsent({ baseServicesUrl })).networkError();
  const { getByText, findByRole } = render(
    <QueryClientProvider client={queryClient}>
      <PrivacyStatement baseServicesUrl={baseServicesUrl} {...headerModalProps} />
    </QueryClientProvider>
  );
  const deleteButton = await findByRole("button", { name: /Request account deletion/i });
  fireEvent.click(deleteButton);
  const confirmButton = getByText(/Delete my account/i);
  fireEvent.click(confirmButton);
  await waitFor(() => expect(getByText(/Failed to receive deletion request. Please try again./i)).toBeInTheDocument());
});

test("Privacy Statement - success", async () => {
  /**
   *
   */
  const mock = new MockAdapter(axios);
  mock.onGet(`${baseServicesUrl}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onPut(`${baseServicesUrl}/users/consent`).reply(200);

  const { getByRole, findByRole } = render(
    <QueryClientProvider client={queryClient}>
      <PrivacyStatement baseServicesUrl={baseServicesUrl} {...headerModalProps} />
    </QueryClientProvider>
  );

  const deleteButton = await findByRole("button", { name: /Request account deletion/i });
  fireEvent.click(deleteButton);

  const confirmButton = getByRole("button", { name: /Delete my account/i });
  fireEvent.click(confirmButton);
});

test("Privacy Statement - a11y", async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <PrivacyStatement baseServicesUrl={baseServicesUrl} {...headerModalProps} />
    </QueryClientProvider>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
