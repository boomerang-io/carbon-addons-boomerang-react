import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const HeaderRightPanel = ({ content, className }) => {
  const classNames = classnames(`${prefix}--bmrg-right-panel`, className);

  return <nav className={classNames}>{content}</nav>;
};

HeaderRightPanel.propTypes = {
  content: PropTypes.element,
  className: PropTypes.string,
};

export default HeaderRightPanel;
