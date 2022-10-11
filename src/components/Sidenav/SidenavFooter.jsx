import React from "react";
import PropTypes from "prop-types";
import { prefix } from "../../internal/settings";



const SidenavFooter = ({ children, ...rest }) => {
  return (
    <footer className={`${prefix}--bmrg-sidenav-footer`} {...rest}>
      {children}
    </footer>
  );
};

SidenavFooter.propTypes = {
  children: PropTypes.node,
};

export default SidenavFooter;
