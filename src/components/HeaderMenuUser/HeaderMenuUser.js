import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';
import Avatar from '../Avatar';
import HeaderMenuModalWrapper from '../../internal/HeaderMenuModalWrapper';

const { prefix } = settings;

const UserHeaderMenuItem = ({ children, className, forwardRef, src, style, userName, ...rest }) => {
  const wrapperClassNames = cx(`${prefix}--bmrg-header-menu-item-wrapper`, {
    [className]: !!className,
  });

  return (
    <div className={wrapperClassNames} style={style} role="presentation" ref={forwardRef}>
      <HeaderMenuModalWrapper
        buttonTriggerClassName={`${prefix}--bmrg-header-menu-item`}
        buttonTriggerText={
          <div className={`${prefix}--bmrg-header-menu-user`}>
            <Avatar size="medium" src={src} username={userName} />
            <p className={`${prefix}--bmrg-header-menu-user__name`}> {userName ? userName : ''} </p>
          </div>
        }
        {...rest}
      >
        {children}
      </HeaderMenuModalWrapper>
    </div>
  );
};

UserHeaderMenuItem.propTypes = {
  userName: PropTypes.string,
  src: PropTypes.string,
};

export default UserHeaderMenuItem;
