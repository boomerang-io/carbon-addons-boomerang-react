/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


/* eslint-disable no-script-url */
import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AdvantageSideNav from "../AdvantageSideNav";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import { Button, Modal, SideNav, SideNavDivider, SideNavLink, SideNavItems, SideNavMenu, SideNavMenuItem } from "@carbon/react";
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

const BASE_ENV_URL = "http://localhost:6006";
const BASE_SERVICES_URL = "http://localhost:8080/services";

const TEAMS_DATA = {
  standardTeams: [
    {
      id: "1",
      name: "Team 1",
      displayName: "Team 1 display with a loooong long long long display name",
      services: [
        {
          name: "Test Service 1",
          url: "test1.com"
        },
        {
          name: "Test Service 2",
          url: "test2.com"
        }
      ]
    },
    { id: "2", name: "Team 2", displayName: null, services: [] },
  ],
  personalTeam: [
    {
      id: "111",
      name: "Personal Workspace",
      services: [],
      displayName: "Personal Workspace"
    }
  ],
  accountTeams: [
    {
      id: "11",
      isAccountTeamMember: true,
      name: "Account 1",
      projectTeams: [
        { accountTeamId: "11", id: "111", name: "Project 1 1", displayName: "Project 1 1 display", services: [] },
        { accountTeamId: "11", id: "112", name: "Project 1 2", displayName: null, services: [] },
      ],
    },
    {
      id: "12",
      name: "Account 2 has an exceptionally long name",
      projectTeams: [{ accountTeamId: "12", id: "121", name: "Project 2 1", displayName: null, services: [] }],
    },
  ],
};

const SERVICES_DATA = [
  { name: "Service 1 with a loooong long long long name", url: "https://ibm.com" },
  { name: "Service 2", url: "https://ibm.com" },
  { name: "Service 3", url: "https://ibm.com" },
  { name: "Service 4 with a loooong long long long name", url: "https://google.com" },
];

const sidenavProps = {
  homeLink: "http://test.home.com",
  assistantLink: "http://test.ai.com",
  joinCreateTrigger: () => console.log("Trigger modal if exists"),
  teams: [
    {id:"a11", name: "Team1", privateTeam: true, services: [{url: 1, name: "service1 with a really long name so we can test elipsis"}, {url:2, name:"service12"}, {url:3, name:"service13"}, {url: 4, name: "service2"}, {url:5, name:"service22"}, {url: 4, name: "service2"}, {url:5, name:"service22"}]},
    {id:"platform-uishell--left-panel", name: "Team2", privateTeam: false, displayName:"Test Display Name", services: [{url: 4, name: "service2"}, {url:5, name:"service22"}]},
    {id:"c33", name: "Team3 with a really long name so we can test elipsis", privateTeam: false, services: [{url: 6, name: "service3"}]},
    {id:"d44", name: "Team4", privateTeam: true, services: []},
  ],
  accounts: [
    {id:"e1111", name: "Account1 with a really long name so we can test elipsis", projectTeams: [{id: 111, name: "team1", isTeamMember: true}, {id:211, name:"team12 with a really long name so we can test elipsis", isTeamMember: true}, {id:223, name:"team13 with a really long name so we can test elipsis", isTeamMember: true}]},
    {id:"f2222", name: "Account2", projectTeams: [{id: 222, name: "team2", isTeamMember: true}, {id:221, name:"team22 with a really long name so we can test elipsis", isTeamMember: true}]},
    {id:"g3333", name: "Account3", projectTeams: [{id: 333, name: "team3", isTeamMember: true}]},
    {id:"h4444", name: "Account4 with a really long name so we can test elipsis", projectTeams: []},
  ],
  personalTeams: [{id:"11111", name: "Team4", displayName: "Display Name"}],
  baseEnvUrl:"https://baseurl.com",
  app: "testapp",
  isOpen: false,
  user: {type: "admin"},
  // enableChatButton: false,
  tooltipMessage: "Test tooltip message for ui shell",
  showChatTooltip: true,
  isLaunchpad: true,
}

const withDelay = (delay: number, response: any) => (): Promise<any> => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(response);
    }, delay);
  });
};

function MainContent(props: { children?: React.ReactNode }) {
  return (
    <div id="id" style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "2rem" }}>
      <h1>App name</h1>
      <p>All about your great app</p>
      <Button>Learn more</Button>
      {props.children}
    </div>
  );
}

export const UIShellDefault = (args) => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${BASE_SERVICES_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onGet(`${BASE_SERVICES_URL}/users/teams/services`).reply(withDelay(1000, [200, TEAMS_DATA]));
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
            showSupport:true,
            type: "partner",
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

export const UIShellDefaultWhite = (args) => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${BASE_SERVICES_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onGet(`${BASE_SERVICES_URL}/users/teams`).reply(withDelay(1000, [200, TEAMS_DATA]));
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/teams/1/services`).reply(withDelay(4000, [200, SERVICES_DATA]));
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/teams/2/services`).reply(withDelay(4000, [200, []]));
  mock.onPost(`${BASE_SERVICES_URL}/support/contact`).reply(200);

  return (
    <>
      <UIShell
        theme="white"
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
  const mock = new MockAdapter(axios);
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/user`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/teams/1/services`).reply(withDelay(3000, [200, SERVICES_DATA]));
  mock.onGet(`${BASE_SERVICES_URL}/launchpad/teams/2/services`).reply(withDelay(3000, [200, []]));
  mock.onGet(`${BASE_SERVICES_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onGet(`${BASE_SERVICES_URL}/users/teams`).reply(200, TEAMS_DATA);
  mock.onPatch(`${BASE_SERVICES_URL}/users/profile`).reply(200);
  mock.onPost(`${BASE_SERVICES_URL}/support/contact`).reply(200);
  mock.onPut(`${BASE_SERVICES_URL}/notifications`).reply(200, {});
  mock.onPut(`${BASE_SERVICES_URL}/users/consent`).reply(200, {});
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
          <SideNav isChildOfHeader aria-label="Sidenav" expanded={isOpen} isPersistent={false} onOverlayClick={close}>
            <SideNavItems>
              {navLinks?.map((navLink) => (
                <SideNavLink large element={Link} to="." onClick={close}>
                  {navLink.name}
                </SideNavLink>
              ))}
              {navLinks ? <SideNavDivider /> : null}
              <SideNavLink element={Link} to="." onClick={close}>
                React Router Link
              </SideNavLink>
              <SideNavLink isActive element={Link} renderIcon={ServiceDesk} to="." onClick={close}>
                Active React Router link with icon
              </SideNavLink>
              <SideNavLink element={Link} large to="." onClick={close}>
                Large React Router link
              </SideNavLink>
              <SideNavLink isActive element={Link} renderIcon={ServiceDesk} to="." large onClick={close}>
                Large React Router active link with icon
              </SideNavLink>
              <SideNavMenu title="Menu">
                <SideNavMenuItem element={Link} to="." onClick={close}>
                  Active React Router menu link 1
                </SideNavMenuItem>
                <SideNavMenuItem href="#" onClick={close}>
                  Menu link
                </SideNavMenuItem>
                <SideNavMenuItem href="#" onClick={close}>
                  Menu link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={ServiceDesk} title="Active menu with icon">
                <SideNavMenuItem isActive element={Link} to="." onClick={close}>
                  Active React Router menu item
                </SideNavMenuItem>
                <SideNavMenuItem href="#" onClick={close}>
                  Menu link
                </SideNavMenuItem>
                <SideNavMenuItem href="#" onClick={close}>
                  Menu link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu large title="Large menu">
                <SideNavMenuItem element={Link} to="." onClick={close}>
                  Large React Router menu link 1
                </SideNavMenuItem>
                <SideNavMenuItem element={Link} to="." onClick={close}>
                  Large menu item 2
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu large renderIcon={ServiceDesk} title="Large active menu with icon">
                <SideNavMenuItem isActive element={Link} to="." onClick={close}>
                  Large React Router Link active link
                </SideNavMenuItem>
                <SideNavMenuItem href="#" onClick={close}>
                  Large link
                </SideNavMenuItem>
                <SideNavMenuItem href="#" onClick={close}>
                  Large link
                </SideNavMenuItem>
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
        skipToContentProps={null}
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
  const mock = new MockAdapter(axios);
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
  const mock = new MockAdapter(axios);
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

const UIShellEmptyState = (args) => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${BASE_SERVICES_URL}/users/consents`).reply(200, PRIVACY_DATA);
  return <UIShell productName="Boomerang" {...args} />;
};

export const Default = (args) => {
  return <UIShellDefault {...args} />;
};

export const KitchenSink = (args) => {
  return <UIShellKitchenSink {...args} />;
};

export const LeftPanel = (args) => {
  return <UIShellDefault {...args} leftPanel={({isOpen, navLinks}) => (
    <AdvantageSideNav {...sidenavProps} isOpen={isOpen} navLinks={navLinks}/>
  )}/>;
};

export const UserNotConsented = (args) => {
  return <UIShellUserNotConsented {...args} />;
};

export const UserPendingDeletion = (args) => {
  return <UIShellUserPendingDeletion {...args} />;
};

export const EmptyState = (args) => {
  return <UIShellEmptyState {...args} />;
};

