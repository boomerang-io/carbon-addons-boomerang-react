/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import ProfileSettings from "./ProfileSettings";
import MockAdapter from "axios-mock-adapter";
import { PROFILE_SETTINGS_DATA } from "./constants";
import { headerModalProps } from "../../internal/helpers";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default {
  title: "Platform/ProfileSettings",
  component: ProfileSettings,
  parameters: {
    info: {
      text: `
      User profile settings component to set the teams that are visible in the platform.
          `,
    },
  },
};

export const Default = (args) => {
  const mock = new MockAdapter(axios);
  mock.onGet("https://ibm.com/launchpad/user").reply(200, PROFILE_SETTINGS_DATA);
  mock.onPatch("https://ibm.com/users/profile").reply(200);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ width: "15rem", background: "var(--cds-bmrg-primary" }}>
        <ProfileSettings {...args} />
      </div>
    </QueryClientProvider>
  );
};

Default.args = {
  baseServicesUrl: "https://ibm.com",
  src: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
  userName: "Boomerang Ada",
  ...headerModalProps,
};
