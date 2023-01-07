/* eslint-disable no-script-url */
import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter as Router, Link } from "react-router-dom";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import { SideNav, SideNavLink, SideNavItems, SideNavMenu, SideNavMenuItem } from "@carbon/react";
import { ArrowRight, Help, ServiceDesk } from "@carbon/react/icons";
import { PRIVACY_DATA } from "../PrivacyStatement/constants";
import { PROFILE_SETTINGS_DATA } from "../ProfileSettings/constants";
import UIShell from "./UIShell";
import { User } from "../../types";

const mock = new MockAdapter(axios);

const BASE_SERVICE_URL = "https://www.ibm.com/services";
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

const withDelay = (delay: number, response: any) => (): Promise<any> => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(response);
    }, delay);
  });
};

export function UIShellKitchenSink() {
  mock.onGet(`${BASE_SERVICE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onGet(`${BASE_SERVICE_URL}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onGet(`${BASE_SERVICE_URL}/users/teams`).reply(200, TEAMS_DATA);
  mock.onGet(`${BASE_SERVICE_URL}/launchpad/teams/1/services`).reply(withDelay(3000, [200, SERVICES_DATA]));
  mock.onGet(`${BASE_SERVICE_URL}/launchpad/teams/2/services`).reply(withDelay(3000, [200, []]));
  mock.onPatch(`${BASE_SERVICE_URL}/users/profile`).reply(200);
  mock.onPost(`${BASE_SERVICE_URL}/support/contact`).reply(200);
  return (
    <Router>
      <UIShell
        productName="Flow"
        config={{
          features: {
            "appSwitcher.enabled": true,
            "consent.enabled": true,
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
            baseEnvUrl: BASE_ENV_URL,
            baseServicesUrl: BASE_SERVICE_URL,
            name: "Boomerang",
            platformName: "Boomerang",
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
        leftPanel={({ close, isOpen, navLinks }) => (
          <SideNav expanded={isOpen} isChildOfHeader aria-label="sidenav" isPersistent={false} onOverlayClick={close}>
            <SideNavItems>
              {navLinks}
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
        )}
        user={
          {
            id: "1",
            name: "Rick Deckard",
            email: "rdeckard@ibm.com",
            requestSummary: {
              requireUserAction: 11,
              submittedByUser: 17,
            },
          } as User
        }
        rightPanel={{
          icon: <ArrowRight size={20} />,
          component: (
            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                marginTop: "4rem",
              }}
            >
              <h1>Right panel</h1>
            </div>
          ),
        }}
        supportMenuItems={[<HeaderMenuItem onClick={() => console.log("hello")} type="button" text="Tutorial" key="tutorial"/>]}
        profileMenuItems={[
          <HeaderMenuItem kind="external" href={`https://ibm.com`} type="link" text="App Policy" icon={<Help />} key="app policy" />,
        ]}
      />
    </Router>
  );
}

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
  excludeStories: /UIShell.*/
};

export const UIShellDefault = (args) => {
  mock.onGet(`${BASE_SERVICE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onGet(`${BASE_SERVICE_URL}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onGet(`${BASE_SERVICE_URL}/users/teams`).reply(withDelay(1000, [200, TEAMS_DATA]));
  mock.onGet(`${BASE_SERVICE_URL}/launchpad/teams/1/services`).reply(withDelay(4000, [200, SERVICES_DATA]));
  mock.onGet(`${BASE_SERVICE_URL}/launchpad/teams/2/services`).reply(withDelay(4000, [200, []]));
  mock.onPost(`${BASE_SERVICE_URL}/support/contact`).reply(200);
  return (
    <UIShell
      config={{
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
            url: "javascript:voido(0)",
          },
          {
            name: "Admin",
            url: "javascript:voido(0)",
          },
          {
            name: "Docs",
            url: "javascript:voido(0)",
          },
        ],
        platform: {
          name: "Boomerang",
          version: "5.0.0",
          signOutUrl: "#",
          communityUrl: "#",
          platformName: "Boomerang",
          platformOrganization: "IBM",
        },
        platformMessage: {
          kind: "info",
          message: "Message Goes Here",
          title: "Testing Platform Title",
        },
      }}
      onTutorialClick={() => console.log("tutorial")}
      skipToContentProps={{ href: "#id" }}
      user={{
        name: "Rick Deckard",
        email: "rdeckard@ibm.com",
        hasConsented: true,
        status: "active",
        requestSummary: {
          requireUserAction: 0,
          submittedByUser: 17,
        },
      }}
      {...args}
      onMenuClick={null}
      renderSidenav={null}
    />
  );
};



export const UIShellUserNotConsented = () => {
  mock.onGet(`${BASE_SERVICE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  return (
    <UIShell
      config={{
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
          baseEnvUrl: "https://ibm.com",
          baseServicesUrl: BASE_SERVICE_URL,
          platformName: "IBM Boomerang Platform",
          name: "IBM Boomerang Platform",
          version: "5.0.0",
          signOutUrl: "javascript:void(0)",
          communityUrl: "javascript:void(0)",
        },
        platformMessage: {
          kind: "info",
          message: "Message Goes Here",
          title: "Testing Platform Title",
        },
      }}
      user={
        {
          id: "1",
          name: "Rick Deckard",
          email: "rdeckard@ibm.com",
          hasConsented: false,
          status: "active",
        } as User
      }
    />
  );
};

export const UIShellUserPendingDeletion = () => {
  mock.onGet(`${BASE_SERVICE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  return (
    <UIShell
      config={{
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
          baseEnvUrl: "https://ibm.com",
          baseServicesUrl: BASE_SERVICE_URL,
          platformName: "IBM Boomerang Platform",
          name: "IBM Boomerang Platform",
          version: "5.0.0",
          signOutUrl: "javascript:void(0)",
          communityUrl: "javascript:void(0)",
        },
        platformMessage: {
          kind: "info",
          message: "Message Goes Here",
          title: "Testing Platform Title",
        },
      }}
      user={
        {
          id: "1",
          name: "Rick Deckard",
          email: "rdeckard@ibm.com",
          hasConsented: false,
          status: "pending_deletion",
        } as User
      }
    />
  );
};

export const Default = () => {
  return <UIShellDefault />;
}

export const KitchenSink = () => {
  return <UIShellKitchenSink />;
};

export const UserNotConsented = () => {
  return <UIShellUserNotConsented />
}

export const UserPendingDeletion = () => {
  return <UIShellUserPendingDeletion />
}

export const EmptyState = () => {
  mock.onGet(`${BASE_SERVICE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  return <UIShell productName="Boomerang" />;
};
