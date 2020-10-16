import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;

const SidenavContent = ({ children, ...rest }) => {
  return (
    <main className={`${prefix}--bmrg-sidenav-content`} {...rest}>
      {children}
    </main>
  );
};

SidenavContent.propTypes = {
  children: PropTypes.node,
};

export default SidenavContent;
