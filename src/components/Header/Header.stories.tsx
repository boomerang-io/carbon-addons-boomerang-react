import { Link, Router } from "react-router-dom";
import { ServiceDesk } from "@carbon/react/icons";
import { Modal, SideNav, SideNavLink, SideNavItems, SideNavMenu, SideNavMenuItem } from "@carbon/react";
import HeaderMenuItem from "../HeaderMenuItem";
import LeftSideNav from "../LeftSideNav";
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
      baseServiceUrl=""
      renderLogo={false}
      appName={"App"}
      platformName={"Boomerang"}
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
  </div>
);

export const WithIntegratedSidenav = () => (
  <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
    <Header
      appName={"App"}
      baseServiceUrl=""
      platformName={"Boomerang"}
      renderLogo={false}
      enableNotifications={true}
      companyName={"Boomerang"}
      productName={"Flow"}
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
      renderSidenav={({ isOpen, onMenuClose }: any) => (
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
        </LeftSideNav>
      )}
    />
  </Router>
);

WithIntegratedSidenav.story = {
  name: "with integrated Sidenav",
};
