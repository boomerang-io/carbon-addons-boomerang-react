import React from "react";
import Feedback from "./Feedback";
import { headerModalProps } from "../../internal/helpers";

export default {
  title: "Platform/Feedback",
  component: Feedback,
  parameters: {
    docs: {
      description: {
        component: "Header modal with details on providing feedback to the platform",
      },
    },
  },
};

export const Default = () => {
  return (
    <Feedback
      platformName="Boomerang"
      sendIdeasUrl="https://ideas.ibm.com"
      platformOrganization="IBM"
      {...headerModalProps}
    />
  );
};
