import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
  SideNav,
  SideNavLink,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react';
import { Help24, ServiceDesk16 } from '@carbon/icons-react';
import LeftSideNav from '../LeftSideNav';
import { PRIVACY_DATA } from '../PrivacyStatement/constants';
import { PROFILE_SETTINGS_DATA } from '../ProfileSettings/constants';
import UIShell from './UIShell';

const mock = new MockAdapter(axios);

const BASE_URL = 'https://www.ibm.com/services';

const TEAMS_DATA = {
  standardTeams: [
    {id:"1", name:"Team 1", displayName: "Team 1 display with a loooong long long long display name", isTeamMember: true},
    {id:"2", name:"Team 2", displayName: null, isTeamMember: true},
  ],
  accounts: [
    // {
    //   id: "11",
    //   isTeamMember: true,
    //   name: "Account 1",
    //   projects: [
    //     {accountTeamId: "11", id:"111", name: "Project 1 1", displayName: "Project 1 1 display", isTeamMember: true},
    //     {accountTeamId: "11", id:"112", name: "Project 1 2", displayName: null, isTeamMember: true},
    //   ]
    // },
    // {
    //   id: "12",
    //   isTeamMember: false,
    //   name: "Account 2",
    //   projects: [
    //     {accountTeamId: "12", id:"121", name: "Project 2 1", displayName: null, isTeamMember: true},
    //   ]
    // },
  ]
};

const SERVICES_DATA = [
  {name: "Service 1 with a loooong long long long name", url: "http://test.com"},
  {name: "Service 2", url: "http://test.com"},
  {name: "Service 3", url: "http://test.com"},
  {name: "Service 4", url: "http://test.com"},
];

export default {
  title: 'UIShell',
};

export const Default = () => {
  const withDelay = (delay, response) => config => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
          resolve(response);
      }, delay);
    });
  };

  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onGet(`${BASE_URL}/launchpad/users`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onGet(`${BASE_URL}/users/teams`).reply(200, TEAMS_DATA);
  mock.onGet(`${BASE_URL}/launchpad/teams/1/services`).reply(withDelay(5000,[200, SERVICES_DATA]));
  mock.onGet(`${BASE_URL}/launchpad/teams/2/services`).reply(withDelay(5000,[200, SERVICES_DATA]));
  mock.onPost(`${BASE_URL}/support/contact`).reply(200);
  return (
    <UIShell
      renderFlowDocs
      renderLogo={boolean('renderLogo', true)}
      renderRequests={boolean('renderRequests', true)}
      appName={text('appName', 'Flow')}
      platformName={text('platformName', 'Boomerang')}
      baseServiceUrl={BASE_URL}
      headerConfig={{
        features: {
          'community.enabled': boolean('community.enabled', true),
          'notifications.enabled': boolean('notifications.enabled', true),
          'support.enabled': boolean('support.enabled', true),
          'feedback.enabled': boolean('feedback.enabled', true),
        },
        navigation: [
          {
            name: 'Launchpad',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
          {
            name: 'Admin',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
          {
            name: 'Docs',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
        ],
        platform: {
          name: text('platform.name', 'IBM Boomerang Platform'),
          version: text('platform.version', '5.0.0'),
          signOutUrl: 'https://ibm.com',
          communityUrl: 'https://developer.ibm.com',
          platformName: text('platform.platformName', 'IBM Boomerang'),
          platformOrganization: text('platform.platformOrganization', 'IBM'),
        },
        platformMessage: {
          kind: text('platformMessage.kind', 'info'),
          message: text('platformMessage.message', 'Message Goes Here'),
          title: text('platformMessage.title', 'Testing Platform Title'),
        },
      }}
      onTutorialClick={action('Tutorial')}
      skipToContentProps={{ href: '#id' }}
      user={{
        name: 'test user',
        email: 'test.user@ibm.com',
        hasConsented: true,
        status: 'active',
        requestSummary: {
          requireUserAction: 0,
          submittedByUser: 17,
        },
      }}
    />
  );
};

Default.story = {
  name: 'default',
};

export const WithCarbonSidenavAndReactRouter = () => {
  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onGet(`${BASE_URL}/launchpad/users`).reply(200, PROFILE_SETTINGS_DATA);
  mock.onGet(`${BASE_URL}/users/teams`).reply(200, TEAMS_DATA);
  mock.onPatch(`${BASE_URL}/users/profile`).reply(200);
  mock.onPost(`${BASE_URL}/support/contact`).reply(200);
  return (
    <Router>
      <UIShell
        renderLogo={boolean('renderLogo', true)}
        platformName={text('platformName', 'Boomerang')}
        appName={text('appName', '')}
        baseServiceUrl={BASE_URL}
        headerConfig={{
          features: {
            'community.enabled': boolean('community.enabled', true),
            'notifications.enabled': boolean('notifications.enabled', true),
            'support.enabled': boolean('support.enabled', true),
          },
          navigation: [
            {
              name: 'Launchpad',
              url: 'https://servicesessentials.ibm.com/launchpad',
            },
            {
              name: 'Admin',
              url: 'https://servicesessentials.ibm.com/launchpad',
            },
            {
              name: 'Docs',
              url: 'https://servicesessentials.ibm.com/launchpad',
            },
          ],
          platform: {
            name: text('platform.name', 'IBM Boomerang Platform'),
            sendMail: true,
            version: text('platform.version', '5.0.0'),
            signOutUrl: 'https://ibm.com',
            communityUrl: 'https://developer.ibm.com',
          },
          platformMessage: {
            kind: text('platformMessage.kind', 'info'),
            message: text('platformMessage.message', 'Message Goes Here'),
            title: text('platformMessage.title', 'Testing Platform Title'),
          },
        }}
        renderSidenav={({ isOpen }) => (
          <LeftSideNav isOpen={isOpen}>
            <SideNav expanded isChildOfHeader aria-label="sidenav">
              <SideNavItems>
                <SideNavLink element={Link} to="/">
                  Link
                </SideNavLink>
                <SideNavLink isActive element={Link} renderIcon={ServiceDesk16} to="/">
                  Active link with icon
                </SideNavLink>
                <SideNavLink element={Link} large to="/">
                  Large link
                </SideNavLink>
                <SideNavLink isActive element={Link} renderIcon={ServiceDesk16} to="/" large>
                  Large active link with icon
                </SideNavLink>
                <SideNavMenu title="Menu">
                  <SideNavMenuItem element={Link} to="/">
                    Active menu item 1
                  </SideNavMenuItem>
                  <SideNavMenuItem href="/">Menu item 2</SideNavMenuItem>
                  <SideNavMenuItem href="/">Menu item 3</SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu renderIcon={ServiceDesk16} title="Active menu with icon">
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
                <SideNavMenu renderIcon={ServiceDesk16} title="Large active menu with icon" large>
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
        onTutorialClick={action('Tutorial')}
        user={{
          id: '1',
          name: 'test user',
          email: 'test.user@ibm.com',
          requestSummary: {
            requireUserAction: 11,
            submittedByUser: 17,
          },
        }}
        renderRightPanel={{
          icon: <Help24 />,
          component: (
            <div
              style={{
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '4rem',
                width: '25rem',
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
  name: 'with Carbon sidenav and React Router ',
};

export const WithRightPanel = () => {
  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  mock.onPost(`${BASE_URL}/support/contact`).reply(200);
  return (
    <UIShell
      isFlowApp
      hasAppSwitcher={false}
      renderLogo={boolean('renderLogo', true)}
      appName={text('appName', '')}
      platformName={text('platformName', 'Boomerang')}
      baseServiceUrl={BASE_URL}
      headerConfig={{
        features: {
          'community.enabled': boolean('community.enabled', true),
          'notifications.enabled': boolean('notifications.enabled', true),
          'support.enabled': boolean('support.enabled', true),
        },
        navigation: [
          {
            name: 'Launchpad',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
          {
            name: 'Admin',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
          {
            name: 'Docs',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
        ],
        platform: {
          name: text('platform.name', 'IBM Boomerang Platform'),
          version: text('platform.version', '5.0.0'),
          signOutUrl: 'https://ibm.com',
          communityUrl: 'https://developer.ibm.com',
        },
        platformMessage: {
          kind: text('platformMessage.kind', 'info'),
          message: text('platformMessage.message', 'Message Goes Here'),
          title: text('platformMessage.title', 'Testing Platform Title'),
        },
      }}
      onTutorialClick={action('Tutorial')}
      renderRightPanel={{
        icon: <Help24 />,
        component: (
          <div
            style={{
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '4rem',
              width: '25rem',
            }}
          >
            Custom content behaviour
          </div>
        ),
      }}
      user={{
        id: '1',
        name: 'test user',
        email: 'test.user@ibm.com',
        hasConsented: true,
        status: 'active',
        requestSummary: {
          requireUserAction: 11,
          submittedByUser: 17,
        },
      }}
    />
  );
};

WithRightPanel.story = {
  name: 'with right panel',
};

export const UserNotConsented = () => {
  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  return (
    <UIShell
      hasAppSwitcher={false}
      renderLogo={boolean('renderLogo', true)}
      appName={text('appName', '')}
      baseServiceUrl={BASE_URL}
      platformName={text('platformName', 'Boomerang')}
      headerConfig={{
        features: {
          'community.enabled': boolean('community.enabled', true),
          'notifications.enabled': boolean('notifications.enabled', true),
          'support.enabled': boolean('support.enabled', true),
        },
        navigation: [
          {
            name: 'Launchpad',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
          {
            name: 'Admin',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
          {
            name: 'Docs',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
        ],
        platform: {
          name: text('platform.name', 'IBM Boomerang Platform'),
          version: text('platform.version', '5.0.0'),
          signOutUrl: 'https://ibm.com',
          communityUrl: 'https://developer.ibm.com',
        },
        platformMessage: {
          kind: text('platformMessage.kind', 'info'),
          message: text('platformMessage.message', 'Message Goes Here'),
          title: text('platformMessage.title', 'Testing Platform Title'),
        },
      }}
      onTutorialClick={action('Tutorial')}
      user={{
        id: '1',
        name: 'test user',
        email: 'test.user@ibm.com',
        hasConsented: false,
        status: 'active',
      }}
    />
  );
};

UserNotConsented.story = {
  name: 'user not consented',
};

export const UserPendingDeletion = () => {
  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  return (
    <UIShell
      hasAppSwitcher={false}
      renderLogo={boolean('renderLogo', true)}
      platformName={text('platformName', 'Boomerang')}
      appName={text('appName', '')}
      baseServiceUrl={BASE_URL}
      headerConfig={{
        features: {
          'community.enabled': boolean('community.enabled', true),
          'notifications.enabled': boolean('notifications.enabled', true),
          'support.enabled': boolean('support.enabled', true),
        },
        navigation: [
          {
            name: 'Launchpad',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
          {
            name: 'Admin',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
          {
            name: 'Docs',
            url: 'https://servicesessentials.ibm.com/launchpad',
          },
        ],
        platform: {
          name: text('platform.name', 'IBM Boomerang Platform'),
          version: text('platform.version', '5.0.0'),
          signOutUrl: 'https://ibm.com',
          communityUrl: 'https://developer.ibm.com',
        },
        platformMessage: {
          kind: text('platformMessage.kind', 'info'),
          message: text('platformMessage.message', 'Message Goes Here'),
          title: text('platformMessage.title', 'Testing Platform Title'),
        },
      }}
      onTutorialClick={action('Tutorial')}
      user={{
        id: '1',
        name: 'test user',
        email: 'test.user@ibm.com',
        hasConsented: false,
        status: 'pending_deletion',
      }}
    />
  );
};

UserPendingDeletion.story = {
  name: 'user pending deletion',
};

export const WithoutProps = () => {
  mock.onGet(`${BASE_URL}/users/consents`).reply(200, PRIVACY_DATA);
  return <UIShell />;
};

WithoutProps.story = {
  name: 'without props',
};
