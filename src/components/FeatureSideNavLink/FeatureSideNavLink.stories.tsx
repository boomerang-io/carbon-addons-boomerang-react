/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import FeatureSideNavLink from "./FeatureSideNavLink";
import { Launch } from "@carbon/react/icons";


export default {
  title: "Features/FeatureSideNavLink",
  component: FeatureSideNavLink,
  parameters: {
    docs: {
      description: {
        component: "Link used in FeatureSideNav component. Uses react-router NavLink.",
      },
    },
  },
};

export const Default = () => {
  return (
    <Router>
      <FeatureSideNavLink to="#" children="TESTING" />
    </Router>
  );
};

export const Icon = () => {
  return (
    <Router>
      <FeatureSideNavLink to="#" children="Boomerang" iconProps={{ "data-testid": "rocket-icon" }} icon={Launch} />
    </Router>
  );
};

export const CustomContent = () => {
  return (
    <Router>
      <FeatureSideNavLink to="#">
        <div>
          <p>text1</p>
          <p>text2</p>
        </div>
      </FeatureSideNavLink>
    </Router>
  );
};

export const Divider = () => {
  return (
    <Router>
      <FeatureSideNavLink to="#" children="Boomerang" hasDivider />
    </Router>
  );
};
