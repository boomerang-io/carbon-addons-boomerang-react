import React from "react";
import cx from "classnames";
import { Button } from "@carbon/react";
import { Chat, Debug, Group, Information, Launch, Locked, Power, Workspace } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

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
};

HeaderMenuButton.defaultProps = {
  className: "",
  iconName: "launch",
};

type OwnProps = {
  altIconText?: string;
  className?: string;
  children?: any;
  iconName?: "workspace" | "group" | "chat" | "debug" | "power" | "information" | "locked" | "launch";
  onClick?: (...args: any[]) => any;
  style?: any;
  text: string;
  disabled?: boolean;
};

type Props = OwnProps & typeof HeaderMenuButton.defaultProps;

function HeaderMenuButton({ className, iconName, onClick, style, text, ...rest }: Props) {
  const wrapperClassNames = cx(`${prefix}--bmrg-header-menu-item-wrapper`, {
    [className]: !!className,
  });

  return (
    <div className={wrapperClassNames} style={style} role="presentation">
      <Button className={`${prefix}--bmrg-header-menu-item`} onClick={onClick} {...rest}>
        <div className={`${prefix}--bmrg-header-menu-item__content`}>
          <div className={`${prefix}--bmrg-header-menu-item__img`}>{iconMapping[iconName]}</div>
          <span className={`${prefix}--bmrg-header-menu-item__text`}>{text}</span>
        </div>
      </Button>
    </div>
  );
}

export default HeaderMenuButton;
