import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { prefix } from "../../internal/settings";



const HeaderRightPanel = ({ content, className }) => {
  const classNames = cx(`${prefix}--bmrg-right-panel`, className);

  return <nav className={classNames}>{content}</nav>;
};

HeaderRightPanel.propTypes = {
  content: PropTypes.element,
  className: PropTypes.string,
};

export default HeaderRightPanel;
