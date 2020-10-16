import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Avatar from '../Avatar';
import { CloseOutline32 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

function MemberBar({
  addUser,
  avatarProps = {},
  avatarSrc,
  buttonClassName = "",
  buttonProps = {},
  email, 
  id,
  isDetail = false,
  liProps = {},
  name, 
  removeUser, 
}) {
  return (
    <li {...liProps}>
      <button
        className={cx(`${prefix}--bmrg-member-bar`, buttonClassName, {
          [`${prefix}--bmrg-member-bar--detail`]: isDetail,
        })}
        onClick={addUser ? () => addUser(id) : removeUser ? () => removeUser(id) : () => {}}
        type="button"
        {...buttonProps}
      >
        <div className={`${prefix}--bmrg-member-bar__user`}>
          <Avatar src={avatarSrc} {...avatarProps}/>
          <div className={`${prefix}--bmrg-member-bar__data`}>
            <p className={`${prefix}--bmrg-member-bar__name`}>{name}</p>
            <p className={`${prefix}--bmrg-member-bar__email`}>{email}</p>
          </div>
        </div>
        {removeUser && (
          <CloseOutline32
            className={`${prefix}--bmrg-member-bar__close-icon`}
            alt="remove user"
            data-testid="remove-user-button"
          />
        )}
      </button>
    </li>
  );
}

MemberBar.propTypes = {
  addUser: PropTypes.func,
  avatarProps: PropTypes.object,
  avatarSrc: PropTypes.string,
  buttonClassName: PropTypes.string,
  buttonProps: PropTypes.object,
  email: PropTypes.string,
  id: PropTypes.string,
  isDetail: PropTypes.bool,
  liProps: PropTypes.object,
  name: PropTypes.string,
  removeUser: PropTypes.func,
};

export default MemberBar;
