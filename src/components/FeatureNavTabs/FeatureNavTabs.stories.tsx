/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { default as Tabs } from "./index";
import { default as Tab } from "../FeatureNavTab";

export default {
  title: "Features/FeatureNavTabs",
  component: Tabs,
  subcomponents: { Tab },
  parameters: {
    docs: {
      description: {
        component:
          "Navigation tabs that utilize react-router NavLinks. Useful for when you want tabs to function as links.",
      },
    },
  },
  decorators: [(story) => <Router>{story()}</Router>],
};

export const Default = (args) => {
  return (
    <Tabs contained ariaLabel="Team navigation" {...args}>
      <Tab disabled label="Services" to="/services" />
      <Tab label="Members" to="/members" />
      <Tab label="Service Requests" to="/service-requests" />
      <Tab label="Members Requests" to="/members-requests" />
      <Tab label="Settings" to="/settings" />
    </Tabs>
  );
};

export const Loading = (args) => {
  return (
    <Tabs contained ariaLabel="Team navigation" {...args}>
      <Tab label="Services" to="/services" isLoading />
      <Tab label="Members" to="/members" />
      <Tab label="Service Requests" to="/service-requests" />
      <Tab label="Members Requests" to="/members-requests" isLoading />
      <Tab label="Settings" to="/settings" />
    </Tabs>
  );
};
