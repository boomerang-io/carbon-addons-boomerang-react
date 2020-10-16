import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const HeaderMenuBmrg = (props) => {
  const { isOpen, ...other } = props;
  return (
    <div
      className={classNames(`${prefix}--bmrg-header__app-menu`, {
        '--is-open': isOpen,
      })}
      role="button"
      tabIndex="0"
      aria-expanded={isOpen}
      aria-label="header menu button"
      {...other}
    >
      <svg height="32" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32">
        <g className="icon">
          <rect className="bar1" x="0" y="0" width="32" height="4" rx="2" />
          <rect className="bar2" x="0" y="12" width="32" height="4" rx="2" />
          <rect className="bar3" x="0" y="24" width="32" height="4" rx="2" />
        </g>
      </svg>
    </div>
  );
};

HeaderMenuBmrg.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default HeaderMenuBmrg;
