import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import Avatar from "../Avatar";
import HeaderMenuModalWrapper from "../../internal/HeaderMenuModalWrapper";

type Props = {
  children?: any;
  className?: string;
  forwardRef?: any;
  src: string;
  style?: React.CSSProperties;
  userName?: string;
};

const UserHeaderMenuItem = ({ children, className = "", forwardRef, src, style, userName, ...rest }: Props) => {
  const wrapperClassNames = cx(`${prefix}--bmrg-header-menu-item-wrapper`, {
    [className]: !!className,
  });

  return (
    <div className={wrapperClassNames} style={style} role="presentation" ref={forwardRef}>
      <HeaderMenuModalWrapper
        preventCloseOnClickOutside
        buttonTriggerClassName={`${prefix}--bmrg-header-menu-item`}
        buttonTriggerText={
          <div className={`${prefix}--bmrg-header-menu-user`}>
            <Avatar size="medium" src={src} userName={userName} />
            <p className={`${prefix}--bmrg-header-menu-user__name`}> {userName ? userName : ""} </p>
          </div>
        }
        {...rest}
      >
        {children}
      </HeaderMenuModalWrapper>
    </div>
  );
};

export default UserHeaderMenuItem;
