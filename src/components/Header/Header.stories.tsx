/* eslint-disable no-script-url */
import React from "react";
import { Link, Router } from "react-router-dom";
import { ServiceDesk } from "@carbon/react/icons";
import { Modal, SideNav, SideNavLink, SideNavItems, SideNavMenu, SideNavMenuItem } from "@carbon/react";
import HeaderMenuItem from "../HeaderMenuItem";
import { createMemoryHistory } from "history";
import Header from "./index"; // Using default export

// const mockSocketUrl = 'http://localhost:7750/notifications/ws';
const mockSocketUrl = "https://www.google.com/ws";

export default {
  title: "Platform/Header",
  component: Header,
  parameters: {
    docs: {
      description: {
        component:
          "Platform header that is used by the UIShell. Exported to allow composibility of Header in place of UIShell.",
      },
    },
  },
};

export const Default = () => (
  <div style={{ display: "block" }}>
    <Header
      productName={"App"}
      prefixName={"Boomerang"}
      enableAppSwitcher={false}
      enableNotifications={true}
      navLinks={[
        {
          name: "Launchpad",
          url: "https://servicesessentials.ibm.com/launchpad/",
        },
        {
          name: "Next",
          url: "https://servicesessentials.ibm.com/next/",
        },
        {
          name: "Status",
          url: "https://servicesessentials.ibm.com/status/",
        },
        {
          name: "Docs",
          url: "https://servicesessentials.ibm.com/docs/",
        },
        {
          name: "Admin",
          url: "https://servicesessentials.ibm.com/admin/",
        },
      ]}
      notificationsConfig={{
        wsUrl: mockSocketUrl,
      }}
      supportMenuItems={[
        <HeaderMenuItem key="Tutorial" text="Tutorial" kind="link" href="javascript:void(0)"></HeaderMenuItem>,
        <HeaderMenuItem
          key="FAQ + Contacts"
          text="FAQ + Contacts"
          kind="link"
          href="javascript:void(0)"
        ></HeaderMenuItem>,
        <HeaderMenuItem
          key="Send Feedback"
          text="Send Feedback"
          kind="link"
          href="javascript:void(0)"
        ></HeaderMenuItem>,
        <HeaderMenuItem key="Report a bug" text="Report a bug" kind="link" href="javascript:void(0)"></HeaderMenuItem>,
      ]}
      profileMenuItems={[
        <HeaderMenuItem
          key="About the Platform"
          text="About the Platform"
          kind="link"
          href="javascript:void(0)"
        ></HeaderMenuItem>,
        <HeaderMenuItem
          key="GDPR agreement"
          text="GDPR agreement"
          kind="link"
          href="javascript:void(0)"
        ></HeaderMenuItem>,
        <HeaderMenuItem key="Sign out" text="Sign out" kind="link" href="javascript:void(0)"></HeaderMenuItem>,
      ]}
    />
  </div>
);

export const WithIntegratedSidenav = () => (
  <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
    <Header
      productName={"App"}
      prefixName={"Boomerang"}
      enableAppSwitcher={false}
      enableNotifications={true}
      navLinks={[
        {
          name: "Launchpad",
          url: "https://servicesessentials.ibm.com/launchpad/",
        },
        {
          name: "Next",
          url: "https://servicesessentials.ibm.com/next/",
        },
        {
          name: "Status",
          url: "https://servicesessentials.ibm.com/status/",
        },
        {
          name: "Docs",
          url: "https://servicesessentials.ibm.com/docs/",
        },
        {
          name: "Admin",
          url: "https://servicesessentials.ibm.com/admin/",
        },
      ]}
      notificationsConfig={{
        wsUrl: mockSocketUrl,
      }}
      supportMenuItems={[
        <HeaderMenuItem key="0" text="Tutorial" kind="link" href="javascript:void(0)"></HeaderMenuItem>,
        <HeaderMenuItem key="1" text="FAQ + Contacts" kind="link" href="javascript:void(0)"></HeaderMenuItem>,
        <HeaderMenuItem key="2" text="Send Feedback" kind="link" href="javascript:void(0)"></HeaderMenuItem>,
        <HeaderMenuItem key="3" text="Report a bug" kind="link" href="javascript:void(0)"></HeaderMenuItem>,
      ]}
      profileMenuItems={[
        <HeaderMenuItem key="0" text="About the Platform" kind="link" href="javascript:void(0)"></HeaderMenuItem>,
        <HeaderMenuItem key="1" text="GDPR agreement" kind="link" href="javascript:void(0)"></HeaderMenuItem>,
        <HeaderMenuItem key="2" text="Sign out" kind="link" href="javascript:void(0)"></HeaderMenuItem>,
      ]}
      leftPanel={({ isOpen, close }) => (
        <SideNav isChildOfHeader aria-label="sidenav" expanded={isOpen} isPersistent={false} onOverlayClick={close}>
          <SideNavItems>
            <SideNavMenu title="Large menu" large>
              <SideNavMenuItem element={Link} to="/">
                Menu 1
              </SideNavMenuItem>
              <SideNavMenuItem element={Link} to="/">
                Menu 3
              </SideNavMenuItem>
            </SideNavMenu>
            <SideNavMenu renderIcon={ServiceDesk} title="Large menu w/icon" large>
              <SideNavMenuItem isActive element={Link} to="">
                Menu 1
              </SideNavMenuItem>
              <SideNavMenuItem href="">Menu 2</SideNavMenuItem>
              <SideNavMenuItem href="">Menu 3</SideNavMenuItem>
            </SideNavMenu>
            <SideNavLink isActive element={Link} renderIcon={ServiceDesk} to="" large>
              Large link w/icon
            </SideNavLink>
          </SideNavItems>
        </SideNav>
      )}
    />
  </Router>
);

WithIntegratedSidenav.story = {
  name: "with integrated Sidenav",
};
