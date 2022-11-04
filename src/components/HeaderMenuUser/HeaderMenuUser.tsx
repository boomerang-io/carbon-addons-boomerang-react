import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import Avatar from "../Avatar";
import HeaderMenuModalWrapper from "../../internal/HeaderMenuModalWrapper";

type Props = {
    userName?: string;
    src?: string;
};



// @ts-expect-error TS(2339): Property 'children' does not exist on type 'Props'... Remove this comment to see the full error message
const UserHeaderMenuItem = ({ children, className, forwardRef, src, style, userName, ...rest }: Props) => {
  const wrapperClassNames = cx(`${prefix}--bmrg-header-menu-item-wrapper`, {
    [className]: !!className,
  });

  return (
    <div className={wrapperClassNames} style={style} role="presentation" ref={forwardRef}>
      <HeaderMenuModalWrapper
        // @ts-expect-error TS(2769): No overload matches this call.
        preventCloseOnClickOutside
        buttonTriggerClassName={`${prefix}--bmrg-header-menu-item`}
        buttonTriggerText={
          <div className={`${prefix}--bmrg-header-menu-user`}>
            {/* @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message */}
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
