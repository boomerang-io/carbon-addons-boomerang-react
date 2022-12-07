import React from "react";
import { action } from "@storybook/addon-actions";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { SideNav, SideNavLink, SideNavItems, SideNavMenu, SideNavMenuItem } from "@carbon/react";
import { Help, ServiceDesk } from "@carbon/react/icons";
import LeftSideNav from "../LeftSideNav";
import { PRIVACY_DATA } from "../PrivacyStatement/constants";
import { PROFILE_SETTINGS_DATA } from "../ProfileSettings/constants";
import UIShell from "./UIShell";

const mock = new MockAdapter(axios);

const BASE_URL = "https://www.ibm.com/services";
const BASE_ENV_URL = "https://ibm.com";

const TEAMS_DATA = {
  standardTeams: [
    {
      id: "1",
      name: "Team 1",
      displayName: "Team 1 display with a loooong long long long display name",
    },
    { id: "2", name: "Team 2", displayName: null },
  ],
  accountTeams: [
    {
      id: "11",
      isAccountTeamMember: true,
      name: "Account 1",
      projectTeams: [
        { accountTeamId: "11", id: "111", name: "Project 1 1", displayName: "Project 1 1 display" },
        { accountTeamId: "11", id: "112", name: "Project 1 2", displayName: null },
      ],
    },
    {
      id: "12",
      name: "Account 2 has an exceptionally long name",
      projectTeams: [{ accountTeamId: "12", id: "121", name: "Project 2 1", displayName: null }],
    },
  ],
};

const SERVICES_DATA = [
  { name: "Service 1 with a loooong long long long name", url: "https://ibm.com" },
  { name: "Service 2", url: "https://ibm.com" },
  { name: "Service 3", url: "https://ibm.com" },
  { name: "Service 4 with a loooong long long long name", url: "https://google.com" },
];

const withDelay = (delay: any, response: any) => (): any => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(response);
    }, delay);
  });
};

export default {
  title: "Platform/UIShell",
  component: UIShell,
  parameters: {
    docs: {
      inlineStories: false,
      description: {
        component:
          "Integrates the Header, Sidenav and Right Panel components among others into a data-driven and flexible application shell for the IBM Services Essentials platform.",
      },
    },
  },
};

export const Default = (args: any) => {
  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onGet(`${BASE_URL}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onGet(`${BASE_URL}/users/teams`).reply(withDelay(1000, [200, TEAMS_DATA]));
  mock.onGet(`${BASE_URL}/launchpad/teams/1/services`).reply(withDelay(4000, [200, SERVICES_DATA]));
  mock.onGet(`${BASE_URL}/launchpad/teams/2/services`).reply(withDelay(4000, [200, []]));
  mock.onPost(`${BASE_URL}/support/contact`).reply(200);
  return (
    <UIShell
      renderFlowDocs
      renderLogo={true}
      renderRequests={true}
      appName={"Flow"}
      platformName={"Boomerang"}
      baseLaunchEnvUrl={BASE_ENV_URL}
      baseServiceUrl={BASE_URL}
      headerConfig={{
        features: {
          "appSwitcher.enabled": true,
          "community.enabled": true,
          "notifications.enabled": true,
          "support.enabled": true,
          "feedback.enabled": true,
        },
        navigation: [
          {
            name: "Launchpad",
            url: "#",
          },
          {
            name: "Admin",
            url: "#",
          },
          {
            name: "Docs",
            url: "#",
          },
        ],
        platform: {
          name: "IBM Boomerang Platform",
          version: "5.0.0",
          signOutUrl: "#",
          communityUrl: "#",
          platformName: "IBM Boomerang",
          platformOrganization: "IBM",
        },
        platformMessage: {
          kind: "info",
          message: "Message Goes Here",
          title: "Testing Platform Title",
        },
      }}
      onTutorialClick={action("Tutorial")}
      skipToContentProps={{ href: "#id" }}
      user={{
        name: "test user",
        email: "test.user@ibm.com",
        hasConsented: true,
        status: "active",
        requestSummary: {
          requireUserAction: 0,
          submittedByUser: 17,
        },
      }}
      {...args}
    />
  );
};

export const WithCarbonSidenavAndReactRouter = () => {
  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onGet(`${BASE_URL}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onGet(`${BASE_URL}/users/teams`).reply(200, TEAMS_DATA);
  mock.onGet(`${BASE_URL}/launchpad/teams/1/services`).reply(withDelay(3000, [200, SERVICES_DATA]));
  mock.onGet(`${BASE_URL}/launchpad/teams/2/services`).reply(withDelay(3000, [200, []]));
  mock.onPatch(`${BASE_URL}/users/profile`).reply(200);
  mock.onPost(`${BASE_URL}/support/contact`).reply(200);
  return (
    <Router>
      <UIShell
        renderLogo={true}
        platformName={"Boomerang"}
        appName={""}
        baseServiceUrl={BASE_URL}
        baseLaunchEnvUrl={BASE_ENV_URL}
        headerConfig={{
          features: {
            "appSwitcher.enabled": true,
            "notifications.enabled": true,
            "support.enabled": true,
          },
          navigation: [
            {
              name: "Launchpad",
              url: "#",
            },
            {
              name: "Admin",
              url: "#",
            },
            {
              name: "Docs",
              url: "#",
            },
          ],
          platform: {
            name: "IBM Boomerang Platform",
            sendMail: true,
            version: "5.0.0",
            signOutUrl: "#",
            communityUrl: "#",
          },
          platformMessage: {
            kind: "info",
            message: "Message Goes Here",
            title: "Testing Platform Title",
          },
        }}
        renderSidenav={({ isOpen }) => (
          <LeftSideNav isOpen={isOpen}>
            <SideNav expanded isChildOfHeader aria-label="sidenav">
              <SideNavItems>
                <SideNavLink element={Link} to="/">
                  Link
                </SideNavLink>
                <SideNavLink isActive element={Link} renderIcon={ServiceDesk} to="/">
                  Active link with icon
                </SideNavLink>
                <SideNavLink element={Link} large to="/">
                  Large link
                </SideNavLink>
                <SideNavLink isActive element={Link} renderIcon={ServiceDesk} to="/" large>
                  Large active link with icon
                </SideNavLink>
                <SideNavMenu title="Menu">
                  <SideNavMenuItem element={Link} to="/">
                    Active menu item 1
                  </SideNavMenuItem>
                  <SideNavMenuItem href="/">Menu item 2</SideNavMenuItem>
                  <SideNavMenuItem href="/">Menu item 3</SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu renderIcon={ServiceDesk} title="Active menu with icon">
                  <SideNavMenuItem isActive element={Link} to="/">
                    Active menu item 1
                  </SideNavMenuItem>
                  <SideNavMenuItem href="/">Menu item 2</SideNavMenuItem>
                  <SideNavMenuItem href="/">Menu item 3</SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu title="Large menu" large>
                  <SideNavMenuItem element={Link} to="/">
                    Large menu item 1
                  </SideNavMenuItem>
                  <SideNavMenuItem element={Link} to="/">
                    Large menu item 2
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu renderIcon={ServiceDesk} title="Large active menu with icon" large>
                  <SideNavMenuItem isActive element={Link} to="/">
                    Large active menu item 1
                  </SideNavMenuItem>
                  <SideNavMenuItem href="/">Large menu item 2</SideNavMenuItem>
                  <SideNavMenuItem href="/">Large menu item 3</SideNavMenuItem>
                </SideNavMenu>
              </SideNavItems>
            </SideNav>
          </LeftSideNav>
        )}
        onTutorialClick={action("Tutorial")}
        ///@ts-ignore
        user={{
          id: "1",
          name: "test user",
          email: "test.user@ibm.com",
          requestSummary: {
            requireUserAction: 11,
            submittedByUser: 17,
          },
        }}
        renderRightPanel={{
          icon: <Help size={24} />,
          component: (
            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                marginTop: "4rem",
                width: "25rem",
              }}
            >
              Custom content behaviour
            </div>
          ),
        }}
      />
    </Router>
  );
};

WithCarbonSidenavAndReactRouter.story = {
  name: "Carbon Sidenav + React Router ",
};

export const RightPanel = () => {
  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onPost(`${BASE_URL}/support/contact`).reply(200);
  return (
    <UIShell
      isFlowApp
      renderLogo={true}
      appName={""}
      platformName={"Boomerang"}
      baseServiceUrl={BASE_URL}
      headerConfig={{
        features: {
          "notifications.enabled": true,
          "support.enabled": true,
        },
        navigation: [
          {
            name: "Launchpad",
            url: "#",
          },
          {
            name: "Admin",
            url: "#",
          },
          {
            name: "Docs",
            url: "#",
          },
        ],
        platform: {
          name: "IBM Boomerang Platform",
          version: "5.0.0",
          signOutUrl: "#",
          communityUrl: "#",
        },
        platformMessage: {
          kind: "info",
          message: "Message Goes Here",
          title: "Testing Platform Title",
        },
      }}
      onTutorialClick={action("Tutorial")}
      renderRightPanel={{
        icon: <Help size={24} />,
        component: (
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
              width: "25rem",
            }}
          >
            Custom content behaviour
          </div>
        ),
      }}
      ///@ts-ignore
      user={{
        id: "1",
        name: "test user",
        email: "test.user@ibm.com",
        hasConsented: true,
        status: "active",
        requestSummary: {
          requireUserAction: 11,
          submittedByUser: 17,
        },
      }}
    />
  );
};

export const UserNotConsented = () => {
  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  return (
    <UIShell
      renderLogo={true}
      appName={""}
      baseServiceUrl={BASE_URL}
      platformName={"Boomerang"}
      headerConfig={{
        features: {
          "notifications.enabled": true,
          "support.enabled": true,
        },
        navigation: [
          {
            name: "Launchpad",
            url: "#",
          },
          {
            name: "Admin",
            url: "#",
          },
          {
            name: "Docs",
            url: "#",
          },
        ],
        platform: {
          name: "IBM Boomerang Platform",
          version: "5.0.0",
          signOutUrl: "#",
          communityUrl: "#",
        },
        platformMessage: {
          kind: "info",
          message: "Message Goes Here",
          title: "Testing Platform Title",
        },
      }}
      onTutorialClick={action("Tutorial")}
      ///@ts-ignore
      user={{
        id: "1",
        name: "test user",
        email: "test.user@ibm.com",
        hasConsented: false,
        status: "active",
      }}
    />
  );
};

export const UserPendingDeletion = () => {
  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  return (
    <UIShell
      renderLogo={true}
      platformName={"Boomerang"}
      appName={""}
      baseServiceUrl={BASE_URL}
      headerConfig={{
        features: {
          "notifications.enabled": true,
          "support.enabled": true,
        },
        navigation: [
          {
            name: "Launchpad",
            url: "#",
          },
          {
            name: "Admin",
            url: "#",
          },
          {
            name: "Docs",
            url: "#",
          },
        ],
        platform: {
          name: "IBM Boomerang Platform",
          version: "5.0.0",
          signOutUrl: "#",
          communityUrl: "#",
        },
        platformMessage: {
          kind: "info",
          message: "Message Goes Here",
          title: "Testing Platform Title",
        },
      }}
      onTutorialClick={action("Tutorial")}
      ///@ts-ignore
      user={{
        id: "1",
        name: "test user",
        email: "test.user@ibm.com",
        hasConsented: false,
        status: "pending_deletion",
      }}
    />
  );
};

export const EmptyState = () => {
  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  return <UIShell />;
};
