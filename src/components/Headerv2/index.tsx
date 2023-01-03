import React from "react";
import { Link, Route } from "react-router-dom";
import {
  Button,
  Modal,
  Header,
  HeaderContainer,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenu,
  HeaderPanel,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  Popover,
  PopoverContent,
  Theme,
} from "@carbon/react";
import FocusTrap from "focus-trap-react";
import { User as UserIcon, IntrusionPrevention, Bot, UserProfile, Group, Switcher, Help } from "@carbon/react/icons";

interface HeaderContainerRenderProps {
  isSideNavExpanded: boolean;
  onClickSideNavExpand: (arg: boolean) => void;
}

const ShellMenu = {
  Profile: "profile",
  Notifications: "notifications",
  Requests: "requests",
  Support: "support",
  Switcher: "switcher",
} as const;

type ShellMenuType = typeof ShellMenu[keyof typeof ShellMenu];

type MenuState = Record<ShellMenuType, boolean>;

function Shell() {
  const [menuState, setMenuState] = React.useState<MenuState>({
    profile: false,
    notifications: false,
    requests: false,
    support: false,
    switcher: false,
  });

  const handleOnMenuClick = (profileMenu: ShellMenuType, isOpen = false) => {
    const newState = { ...menuState, [profileMenu]: isOpen };
    setMenuState(newState);
  };

  return (
    <Theme theme="g100">
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }: HeaderContainerRenderProps) => (
          <Header aria-label="Boomerang">
            <SkipToContent />
            <HeaderMenuButton aria-label="Open menu" onClick={onClickSideNavExpand} isActive={isSideNavExpanded} />
            <HeaderName href="#" prefix="IBM Services">
              Essentials
            </HeaderName>
            <HeaderNavigation aria-label="Platform navigation">
              <HeaderMenuItem isCurrentPage href="#">
                Launchpad
              </HeaderMenuItem>
              <HeaderMenuItem href="#">Catalog</HeaderMenuItem>
              <HeaderMenuItem href="#">Support Center</HeaderMenuItem>
              <HeaderMenuItem href="#">Docs</HeaderMenuItem>
              <HeaderMenuItem href="#">Admin</HeaderMenuItem>
            </HeaderNavigation>
            <HeaderGlobalBar>
              <HeaderMenu aria-label="Link 4" renderMenuContent={() => <Help size={20} />} className="menu">
                <HeaderMenuItem
                  element={React.forwardRef((props, ref) => (
                    <Button {...props} onClick={(e) => e.stopPropagation()} ref={ref} />
                  ))}
                  to="#hello"
                >
                  Sub-link 1
                </HeaderMenuItem>
                <HeaderMenuItem
                  element={(props: any) => <Button {...props} onClick={(e) => e.stopPropagation()} />}
                  to="#hello"
                >
                  Sub-link 1
                </HeaderMenuItem>
                <HeaderMenuItem element={Link}>Sub-link 2</HeaderMenuItem>
                <HeaderMenuItem element={Link}>Sub-link 3</HeaderMenuItem>
              </HeaderMenu>
              <FocusTrap
                active={menuState.support}
                focusTrapOptions={{
                  clickOutsideDeactivates: () => {
                    handleOnMenuClick(ShellMenu.Support);
                    return true;
                  },
                  escapeDeactivates: () => {
                    handleOnMenuClick(ShellMenu.Support);
                    return true;
                  },
                }}
              >
                <Popover caret={false} open={menuState.support} align="bottom-right">
                  <button
                    className="cds--btn--icon-only cds--btn cds--btn--ghost cds--btn--icon-only cds--btn cds--btn--ghost"
                    onClick={() => handleOnMenuClick(ShellMenu.Support, !menuState.support)}
                    tabIndex={menuState.support ? -1 : 0}
                  >
                    <Help size={20} />
                  </button>
                  <PopoverContent>
                    <SupportMenu isOpen={menuState.support} handleOnMenuClick={handleOnMenuClick} />
                  </PopoverContent>
                </Popover>
              </FocusTrap>
              <FocusTrap
                active={menuState.profile}
                focusTrapOptions={{
                  clickOutsideDeactivates: () => {
                    handleOnMenuClick(ShellMenu.Profile);
                    return true;
                  },
                  escapeDeactivates: () => {
                    handleOnMenuClick(ShellMenu.Profile);
                    return true;
                  },
                }}
              >
                <Popover caret={false} open={menuState.profile} align="bottom-right">
                  <button
                    className="cds--btn--icon-only cds--btn cds--btn--ghost cds--btn--icon-only cds--btn cds--btn--ghost"
                    onClick={() => handleOnMenuClick(ShellMenu.Profile, !menuState.profile)}
                    tabIndex={menuState.profile ? -1 : 0}
                  >
                    <UserIcon size={20} />
                  </button>
                  <PopoverContent>
                    <UserMenu isOpen={menuState.profile} handleOnMenuClick={handleOnMenuClick} />
                  </PopoverContent>
                </Popover>
              </FocusTrap>
              <FocusTrap
                active={menuState.switcher}
                focusTrapOptions={{
                  clickOutsideDeactivates: () => {
                    handleOnMenuClick(ShellMenu.Switcher);
                    return true;
                  },
                  escapeDeactivates: () => {
                    handleOnMenuClick(ShellMenu.Switcher);
                    return true;
                  },
                }}
              >
                <div>
                  <button
                    className="cds--btn--icon-only cds--btn cds--btn--ghost cds--btn--icon-only cds--btn cds--btn--ghost"
                    onClick={() => handleOnMenuClick(ShellMenu.Switcher, !menuState.switcher)}
                    tabIndex={menuState.switcher ? 0 : -1}
                  >
                    <Switcher size={20} />
                  </button>
                  <HeaderPanel aria-label="Header Panel" expanded={menuState.switcher}>
                    <SideNavItems>
                      <SideNavLink
                        renderIcon={IntrusionPrevention}
                        element={Link}
                        to={`workspaces/${1}`}
                        onClick={() => handleOnMenuClick(ShellMenu.Switcher)}
                        tabIndex={menuState.switcher ? 0 : -1}
                      >
                        Team 1
                      </SideNavLink>
                      <SideNavLink
                        renderIcon={UserProfile}
                        element={Link}
                        to={`workspaces/${1}`}
                        onClick={() => handleOnMenuClick(ShellMenu.Switcher)}
                        tabIndex={menuState.switcher ? 0 : -1}
                      >
                        Team 2
                      </SideNavLink>
                      <SideNavLink
                        renderIcon={Group}
                        element={Link}
                        to={`workspaces/${1}`}
                        onClick={() => handleOnMenuClick(ShellMenu.Switcher)}
                        tabIndex={menuState.switcher ? 0 : -1}
                      >
                        Team 3
                      </SideNavLink>
                      <SideNavLink
                        renderIcon={Bot}
                        element={Link}
                        to={`workspaces/${1}`}
                        onClick={() => handleOnMenuClick(ShellMenu.Switcher)}
                        tabIndex={menuState.switcher ? 0 : -1}
                      >
                        Team 4
                      </SideNavLink>
                    </SideNavItems>
                  </HeaderPanel>
                </div>
              </FocusTrap>
            </HeaderGlobalBar>
            <SideNav
              aria-label="Side navigation"
              expanded={false}
              style={{ borderRight: "1px solid var(--cds-border-subtle)" }}
            >
              <SideNavItems>
                <SideNavLink renderIcon={IntrusionPrevention} element={Link} to="Insights">
                  Insights
                </SideNavLink>
                <SideNavLink renderIcon={UserProfile} element={Link} to="Teams">
                  Teams
                </SideNavLink>
                <SideNavLink renderIcon={Group} element={Link} to="Users">
                  Users
                </SideNavLink>
                <SideNavLink renderIcon={Bot} element={Link} to="Settings">
                  Settings
                </SideNavLink>
              </SideNavItems>
            </SideNav>
          </Header>
        )}
      ></HeaderContainer>
    </Theme>
  );
}

interface HeaderMenuShellProps {
  isOpen: boolean;
  handleOnMenuClick: (menu: ShellMenuType) => void;
}

function UserMenu(props: HeaderMenuShellProps) {
  return (
    <SideNavItems style={{ width: "16rem" }}>
      <SideNavLink
        renderIcon={IntrusionPrevention}
        element={Link}
        to="profile"
        onClick={() => props.handleOnMenuClick(ShellMenu.Profile)}
        tabIndex={props.isOpen ? 0 : -1}
      >
        Profile
      </SideNavLink>
      <SideNavLink
        renderIcon={UserProfile}
        element={Link}
        to="settings"
        onClick={() => props.handleOnMenuClick(ShellMenu.Profile)}
        tabIndex={props.isOpen ? 0 : -1}
      >
        Settings
      </SideNavLink>
      <SideNavLink
        renderIcon={Group}
        element={Link}
        onClick={() => {
          props.handleOnMenuClick(ShellMenu.Profile);
        }}
        to="/"
        tabIndex={props.isOpen ? 0 : -1}
        type="submit"
      >
        Sign Out
      </SideNavLink>
    </SideNavItems>
  );
}

function SupportMenu(props: HeaderMenuShellProps) {
  return (
    <SideNavItems style={{ width: "16rem" }}>
      <SideNavLink
        renderIcon={IntrusionPrevention}
        element={Link}
        to="profile"
        onClick={() => props.handleOnMenuClick(ShellMenu.Support)}
        tabIndex={props.isOpen ? 0 : -1}
      >
        Support Center
      </SideNavLink>
      <SideNavLink
        renderIcon={UserProfile}
        element={Link}
        to="settings"
        onClick={() => props.handleOnMenuClick(ShellMenu.Profile)}
        tabIndex={props.isOpen ? 0 : -1}
      >
        Submit an Idea
      </SideNavLink>
    </SideNavItems>
  );
}

function ModalWrapper() {
  const [isOpen, setIsOpen] = React.useState(false);
}

export default Shell;
