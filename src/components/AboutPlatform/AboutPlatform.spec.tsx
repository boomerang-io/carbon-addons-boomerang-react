/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/

import React from "react";
import axios from "axios";
import { expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "react-query";
import { render } from "@testing-library/react";
// import { axe } from "jest-axe";
import MockAdapter from "axios-mock-adapter";
import AboutPlatform from "./AboutPlatform";
import { headerModalProps } from "../../internal/helpers";

const BASE_SERVICES_URL = "http://localhost:8080/services";

const PLATFORM_VERSION_DATA = {
  version: "25.09.0",
  assistantVersion: "25.09.0",
  agentsVersion: "25.09.0",
  scribeFlowVersion: "Cannot Retrieve Version Number. Try Again Later.",
  platformVersion: "25.09",
  platformVersionError: true,
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

describe("AboutPlatform", () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${BASE_SERVICES_URL}/platform/version`).reply(200, PLATFORM_VERSION_DATA);
  test("snapshot", () => {
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <AboutPlatform name="IBM Consulting Advantage" baseServicesUrl={BASE_SERVICES_URL} {...headerModalProps} />
      </QueryClientProvider>
    );
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${BASE_SERVICES_URL}/platform/version`).reply(200, PLATFORM_VERSION_DATA);
    // Render new instance in every test to prevent leaking state
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <AboutPlatform name="IBM Consulting Advantage" baseServicesUrl={BASE_SERVICES_URL} {...headerModalProps} />
      </QueryClientProvider>
    );
    const version = getByText(/Cannot Retrieve Version Number/i);
    const organization = getByText(/IBM Consulting Advantage/i);
    expect(version).toBeInTheDocument();
    expect(organization).toBeInTheDocument();
  });

  // test("a11y", async () => {
  //   const { container } = render(<AboutPlatform name="IBM Consulting Advantage" version="1.2.1" assistantVersion="1.0.0" agentsVersion="1.0.0" scribeFlowVersion="1.0.0" {...headerModalProps} />);
  //   const results = await axe(container);
  //   expect(results).toHaveNoViolations();
  // });
});
