import React from "react";
import { ServiceDesk } from "@carbon/react/icons";
import { SideNav, SideNavLink, SideNavItems, SideNavMenu, SideNavMenuItem } from "@carbon/react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import LeftSideNav from "./LeftSideNav";

export default {
  title: "Platform/LeftSideNav",
};

export const WithRouter = () => (
  <Router>
    <LeftSideNav>
      <SideNav expanded>
        <SideNavItems>
          <SideNavMenu title="Large menu" large>
            <SideNavMenuItem element={Link} to="">
              Menu 1
            </SideNavMenuItem>
            <SideNavMenuItem element={Link} to="">
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
          <SideNavLink element={Link} renderIcon={ServiceDesk} to="" large>
            Large link w/icon
          </SideNavLink>
        </SideNavItems>
      </SideNav>
    </LeftSideNav>
  </Router>
);

WithRouter.story = {
  name: "with Router",
};
