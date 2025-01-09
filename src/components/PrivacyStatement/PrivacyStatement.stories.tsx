/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import MockAdapter from "axios-mock-adapter";
import PrivacyStatement from "./PrivacyStatement";
import { PRIVACY_DATA } from "./constants";
import { serviceUrl } from "../../config/servicesConfig";
import { headerModalProps } from "../../internal/helpers";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
const baseServicesUrl = "https://useboomerang.io/services";

export default {
  title: "Platform/PrivacyStatement",
  component: PrivacyStatement,
  parameters: {
    info: {
      text: `
Privacy statement component is for displaying the user agreement form and allowing the user to delete their account from the Boomerang platform. 
          `,
    },
  },
};

export const Default = (args) => {
  const mock = new MockAdapter(axios);
  mock.onGet(serviceUrl.getStatement({ baseServicesUrl })).reply(200, PRIVACY_DATA);
  mock.onPut(serviceUrl.resourceUserConsent({ baseServicesUrl })).reply(200);
  return (
    <QueryClientProvider client={queryClient}>
      <PrivacyStatement {...args} />
    </QueryClientProvider>
  );
};

Default.args = {
  baseServicesUrl: baseServicesUrl,
  ...headerModalProps,
};
