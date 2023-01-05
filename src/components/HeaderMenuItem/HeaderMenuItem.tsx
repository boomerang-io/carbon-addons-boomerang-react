import React from "react";
import { HeaderMenuItem } from "@carbon/react";
import Avatar from "../Avatar";
import { ArrowRight, Launch } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

type Shared = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  variant?: "danger" | "default";
};

type Props =
  | (Shared & {
      external?: boolean;
      href: string;
      kind: "link";
      onClick?: () => void;
      text: string;
    })
  | (Shared & {
      onClick: () => void;
      kind: "button";
      text: string;
    })
  | (Shared & {
      onClick: () => void;
      kind: "user";
      src: string;
      userName?: string;
    });

function BmrgHeaderMenuItem(props: Props) {
  const { kind, icon, onClick, variant = "default", ...rest } = props;

  if (props.kind === "button")
    return (
      <HeaderMenuItem
        aria-label={`Link for ${props.text}`}
        // eslint-disable-next-line no-script-url
        href={"javascript:void(0)"}
        onClick={onClick}
        {...rest}
      >
        <div className={`${prefix}--bmrg-header-menu-item__content ${variant === "danger" ? "--danger" : ""}`}>
          <span className={`${prefix}--bmrg-header-menu-item__text`}>
            {icon}
            {props.text}
          </span>
        </div>
      </HeaderMenuItem>
    );

  if (props.kind === "link") {
    const externalProps = props.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <HeaderMenuItem aria-label={`Button for ${props.text}`} href={props.href} {...externalProps} onClick={onClick}>
        <div className={`${prefix}--bmrg-header-menu-item__content ${variant === "danger" ? "--danger" : ""}`}>
          <span className={`${prefix}--bmrg-header-menu-item__text`}>
            {icon}
            {props.text}
          </span>
          {props.external ? <Launch /> : <ArrowRight />}
        </div>
      </HeaderMenuItem>
    );
  }

  if (props.kind === "user") {
    return (
      // eslint-disable-next-line no-script-url
      <HeaderMenuItem aria-label={`Manage ${props.userName} settings`} href={"javascript:void(0)"} onClick={onClick}>
        <div className={`${prefix}--bmrg-header-menu-user`}>
          <Avatar size="medium" src={props.src} userName={props.userName} />
          <p className={`${prefix}--bmrg-header-menu-user__name`}> {props.userName ? props.userName : ""} </p>
        </div>
      </HeaderMenuItem>
    );
  }

  return null;
}

export default BmrgHeaderMenuItem;
