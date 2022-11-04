import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import { Chat, Debug, Group, Idea, Information, Launch, Locked, Power, Workspace } from "@carbon/react/icons";

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
  idea: <Idea size={16} fill={iconFill} className={iconClassName} />,
};

HeaderMenuItem.defaultProps = {
  iconName: "launch",
};

type OwnProps = {
    altIconText?: string;
    className?: string;
    children?: any;
    forwardRef?: any;
    iconName?: "workspace" | "group" | "chat" | "debug" | "power" | "information" | "locked" | "launch" | "idea";
    style?: any;
    text: string;
    disabled?: boolean;
};

type Props = OwnProps & typeof HeaderMenuItem.defaultProps;

// @ts-expect-error TS(2339): Property 'preventCloseOnClickOutside' does not exi... Remove this comment to see the full error message
function HeaderMenuItem({ children, className, forwardRef, iconName, preventCloseOnClickOutside, style, text, ...rest }: Props) {
  const wrapperClassNames = cx(`${prefix}--bmrg-header-menu-item-wrapper`, {
    // @ts-expect-error TS(2464): A computed property name must be of type 'string',... Remove this comment to see the full error message
    [className]: !!className,
  });

  return (
    <div className={wrapperClassNames} style={style} role="presentation" ref={forwardRef}>
      <HeaderMenuModalWrapper
        // @ts-expect-error TS(2769): No overload matches this call.
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
  const forwardRef = (props: any, ref: any) => <HeaderMenuItem {...props} forwardRef={ref} />;
  forwardRef.displayName = "HeaderMenuItem";
  return React.forwardRef(forwardRef);
})();
