import React from "react";
import PrivacyRedirect from "./PrivacyRedirect";

export default {
  title: "Platform/PrivacyRedirect",
  component: PrivacyRedirect,
  parameters: {
    docs: {
      description: {
        component: "Header modal showing GDPR redirect for users that need to accept terms and conditions",
      },
    },
  },
};

export const Default = (args) => {
  return <PrivacyRedirect {...args} />;
};

Default.args = {
  isOpen: true,
  baseEnvUrl: "",
  platformName: "Boomerang",
  user: { status: "active" },
};

export const PendingDeletion = (args) => {
  return <PrivacyRedirect {...args} />;
};

PendingDeletion.args = {
  isOpen: true,
  baseEnvUrl: "",
  platformName: "Boomerang",
  user: { status: "pending_deletion" },
};
