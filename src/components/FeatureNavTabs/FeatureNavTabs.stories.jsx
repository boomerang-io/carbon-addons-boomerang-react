import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { default as Tabs } from "./index";
import { default as Tab } from "../FeatureNavTab";

export default {
  title: "Features/FeatureNavTabs",
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          "Page feature navigation tabs that utilize react-router. Useful for having tabs as pages and linked to the URL path.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
        <Story />
      </Router>
    ),
  ],
};

export const Default = () => {
  return (
    <Tabs>
      <Tab label="Services" to="/services" />
      <Tab label="Members" to="/members" />
      <Tab label="Service Requests" to="/service-requests" />
      <Tab label="Members Requests" to="/members-requests" />
      <Tab label="Settings" to="/settings" />
    </Tabs>
  );
};

export const Loading = () => {
  return (
    <Tabs>
      <Tab label="Services" to="/services" isLoading />
      <Tab label="Members" to="/members" />
      <Tab label="Service Requests" to="/service-requests" />
      <Tab label="Members Requests" to="/members-requests" isLoading />
      <Tab label="Settings" to="/settings" />
    </Tabs>
  );
};
