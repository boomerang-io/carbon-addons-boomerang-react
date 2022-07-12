import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import {
  Chat,
  Debug,
  Group,
  Idea, 
  Information,
  Launch,
  Locked,
  Power,
  Workspace,
} from "@carbon/react/icons";

import HeaderMenuModalWrapper from "../../internal/HeaderMenuModalWrapper";



const iconClassName = `${prefix}--bmrg-header-menu-item__img`;
const iconFill = "#FBFCFC";

const iconMapping = {
  workspace: <Workspace size={16} fill={iconFill} className={iconClassName} />,
  group: <Group size={16} fill={iconFill} className={iconClassName} />,
  chat: <Chat size={16} fill={iconFill} className={iconClassName} />,
  debug: <Debug size={16} fill={iconFill} className={iconClassName} />,
  power: <Power size={16} fill={iconFill} className={iconClassName} />,
  information: <Information size={16} fill={iconFill} className={iconClassName} />,
  locked: <Locked size={16} fill={iconFill} className={iconClassName} />,
  launch: <Launch size={16} fill={iconFill} className={iconClassName} />,
  idea: <Idea size={16}  fill={iconFill} className={iconClassName} />,
};

HeaderMenuItem.propTypes = {
  /**
   * alt text for carbon icon
   */
  altIconText: PropTypes.string,
  /**
   * override default className
   */
  className: PropTypes.string,
  /**
   * user specifies what to render when HeaderMenuItem is clicked
   */
  children: PropTypes.any,
  forwardRef: PropTypes.object,
  /**
   * carbon name for icon to be rendered (internally mapped)
   */
  iconName: PropTypes.oneOf([
    "workspace",
    "group",
    "chat",
    "debug",
    "power",
    "information",
    "locked",
    "launch",
    "idea",
  ]),
  /**
   *
   */
  style: PropTypes.object,
  /**
   * text to be displayed next to the icon
   */
  text: PropTypes.string.isRequired,

  /**
   * props to modalWrapper
   */
  disabled: PropTypes.bool,
};

HeaderMenuItem.defaultProps = {
  iconName: "launch",
};

function HeaderMenuItem({
  children,
  className,
  forwardRef,
  iconName,
  preventCloseOnClickOutside,
  style,
  text,
  ...rest
}) {
  const wrapperClassNames = cx(`${prefix}--bmrg-header-menu-item-wrapper`, {
    [className]: !!className,
  });

  return (
    <div className={wrapperClassNames} style={style} role="presentation" ref={forwardRef}>
      <HeaderMenuModalWrapper
        preventCloseOnClickOutside={preventCloseOnClickOutside}
        buttonTriggerClassName={`${prefix}--bmrg-header-menu-item`}
        buttonTriggerText={
          <div className={`${prefix}--bmrg-header-menu-item__content`}>
            <div className={`${prefix}--bmrg-header-menu-item__img`}>{iconMapping[iconName]}</div>
            <span className={`${prefix}--bmrg-header-menu-item__text`}>{text}</span>
          </div>
        }
        {...rest}
      >
        {children}
      </HeaderMenuModalWrapper>
    </div>
  );
}

export default (() => {
  const forwardRef = (props, ref) => <HeaderMenuItem {...props} forwardRef={ref} />;
  forwardRef.displayName = "HeaderMenuItem";
  return React.forwardRef(forwardRef);
})();
