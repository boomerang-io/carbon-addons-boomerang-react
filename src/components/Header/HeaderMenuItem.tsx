/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { HeaderMenuItem as CarbonHeaderMenuItem } from "@carbon/react";
import { ArrowRight, Launch } from "@carbon/react/icons";
import Avatar from "../Avatar";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Shared = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  element?: React.FC<any>;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  variant?: "danger" | "default";
};

type Props =
  | (Shared & {
      href: string;
      kind: "app" | "internal" | "external";
      onClick?: () => void;
      text: string;
      type: "link";
    })
  | (Shared & {
      onClick: () => void;
      text: string;
      type: "button";
    })
  | (Shared & {
      onClick: () => void;
      src: string;
      type: "user";
      userName?: string;
    });

function HeaderMenuItem(props: Props, ref: React.ForwardedRef<HTMLLinkElement>) {
  if (props.type === "button") {
    const { icon, onClick, type, text, variant = "default", ...rest } = props;
    return (
      <CarbonHeaderMenuItem
        // eslint-disable-next-line no-script-url
        href={"javascript:void(0)"}
        onClick={onClick}
        role="menuitem"
        ref={ref}
        {...rest}
      >
        <div className={`${prefix}--bmrg-header-menu-item__content ${variant === "danger" ? "--danger" : ""}`}>
          <span className={`${prefix}--bmrg-header-menu-item__text`}>
            {icon}
            {text}
          </span>
        </div>
      </CarbonHeaderMenuItem>
    );
  }
  if (props.type === "link") {
    const { href, icon, kind, onClick, text, type, variant = "default", ...rest } = props;
    const externalProps = kind === "external" ? { target: "_blank", rel: "noopener noreferrer" } : {};
    let linkTypeIcon;
    switch (kind) {
      case "external":
        break;
      case "internal":
        linkTypeIcon = <ArrowRight title="Opens link within same platform" />;
        break;
      case "app":
      default:
      // no-op
    }
    return (
      <CarbonHeaderMenuItem href={href} {...externalProps} onClick={onClick} role="menuitem" ref={ref} {...rest}>
        <div className={cx(`${prefix}--bmrg-header-menu-item__content`, { "--danger": variant === "danger" })}>
          <span className={`${prefix}--bmrg-header-menu-item__text`}>
            {icon}
            {text}
          </span>
          {linkTypeIcon}
        </div>
      </CarbonHeaderMenuItem>
    );
  }

  if (props.type === "user") {
    const { icon, onClick = "default", src, type, userName, ...rest } = props;
    return (
      // eslint-disable-next-line no-script-url
      <CarbonHeaderMenuItem href={"javascript:void(0)"} onClick={onClick} role="menuitem" ref={ref} {...rest}>
        <div className={`${prefix}--bmrg-header-menu-user`}>
          <Avatar size="medium" src={src} userName={userName} />
          <p className={`${prefix}--bmrg-header-menu-user__name`}> {userName ? userName : ""} </p>
        </div>
      </CarbonHeaderMenuItem>
    );
  }

  return null;
}

export default React.forwardRef(HeaderMenuItem);
