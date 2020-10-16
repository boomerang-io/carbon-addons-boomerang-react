import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

import Avatar from '../Avatar';

const { prefix } = settings;

const UserHeaderMenuItem = (props) => {
  return (
    <div className={`${prefix}--bmrg-header-menu-user`}>
      <Avatar size="medium" {...props} />
      <p className={`${prefix}--bmrg-header-menu-user__name`}>
        {' '}
        {props.userName ? props.userName : ''}{' '}
      </p>
    </div>
  );
};

UserHeaderMenuItem.propTypes = {
  userName: PropTypes.string,
  rest: PropTypes.shape({
    src: PropTypes.string,
  }),
};

export default UserHeaderMenuItem;
