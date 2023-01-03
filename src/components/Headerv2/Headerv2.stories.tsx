import React from "react";
import Headerv2 from "./index";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Platform/Headerv2",
  component: Headerv2,
  parameters: {
    docs: {
      inlineStories: false,
      description: {
        component:
          "Sidenav that works in conjunction with the Header. Uses [Carbon UIShell sidenav](https://react.carbondesignsystem.com/?path=/docs/components-ui-shell--fixed-side-nav) components",
      },
    },
  },
};

export const Default = () => {
  return (
    <Router>
      <Headerv2 />
    </Router>
  );
};
