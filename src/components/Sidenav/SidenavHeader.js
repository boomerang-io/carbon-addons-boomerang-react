import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;

const SidenavHeader = ({ children, ...rest }) => {
  return (
    <header className={`${prefix}--bmrg-sidenav-header`} {...rest}>
      {children}
    </header>
  );
};

SidenavHeader.propTypes = {
  children: PropTypes.node,
};

export default SidenavHeader;
