import React from "react";
import { Button } from "@carbon/react";
import Avatar from "../Avatar";
import { prefix } from "../../internal/settings";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick: () => void;
  src: string;
  userName?: string;
};

function UserHeaderMenuItem({ onClick, src, userName, ...rest }: Props) {
  return (
    <Button className="cds--bmrg-header-menu-item" onClick={onClick} {...rest}>
      <div className={`${prefix}--bmrg-header-menu-user`}>
        <Avatar size="medium" src={src} userName={userName} />
        <p className={`${prefix}--bmrg-header-menu-user__name`}> {userName ? userName : ""} </p>
      </div>
    </Button>
  );
}

export default UserHeaderMenuItem;
