import React from "react";
import SignOut from "./SignOut";
import { headerModalProps } from "../../internal/helpers";

export default {
  title: "Platform/SignOut",
  component: SignOut,
};

export const Default = () => {
  return <SignOut signOutLink="https://ibm.com" {...headerModalProps} />;
};
