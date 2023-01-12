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
  const { type, icon, onClick, variant = "default", ...rest } = props;

  if (props.type === "button")
    return (
      <CarbonHeaderMenuItem
        href={"#"}
        onClick={onClick}
        role="menuitem"
        ref={ref}
        {...rest}
      >
        <div className={`${prefix}--bmrg-header-menu-item__content ${variant === "danger" ? "--danger" : ""}`}>
          <span className={`${prefix}--bmrg-header-menu-item__text`}>
            {icon}
            {props.text}
          </span>
        </div>
      </CarbonHeaderMenuItem>
    );

  if (props.type === "link") {
    const externalProps = props.kind === "external" ? { target: "_blank", rel: "noopener noreferrer" } : {};
    let linkTypeIcon;
    switch (props.kind) {
      case "external":
        linkTypeIcon = <Launch title="Opens link in new tab" />;
        break;
      case "internal":
        linkTypeIcon = <ArrowRight title="Opens link within same platform" />;
        break;
      case "app":
      default:
      // no-op
    }
    return (
      <CarbonHeaderMenuItem href={props.href} {...externalProps} onClick={onClick} role="menuitem" ref={ref} {...rest}>
        <div className={cx(`${prefix}--bmrg-header-menu-item__content`, { "--danger": variant === "danger" })}>
          <span className={`${prefix}--bmrg-header-menu-item__text`}>
            {icon}
            {props.text}
          </span>
          {linkTypeIcon}
        </div>
      </CarbonHeaderMenuItem>
    );
  }

  if (props.type === "user") {
    return (
      // eslint-disable-next-line no-script-url
      <CarbonHeaderMenuItem href={`#`} onClick={onClick} role="menuitem" ref={ref} {...rest}>
        <div className={`${prefix}--bmrg-header-menu-user`}>
          <Avatar size="medium" src={props.src} userName={props.userName} />
          <p className={`${prefix}--bmrg-header-menu-user__name`}> {props.userName ? props.userName : ""} </p>
        </div>
      </CarbonHeaderMenuItem>
    );
  }

  return null;
}

export default React.forwardRef(HeaderMenuItem);
