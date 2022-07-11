import React from "react";
import ErrorFullPage from "./index";

const statusUrl = "/support/status";

export default {
  title: "ErrorFullPage",
};

export const Default = () => {
  return <ErrorFullPage statusUrl={statusUrl} />;
};

Default.story = {
  name: "default",
};

export const Boomerang = () => {
  return <ErrorFullPage theme="boomerang" statusUrl={statusUrl} />;
};

Boomerang.story = {
  name: "boomerang",
};
