import React from "react";
import SignOut from "./SignOut";
import { headerModalProps } from "../../internal/helpers";

export default {
  title: "Platform/SignOut",
  component: SignOut,
  parameters: {
    info: {
      text: `
    Sign out component to handle users signing out of the platform
        `,
    },
  },
};

export const Default = (args) => {
  return <SignOut {...args} />;
};

Default.args = {
  signOutLink: "https://ibm.com",
  ...headerModalProps,
};
