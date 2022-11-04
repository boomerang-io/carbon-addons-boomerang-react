import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import { Button } from "@carbon/react";
import {
  ArrowRight,
  Chat,
  Debug,
  Email,
  Forum,
  HelpDesk,
  Group,
  Information,
  Launch,
  Locked,
  Power,
  Workspace,
} from "@carbon/react/icons";

const iconClassName = `${prefix}--bmrg-header-menu-item__img`;
const iconFill = "#FBFCFC";

const iconMapping = {
  chat: <Chat size={16} fill={iconFill} className={iconClassName} />,
  debug: <Debug size={16} fill={iconFill} className={iconClassName} />,
  email: <Email size={16} fill={iconFill} className={iconClassName} />,
  forum: <Forum size={16} fill={iconFill} className={iconClassName} />,
  group: <Group size={16} fill={iconFill} className={iconClassName} />,
  information: <Information size={16} fill={iconFill} className={iconClassName} />,
  launch: <Launch size={16} fill={iconFill} className={iconClassName} />,
  locked: <Locked size={16} fill={iconFill} className={iconClassName} />,
  power: <Power size={16} fill={iconFill} className={iconClassName} />,
  support: <HelpDesk size={16} fill={iconFill} className={iconClassName} />,
  workspace: <Workspace size={16} fill={iconFill} className={iconClassName} />,
};

type Props = {
    altIconText?: string;
    className?: string;
    children?: any;
    href: string;
    iconName?: "chat" | "debug" | "email" | "forum" | "group" | "information" | "launch" | "locked" | "power" | "support" | "workspace";
    style?: any;
    text: string;
    disabled?: boolean;
    external?: boolean;
};

function HeaderMenuLink({ className, external = true, href, iconName, style, text, ...rest }: Props) {
  const wrapperClassNames = cx(`${prefix}--bmrg-header-menu-item-wrapper`, {
    // @ts-expect-error TS(2464): A computed property name must be of type 'string',... Remove this comment to see the full error message
    [className]: !!className,
  });

  // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
  const iconToRender = iconMapping[iconName];

  return (
    <div className={wrapperClassNames} style={style} role="presentation">
      <Button
        className={`${prefix}--bmrg-header-menu-item`}
        href={href}
        role="link"
        {...rest}
        aria-label={`link for ${text}`}
      >
        <div className={`${prefix}--bmrg-header-menu-item__content`}>
          {Boolean(iconToRender) && (
            // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
            <div className={`${prefix}--bmrg-header-menu-item__img`}>{iconMapping[iconName]}</div>
          )}
          <span className={`${prefix}--bmrg-header-menu-item__text`}>
            {text}
            {external ? (
              <Launch
                size={16}
                fill={iconFill}
                className={iconClassName}
                style={{ height: "0.75rem" }}
                aria-label={`${text} icon`}
              />
            ) : (
              <ArrowRight
                size={16}
                fill={iconFill}
                className={iconClassName}
                style={{ height: "0.75rem" }}
                aria-label={`${text} icon`}
              />
            )}
          </span>
        </div>
      </Button>
    </div>
  );
}

export default HeaderMenuLink;
