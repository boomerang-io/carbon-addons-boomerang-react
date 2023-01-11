/* eslint-disable no-script-url */
import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Server } from "mock-socket";
import { BrowserRouter as Router, Link } from "react-router-dom";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import { Modal, SideNav, SideNavLink, SideNavItems, SideNavMenu, SideNavMenuItem } from "@carbon/react";
import { Help, OpenPanelRight, ServiceDesk } from "@carbon/react/icons";
import { PRIVACY_DATA } from "../PrivacyStatement/constants";
import { PROFILE_SETTINGS_DATA } from "../ProfileSettings/constants";
import UIShell from "./UIShell";
import { User } from "../../types";

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
  excludeStories: /UIShell.*/,
};

const mock = new MockAdapter(axios);
const BASE_ENV_URL = "http://localhost:6006";
const BASE_SERVICES_URL = "http://localhost:8080/services";

const mockSocketUrl = "ws://localhost:8080/services/notifications/ws";
const mockServer = new Server(mockSocketUrl);
const notificationsObj: any = {
  notifications: [
    {
      creator: "Boomerang CICD",
      date: "2022-02-15T12:47:47.655+00:00",
      detail: "Outage description test for the following service(s): Boomerang Flow,Boomerang CICD",
      eventId: "620b9f7e99fcb715cbc222b3",
      id: "620ba0f354f1b83f5077dec6",
      priority: "highest",
      read: false,
      severity: "INFO",
      target: "user",
      title: "Resolved",
      type: "notification",
      userId: "61730018ae92414d2bd15b4c",
    },
  ],
};

mockServer.on("connection", (socket: any) => {
  socket.on("message", () => {
    setInterval(() => {
      notificationsObj.notifications[0].id = Math.round(Math.random() * 100000000); // Change for each one
      socket.send(JSON.stringify(notificationsObj));
    }, 10000);
  });
});

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

function MainContent(props: { children?: React.ReactNode }) {
  return (
    <div id="main" style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "2rem" }}>
      <h1>App name</h1>
      <p>All about your great app</p>
      {props.children}
    </div>
  );
}

export const UIShellDefault = (args) => {
  mock.onGet(`${BASE_SERVICES_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onGet(`${BASE_SERVICES_URL}/users/teams`).reply(withDelay(1000, [200, TEAMS_DATA]));
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/teams/1/services`).reply(withDelay(4000, [200, SERVICES_DATA]));
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/teams/2/services`).reply(withDelay(4000, [200, []]));
  mock.onPost(`${BASE_SERVICES_URL}/support/contact`).reply(200);

  return (
    <>
      <UIShell
        config={{
          features: {
            "appSwitcher.enabled": true,
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
            baseEnvUrl: BASE_ENV_URL,
            baseServicesUrl: BASE_SERVICES_URL,
            name: "Boomerang",
            version: "4.0.0",
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
        skipToContentProps={{ href: "#id" }}
        user={
          {
            name: "Rick Deckard",
            email: "rdeckard@ibm.com",
            hasConsented: true,
            status: "active",
            requestSummary: {
              requireUserAction: 0,
              submittedByUser: 17,
            },
          } as User
        }
        {...args}
      />
      <MainContent />
    </>
  );
};

export function UIShellKitchenSink(args) {
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/teams/1/services`).reply(withDelay(3000, [200, SERVICES_DATA]));
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/teams/2/services`).reply(withDelay(3000, [200, []]));
  mock.onGet(`${BASE_SERVICES_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onGet(`${BASE_SERVICES_URL}/users/teams`).reply(200, TEAMS_DATA);
  mock.onPatch(`${BASE_SERVICES_URL}/users/profile`).reply(200);
  mock.onPost(`${BASE_SERVICES_URL}/support/contact`).reply(200);
  mock.onPut(`${BASE_SERVICES_URL}/notifications`).reply(200, {});
  const [isTutorialOpen, setIsTutorialOpen] = React.useState(false);
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
            baseServicesUrl: BASE_SERVICES_URL,
            name: "Boomerang",
            platformName: "Boomerang",
            sendMail: true,
            version: "4.0.0",
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
          <SideNav
            addFocusListeners={false}
            expanded={isOpen}
            isChildOfHeader
            aria-label="sidenav"
            isPersistent={false}
            onOverlayClick={close}
          >
            <SideNavItems>
              {navLinks}
              <button onClick={close}></button>
              <SideNavLink element={Link} to="#">
                Link
              </SideNavLink>
              <SideNavLink isActive element={Link} renderIcon={ServiceDesk} to="#">
                Active link with icon
              </SideNavLink>
              <SideNavLink element={Link} large to="#">
                Large link
              </SideNavLink>
              <SideNavLink isActive element={Link} renderIcon={ServiceDesk} to="#" large>
                Large active link with icon
              </SideNavLink>
              <SideNavMenu title="Menu">
                <SideNavMenuItem element={Link} to="#">
                  Active React Router menu link 1
                </SideNavMenuItem>
                <SideNavMenuItem href="#">re link 2</SideNavMenuItem>
                <SideNavMenuItem href="#">Menu link 3</SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={ServiceDesk} title="Active menu with icon">
                <SideNavMenuItem isActive element={Link} to="#">
                  Active menu item 1
                </SideNavMenuItem>
                <SideNavMenuItem href="#">Menu item 2</SideNavMenuItem>
                <SideNavMenuItem href="#">Menu item 3</SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu title="Large menu" large>
                <SideNavMenuItem element={Link} to="#">
                  Large React Router menu link 1
                </SideNavMenuItem>
                <SideNavMenuItem element={Link} to="#">
                  Large menu item 2
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={ServiceDesk} title="Large active menu with icon" large>
                <SideNavMenuItem isActive element={Link} to="#">
                  Large active menu item 1
                </SideNavMenuItem>
                <SideNavMenuItem href="#">Large menu item 2</SideNavMenuItem>
                <SideNavMenuItem href="#">Large menu item 3</SideNavMenuItem>
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
          icon: <OpenPanelRight size={20} />,
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
        skipToContentProps={{ href: "#main" }}
        supportMenuItems={[
          <HeaderMenuItem onClick={() => setIsTutorialOpen(true)} type="button" text="Tutorial" key="tutorial" />,
        ]}
        profileMenuItems={[
          <HeaderMenuItem
            kind="external"
            href={`https://ibm.com`}
            type="link"
            text="App Policy"
            icon={<Help />}
            key="app policy"
          />,
        ]}
        {...args}
      />
      <MainContent>
        <Modal
          open={isTutorialOpen}
          onRequestClose={() => setIsTutorialOpen(false)}
          modalHeading="Tutorial"
          modalLabel="Learn about App"
          primaryButtonText="Next"
          secondaryButtonText="Cancel"
        />
      </MainContent>
    </Router>
  );
}

export const UIShellUserNotConsented = (args) => {
  mock.onGet(`${BASE_SERVICES_URL}/users/consents`).reply(200, PRIVACY_DATA);
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
          baseEnvUrl: BASE_ENV_URL,
          baseServicesUrl: BASE_SERVICES_URL,
          platformName: "Boomerang Platform",
          name: "Boomerang Platform",
          version: "4.0.0",
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
      {...args}
    />
  );
};

export const UIShellUserPendingDeletion = (args) => {
  mock.onGet(`${BASE_SERVICES_URL}/users/consents`).reply(200, PRIVACY_DATA);
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
          baseServicesUrl: BASE_SERVICES_URL,
          platformName: "Boomerang Platform",
          name: "Boomerang Platform",
          version: "4.0.0",
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
      {...args}
    />
  );
};

export const Default = (args) => {
  return <UIShellDefault {...args} />;
};

export const KitchenSink = (args) => {
  return <UIShellKitchenSink {...args} />;
};

export const UserNotConsented = (args) => {
  return <UIShellUserNotConsented {...args} />;
};

export const UserPendingDeletion = (args) => {
  return <UIShellUserPendingDeletion {...args} />;
};

export const EmptyState = (args) => {
  mock.onGet(`${BASE_SERVICES_URL}/users/consents`).reply(200, PRIVACY_DATA);
  return <UIShell productName="Boomerang" {...args} />;
};
