import React from 'react';
import { storiesOf } from '@storybook/react';
import { ServiceDesk16 } from '@carbon/icons-react';
import {
  SideNav,
  SideNavLink,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import LeftSideNav from './LeftSideNav';

storiesOf('LeftSideNav', module).add('with Router', () => (
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
          <SideNavMenu renderIcon={ServiceDesk16} title="Large menu w/icon" large>
            <SideNavMenuItem isActive element={Link} to="">
              Menu 1
            </SideNavMenuItem>
            <SideNavMenuItem href="">Menu 2</SideNavMenuItem>
            <SideNavMenuItem href="">Menu 3</SideNavMenuItem>
          </SideNavMenu>
          <SideNavLink element={Link} renderIcon={ServiceDesk16} to="" large>
            Large link w/icon
          </SideNavLink>
        </SideNavItems>
      </SideNav>
    </LeftSideNav>
  </Router>
));
