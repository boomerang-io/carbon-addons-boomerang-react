/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/

/* eslint-disable no-script-url */
import React from "react";
import { Link, MemoryRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ServiceDesk } from "@carbon/react/icons";
import { SideNav, SideNavLink, SideNavItems, SideNavMenu, SideNavMenuItem } from "@carbon/react";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import Header from "./index"; // Using default export

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

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
  <QueryClientProvider client={queryClient}>
    <div style={{ display: "block" }}>
      <Header
        productName={"App"}
        prefixName={"Boomerang"}
        enableAppSwitcher={false}
        enableNotifications={true}
        navLinks={[
          {
            name: "Launchpad",
            url: "javascript:void(0)",
          },
          {
            name: "Catalog",
            url: "javascript:void(0)",
          },
          {
            name: "Docs",
            url: "javascript:void(0)",
          },
          {
            name: "Admin",
            url: "javascript:void(0)",
          },
        ]}
        profileMenuItems={[
          <HeaderMenuItem
            key="About the Platform"
            text="About the Platform"
            type="link"
            kind="app"
            href="javascript:void(0)"
          />,
          <HeaderMenuItem
            key="GDPR agreement"
            text="GDPR agreement"
            type="link"
            kind="app"
            href="javascript:void(0)"
          />,
          <HeaderMenuItem key="Sign out" text="Sign out" type="link" kind="app" href="javascript:void(0)" />,
        ]}
        supportMenuItems={[
          <HeaderMenuItem key="Tutorial" text="Tutorial" type="link" kind="app" href="javascript:void(0)" />,
          <HeaderMenuItem
            key="FAQ + Contacts"
            text="FAQ + Contacts"
            type="link"
            kind="app"
            href="javascript:void(0)"
          />,
          <HeaderMenuItem key="Send Feedback" text="Send Feedback" type="link" kind="app" href="javascript:void(0)" />,
          <HeaderMenuItem key="Report a bug" text="Report a bug" type="link" kind="app" href="javascript:void(0)" />,
        ]}
      />
    </div>
  </QueryClientProvider>
);

export const IntegratedSidenav = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <Header
        productName={"App"}
        prefixName={"Boomerang"}
        enableAppSwitcher={false}
        enableNotifications={true}
        navLinks={[
          {
            name: "Launchpad",
            url: "javascript:void(0)",
          },
          {
            name: "Catalog",
            url: "javascript:void(0)",
          },
          {
            name: "Docs",
            url: "javascript:void(0)",
          },
          {
            name: "Admin",
            url: "javascript:void(0)",
          },
        ]}
        profileMenuItems={[
          <HeaderMenuItem key="0" text="About the Platform" type="link" kind="app" href="javascript:void(0)" />,
          <HeaderMenuItem key="1" text="GDPR agreement" type="link" kind="app" href="javascript:void(0)" />,
          <HeaderMenuItem key="2" text="Sign out" type="link" kind="app" href="javascript:void(0)" />,
        ]}
        supportMenuItems={[
          <HeaderMenuItem key="0" text="Tutorial" type="link" kind="app" href="javascript:void(0)" />,
          <HeaderMenuItem key="1" text="FAQ + Contacts" type="link" kind="app" href="javascript:void(0)" />,
          <HeaderMenuItem key="2" text="Send Feedback" type="link" kind="app" href="javascript:void(0)" />,
          <HeaderMenuItem key="3" text="Report a bug" type="link" kind="app" href="javascript:void(0)" />,
        ]}
        leftPanel={({ isOpen, close }) => (
          <SideNav aria-label="sidenav" expanded={isOpen} isPersistent={false} onOverlayClick={close}>
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
              <SideNavLink isActive renderIcon={ServiceDesk} large>
                Large link w/icon
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        )}
      />
    </QueryClientProvider>
  </Router>
);
