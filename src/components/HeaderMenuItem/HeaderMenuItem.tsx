import React from "react";
import { Button } from "@carbon/react";
import { prefix } from "../../internal/settings";

type Props = {
  icon: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  text: string;
  disabled?: boolean;
  onClick: () => void;
};

function HeaderMenuItem({ className = "", style, text, icon, onClick, ...rest }: Props) {
  return (
    <Button className="cds--bmrg-header-menu-item" onClick={onClick} {...rest}>
      <div className={`${prefix}--bmrg-header-menu-item__content`}>
        <div className={`${prefix}--bmrg-header-menu-item__img`}>{icon}</div> 
        <span className={`${prefix}--bmrg-header-menu-item__text`}>{text}</span>
      </div>
    </Button>
  );
}

export default HeaderMenuItem;
