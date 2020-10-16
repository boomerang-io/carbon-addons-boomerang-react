import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';

import SidenavHeader from './SidenavHeader';
import SidenavContent from './SidenavContent';
import SidenavFooter from './SidenavFooter';
import SidenavLinks from './SidenavLinks';

const { prefix } = settings;

const Sidenav = ({ header, hidden, content, navItems, footer, theme, ...rest }) => {
  const classNames = classnames(`${prefix}--bmrg-sidenav`, `--${theme}`, {
    '--hidden': hidden,
  });
  return (
    <aside className={classNames} {...rest}>
      {header && <SidenavHeader>{header()}</SidenavHeader>}
      {content && <SidenavContent>{content()}</SidenavContent>}
      {navItems && <SidenavLinks navItems={navItems} theme={theme} />}
      {footer && <SidenavFooter>{footer()}</SidenavFooter>}
    </aside>
  );
};

Sidenav.propTypes = {
  content: PropTypes.func,
  footer: PropTypes.func,
  header: PropTypes.func,
  hidden: PropTypes.bool,
  navItems: PropTypes.array,
  theme: PropTypes.string,
};

Sidenav.defaultProps = {
  theme: 'bmrg-black',
};

export default Sidenav;
