import React from "react";

import ErrorComponent from "./index";

export default {
  title: "ErrorMessage",
};

export const Default = () => {
  return <ErrorComponent />;
};

Default.story = {
  name: "default",
};
