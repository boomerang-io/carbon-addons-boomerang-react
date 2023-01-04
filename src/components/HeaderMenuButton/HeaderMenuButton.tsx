import React from "react";
import cx from "classnames";
import { Button } from "@carbon/react";
import { Chat, Debug, Group, Information, Launch, Locked, Power, Workspace } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

const iconClassName = `${prefix}--bmrg-header-menu-item__img`;
const iconFill = "#FBFCFC";

const iconMapping = {
  workspace: <Workspace size={16} />,
  group: <Group size={16} />,
  chat: <Chat size={16} />,
  debug: <Debug size={16} />,
  power: <Power size={16} />,
  information: <Information size={16} />,
  locked: <Locked size={16} />,
  launch: <Launch size={16} />,
};

type Props = {
  altIconText?: string;
  className?: string;
  children?: React.ReactNode;
  iconName?: "workspace" | "group" | "chat" | "debug" | "power" | "information" | "locked" | "launch";
  onClick?: (...args: any[]) => any;
  style?: React.CSSProperties;
  text: string;
  disabled?: boolean;
};

function HeaderMenuButton({ className = "", iconName = "launch", onClick, style, text, ...rest }: Props) {
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
