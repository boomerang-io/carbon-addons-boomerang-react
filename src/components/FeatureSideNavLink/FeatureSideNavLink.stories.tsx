import React from "react";
import { Router } from "react-router-dom";
import FeatureSideNavLink from "./FeatureSideNavLink";
import { Rocket } from "@carbon/react/icons";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

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
    <Router history={history}>
      <FeatureSideNavLink to="#" children="TESTING" />
    </Router>
  );
};

export const Icon = () => {
  return (
    <Router history={history}>
      <FeatureSideNavLink to="#" children="Boomerang" iconProps={{ "data-testid": "rocket-icon" }} icon={Rocket} />
    </Router>
  );
};

export const CustomContent = () => {
  return (
    <Router history={history}>
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
    <Router history={history}>
      <FeatureSideNavLink to="#" children="Boomerang" hasDivider />
    </Router>
  );
};
