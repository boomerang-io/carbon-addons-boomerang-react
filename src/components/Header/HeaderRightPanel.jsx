import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { prefix } from "../../internal/settings";

const HeaderRightPanel = ({ children, className, isOpen, ...rest }) => {
  const classNames = cx(`${prefix}--bmrg-right-panel`, className, { "--is-hidden": !isOpen });
  return (
    <nav className={classNames} {...rest}>
      {children}
    </nav>
  );
};

HeaderRightPanel.propTypes = {
  content: PropTypes.element,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
};

export default HeaderRightPanel;
