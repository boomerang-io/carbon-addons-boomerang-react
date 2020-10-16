import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;

function HeaderMenu({ children }) {
  return (
    <div className={`${prefix}--bmrg-header-drop-down`}>
      <ul className={`${prefix}--bmrg-header-drop-down__items`}>
        {React.Children.map(children, (child) => (
          <li className={`${prefix}--bmrg-header-drop-down__item`}>{child}</li>
        ))}
      </ul>
    </div>
  );
}

HeaderMenu.propTypes = {
  children: PropTypes.any,
};

export default HeaderMenu;
