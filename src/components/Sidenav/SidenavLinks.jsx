import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import { prefix } from "../../internal/settings";



const SidenavLinks = ({ navItems, theme, ...rest }) => {
  const linkClassNames = cx(`${prefix}--bmrg-sidenav-links__link`, `--${theme}`);
  const textClassNames = cx(`${prefix}--bmrg-sidenav-links__text`, `--${theme}`);
  return (
    <nav className={`${prefix}--bmrg-sidenav-links`} {...rest}>
      {navItems.map((navItem) => (
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

SidenavLinks.propTypes = {
  navItems: PropTypes.array.isRequired,
  theme: PropTypes.string,
};

SidenavLinks.defaultProps = {
  theme: "bmrg-black",
};

export default SidenavLinks;
