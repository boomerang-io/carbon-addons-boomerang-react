import React from "react";
import { prefix } from "../../internal/settings";
import { HeaderMenuItem } from "@carbon/react";
import { ArrowRight, Launch } from "@carbon/react/icons";

type Shared = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  icon: React.ReactNode;
  style?: React.CSSProperties;
  text: string;
  variant?: "danger" | "default";
};

type Props =
  | (Shared & {
      external?: boolean;
      href: string;
      kind: "link";
      onClick?: () => void;
    })
  | (Shared & {
      onClick: () => void;
      kind: "button";
    });

function BmrgHeaderMenuItem(props: Props) {
  const { kind, text, icon, onClick, variant = "default", ...rest } = props;
  if (props.kind === "button")
    return (
      <HeaderMenuItem
        aria-label={`Link for ${text}`}
        // eslint-disable-next-line no-script-url
        href={"javascript:void(0)"}
        onClick={onClick}
        {...rest}
      >
        <div className={`${prefix}--bmrg-header-menu-item__content ${variant === "danger" ? "--danger" : ""}`}>
          <span className={`${prefix}--bmrg-header-menu-item__text`}>
            {icon}
            {text}
          </span>
        </div>
      </HeaderMenuItem>
    );

  if (props.kind === "link") {
    const externalProps = props.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <HeaderMenuItem aria-label={`Button for ${text}`} href={props.href} {...externalProps} onClick={onClick}>
        <div className={`${prefix}--bmrg-header-menu-item__content ${variant === "danger" ? "--danger" : ""}`}>
          <span className={`${prefix}--bmrg-header-menu-item__text`}>
            {icon}
            {text}
          </span>
          {props.external ? <Launch /> : <ArrowRight />}
        </div>
      </HeaderMenuItem>
    );
  }

  return null;
}

export default BmrgHeaderMenuItem;
