/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { ToastNotification } from "@carbon/react";

export const deprecatedStoryTitle = "️⛔ Deprecation Notice ";

type OwnProps = {
  deprecatedComponentName: string;
  replacementComponentName?: string;
};

const defaultProps = {
  replacementComponentName: "",
};

type Props = OwnProps & typeof defaultProps;

const DeprecationNotice = ({ deprecatedComponentName, replacementComponentName }: Props) => (
  <ToastNotification
    caption={
      replacementComponentName
        ? `Refactor usages of ${deprecatedComponentName} to use ${replacementComponentName} instead.`
        : null
    }
    hideCloseButton
    iconDescription=""
    kind="warning"
    notificationType="toast"
    role="alert"
    style={{
      marginBottom: ".5rem",
      minWidth: "30rem",
    }}
    subtitle={`${deprecatedComponentName} has been deprecated and will be removed in the next major version of carbon-addons-boomerang-react.`}
    timeout={0}
    title="Deprecation Notice"
  />
);
DeprecationNotice.defaultProps = defaultProps;

export default DeprecationNotice;
