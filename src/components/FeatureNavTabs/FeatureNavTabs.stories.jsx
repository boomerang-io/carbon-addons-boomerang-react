import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { default as Tabs } from "./index";
import { default as Tab } from "../FeatureNavTab";

export default {
  title: "Features/FeatureNavTabs",
  component: Tabs
};

export const Default = () => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
      <Tabs>
        <Tab label="Services" to="/services" />
        <Tab label="Members" to="/members" />
        <Tab label="Service Requests" to="/service-requests" />
        <Tab label="Members Requests" to="/members-requests" />
        <Tab label="Settings" to="/settings" />
      </Tabs>
    </Router>
  );
};

Default.story = {
  name: "default",
};

export const Loading = () => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
      <Tabs>
        <Tab label="Services" to="/services" isLoading />
        <Tab label="Members" to="/members" />
        <Tab label="Service Requests" to="/service-requests" />
        <Tab label="Members Requests" to="/members-requests" isLoading />
        <Tab label="Settings" to="/settings" />
      </Tabs>
    </Router>
  );
};

Loading.story = {
  name: "loading",
};
