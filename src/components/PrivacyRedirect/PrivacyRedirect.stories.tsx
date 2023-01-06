import React from "react";
import PrivacyRedirect from "./PrivacyRedirect";
import { User } from "../../types";

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

export const Default = () => {
  return <PrivacyRedirect isOpen baseEnvUrl="" platformName="Boomerang" user={{ status: "active" } as User} />;
};

export const PendingDeletion = () => {
  return <PrivacyRedirect isOpen baseEnvUrl="" platformName="Boomerang" user={{ status: "pending_deletion" } as User} />;
};
