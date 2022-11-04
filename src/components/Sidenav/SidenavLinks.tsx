import React from "react";
import cx from "classnames";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { NavLink } from "react-router-dom";
import { prefix } from "../../internal/settings";

type OwnProps = {
  navItems: any[];
  theme?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof SidenavLinks.defaultProps;

// @ts-expect-error TS(7022): 'SidenavLinks' implicitly has type 'any' because i... Remove this comment to see the full error message
const SidenavLinks = ({ navItems, theme, ...rest }: Props) => {
  const linkClassNames = cx(`${prefix}--bmrg-sidenav-links__link`, `--${theme}`);
  const textClassNames = cx(`${prefix}--bmrg-sidenav-links__text`, `--${theme}`);
  return (
    <nav className={`${prefix}--bmrg-sidenav-links`} {...rest}>
      {navItems.map((navItem: any) => (
        <NavLink
          activeClassName={`${prefix}--bmrg-sidenav-links__link--is-active`}
          className={linkClassNames}
          to={navItem.path}
          key={navItem.text}
          exact={navItem.exact}
        >
          <div className={textClassNames}>{navItem.text}</div>
        </NavLink>
      ))}
    </nav>
  );
};

SidenavLinks.defaultProps = {
  theme: "bmrg-black",
};

export default SidenavLinks;
