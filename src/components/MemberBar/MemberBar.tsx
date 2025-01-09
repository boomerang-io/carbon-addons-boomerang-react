/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { CloseOutline } from "@carbon/react/icons";
import cx from "classnames";
import Avatar from "../Avatar";
import { prefix } from "../../internal/settings";

type Props = {
  addUser?: (id?: string) => any;
  avatarProps?: any;
  avatarSrc?: string;
  buttonClassName?: string;
  buttonProps?: any;
  email?: string;
  id: string;
  isDetail?: boolean;
  isPartner?: boolean;
  isUserNotAllowed?: boolean;
  liProps?: any;
  name?: string;
  notAllowedMessage?: string;
  removeUser?: (id: string) => any;
};

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
}: Props) {
  const avatarOpacity = isUserNotAllowed ? "0.8" : "1";
  return (
    <li {...liProps}>
      <button
        className={cx(`${prefix}--bmrg-member-bar`, buttonClassName, {
          [`${prefix}--bmrg-member-bar--detail`]: isDetail,
        })}
        disabled={isUserNotAllowed}
        onClick={addUser && !isUserNotAllowed ? () => addUser(id) : removeUser ? () => removeUser(id) : undefined}
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
                title="Remove user"
                data-testid="remove-user-button"
              />
            )}
          </div>
        )}
      </button>
    </li>
  );
}

export default MemberBar;
