import React from 'react';
import { storiesOf } from '@storybook/react';

import { text, boolean, object } from '@storybook/addon-knobs/react';
import { Link, Router } from 'react-router-dom';
import { ServiceDesk16 } from '@carbon/icons-react';
import {
  Modal,
  SideNav,
  SideNavLink,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react';
import HeaderMenuItem from '../HeaderMenuItem';
import LeftSideNav from '../LeftSideNav';
// eslint-disable-next-line
import { createMemoryHistory } from 'history';

import Header from './index'; // Using default export

// const mockSocketUrl = 'http://localhost:7750/notifications/ws';
const mockSocketUrl = 'https://www.google.com/ws';

storiesOf('Header', module)
  .add('default', () => (
    <Header
      renderLogo={boolean('renderLogo', true)}
      appName={text('appName', '')}
      platformName={text('platformName', '')}
      enableNotifications={boolean('enableNotifications', true)}
      navLinks={object('navLinks', [
        {
          name: 'Launchpad',
          url: 'https://launch.boomerangplatform.net/launchpad/',
        },
        {
          name: 'Next',
          url: 'https://launch.boomerangplatform.net/next/',
        },
        {
          name: 'Status',
          url: 'https://launch.boomerangplatform.net/status/',
        },
        {
          name: 'Docs',
          url: 'https://launch.boomerangplatform.net/docs/',
        },
        {
          name: 'Admin',
          url: 'https://launch.boomerangplatform.net/admin/',
        },
      ])}
      notificationsConfig={{
        wsUrl: mockSocketUrl,
      }}
      onHelpClick={[
        <HeaderMenuItem key="Tutorial" text="Tutorial" iconName="workspace">
          {() => <Modal passiveModal />}
        </HeaderMenuItem>,
        <HeaderMenuItem key="FAQ + Contacts" text="FAQ + Contacts" iconName="group">
          {() => <Modal passiveModal />}
        </HeaderMenuItem>,
        <HeaderMenuItem key="Send Feedback" text="Send Feedback" iconName="chat">
          {() => <Modal passiveModal />}
        </HeaderMenuItem>,
        <HeaderMenuItem key="Report a bug" text="Report a bug" iconName="debug">
          {() => <Modal passiveModal />}
        </HeaderMenuItem>,
      ]}
      profileChildren={[
        <HeaderMenuItem key="About the Platform" text="About the Platform">
          {() => <Modal passiveModal />}
        </HeaderMenuItem>,
        <HeaderMenuItem key="GDPR agreement" text="GDPR agreement">
          {() => <Modal passiveModal />}
        </HeaderMenuItem>,
        <HeaderMenuItem key="Sign out" text="Sign out" iconName="power">
          {() => <Modal passiveModal />}
        </HeaderMenuItem>,
      ]}
    />
  ))
  .add('with integrated Sidenav', () => (
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
      <Header
        renderLogo={boolean('renderLogo', true)}
        enableNotifications={boolean('enableNotifications', true)}
        companyName={text('companyName', '')}
        productName={text('productName', '')}
        navLinks={object('navLinks', [
          {
            name: 'Launchpad',
            url: 'https://launch.boomerangplatform.net/launchpad/',
          },
          {
            name: 'Next',
            url: 'https://launch.boomerangplatform.net/next/',
          },
          {
            name: 'Status',
            url: 'https://launch.boomerangplatform.net/status/',
          },
          {
            name: 'Docs',
            url: 'https://launch.boomerangplatform.net/docs/',
          },
          {
            name: 'Admin',
            url: 'https://launch.boomerangplatform.net/admin/',
          },
        ])}
        notificationsConfig={{
          wsUrl: mockSocketUrl,
        }}
        onHelpClick={() => [
          <HeaderMenuItem key="0" text="Tutorial" iconName="workspace">
            {() => <Modal passiveModal />}
          </HeaderMenuItem>,
          <HeaderMenuItem key="1" text="FAQ + Contacts" iconName="group">
            {() => <Modal passiveModal />}
          </HeaderMenuItem>,
          <HeaderMenuItem key="2" text="Send Feedback" iconName="chat">
            {() => <Modal passiveModal />}
          </HeaderMenuItem>,
          <HeaderMenuItem key="3" text="Report a bug" iconName="debug">
            {() => <Modal passiveModal />}
          </HeaderMenuItem>,
        ]}
        profileChildren={() => [
          <HeaderMenuItem key="0" text="About the Platform">
            {() => <Modal passiveModal />}
          </HeaderMenuItem>,
          <HeaderMenuItem key="1" text="GDPR agreement">
            {() => <Modal passiveModal />}
          </HeaderMenuItem>,
          <HeaderMenuItem key="2" text="Sign out" iconName="power">
            <Modal passiveModal />
          </HeaderMenuItem>,
        ]}
        onMenuClick={({ isOpen, onMenuClose }) => (
          <LeftSideNav isOpen={isOpen} onMenuClose={onMenuClose}>
            <SideNav aria-label="sidenav" expanded isChildOfHeader>
              <SideNavItems>
                <SideNavMenu title="Large menu" large>
                  <SideNavMenuItem element={Link} to="/">
                    Menu 1
                  </SideNavMenuItem>
                  <SideNavMenuItem element={Link} to="/">
                    Menu 3
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu renderIcon={ServiceDesk16} title="Large menu w/icon" large>
                  <SideNavMenuItem isActive element={Link} to="">
                    Menu 1
                  </SideNavMenuItem>
                  <SideNavMenuItem href="">Menu 2</SideNavMenuItem>
                  <SideNavMenuItem href="">Menu 3</SideNavMenuItem>
                </SideNavMenu>
                <SideNavLink isActive element={Link} renderIcon={ServiceDesk16} to="" large>
                  Large link w/icon
                </SideNavLink>
              </SideNavItems>
            </SideNav>
          </LeftSideNav>
        )}
      />
    </Router>
  ));
