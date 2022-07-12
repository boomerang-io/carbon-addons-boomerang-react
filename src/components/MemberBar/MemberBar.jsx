import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Avatar from "../Avatar";
import { CloseOutline } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";



function MemberBar({
  addUser,
  avatarProps = {},
  avatarSrc,
  buttonClassName = "",
  buttonProps = {},
  email,
  id,
  isDetail = false,
  isPartner = false,
  isUserNotAllowed = false,
  liProps = {},
  name,
  notAllowedMessage = "This Partner User is not on the allow-list",
  removeUser,
}) {
  const avatarOpacity = isUserNotAllowed ? "0.5" : "1";
  return (
    <li {...liProps}>
      <button
        className={cx(`${prefix}--bmrg-member-bar`, buttonClassName, {
          [`${prefix}--bmrg-member-bar--detail`]: isDetail,
        })}
        onClick={addUser && !isUserNotAllowed ? () => addUser(id) : removeUser ? () => removeUser(id) : () => {}}
        type="button"
        {...buttonProps}
      >
        <div className={`${prefix}--bmrg-member-bar__user`}>
          <Avatar src={avatarSrc} {...avatarProps} style={{ opacity: avatarOpacity }} />
          <div className={`${prefix}--bmrg-member-bar__data`} style={{ opacity: avatarOpacity }}>
            <p className={`${prefix}--bmrg-member-bar__name`}>{name}</p>
            <p className={`${prefix}--bmrg-member-bar__email`}>{email}</p>
          </div>
        </div>
        {(isPartner || removeUser || isUserNotAllowed) && (
          <div className={`${prefix}--bmrg-member-bar__right-section`}>
            {isPartner && <p className={`${prefix}--bmrg-member-bar__partner-text`}>Partner User</p>}
            {isUserNotAllowed && (
              <p className={`${prefix}--bmrg-member-bar__partner-not-allowed-text`}>{notAllowedMessage}</p>
            )}
            {removeUser && (
              <CloseOutline
              size={32}
                className={`${prefix}--bmrg-member-bar__close-icon`}
                alt="remove user"
                data-testid="remove-user-button"
              />
            )}
          </div>
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
  isPartner: PropTypes.bool,
  isUserNotAllowed: PropTypes.bool,
  liProps: PropTypes.object,
  name: PropTypes.string,
  notAllowedMessage: PropTypes.string,
  removeUser: PropTypes.func,
};

export default MemberBar;
