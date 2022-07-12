import React from "react";
import { Router } from "react-router-dom";
import FeatureSideNavLink from "./FeatureSideNavLink";
import { Rocket } from "@carbon/react/icons";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default {
  title: "FeatureSideNavLink",
};

export const DefaultFeatureSidenavLink = () => {
  return (
    <Router history={history}>
      <FeatureSideNavLink to="/test" children="TESTING" />
    </Router>
  );
};

export const ActiveFeatureSidenavLink = () => {
  return (
    <Router history={history}>
      <FeatureSideNavLink to="/" children="TESTING" />
    </Router>
  );
};

export const FeatureSidenavLinkWithIcon = () => {
  return (
    <Router history={history}>
      <FeatureSideNavLink to="/test" children="TESTING" iconProps={{ "data-testid": "rocket-icon" }} icon={Rocket} />
    </Router>
  );
};

FeatureSidenavLinkWithIcon.story = {
  name: "Feature Sidenav Link with Icon",
};

export const FeatureSidenavLinkWithCustomContent = () => {
  return (
    <Router history={history}>
      <FeatureSideNavLink to="/test">
        <div>
          <p>text1</p>
          <p>text2</p>
        </div>
      </FeatureSideNavLink>
    </Router>
  );
};

FeatureSidenavLinkWithCustomContent.story = {
  name: "Feature Sidenav Link with custom content",
};

export const FeatureSidenavLinkWithDivider = () => {
  return (
    <Router history={history}>
      <FeatureSideNavLink to="/test" children="TESTING" hasDivider />
    </Router>
  );
};

FeatureSidenavLinkWithDivider.story = {
  name: "Feature Sidenav Link with divider",
};
