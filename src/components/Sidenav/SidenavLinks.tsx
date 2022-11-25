import React from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import { prefix } from "../../internal/settings";

SidenavLinks.defaultProps = {
  theme: "bmrg-black",
};

type OwnProps = {
  navItems: any[];
  theme?: string;
};

type Props = OwnProps & typeof SidenavLinks.defaultProps;

function SidenavLinks({ navItems, theme, ...rest }: Props) {
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
}

export default SidenavLinks;
