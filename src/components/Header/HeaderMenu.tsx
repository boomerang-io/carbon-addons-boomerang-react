import React from "react";
import { prefix } from "../../internal/settings";

type Props = {
  children?: any;
  id: string;
};

function HeaderMenu({ children, id }: Props) {
  return (
    <ul className={`${prefix}--bmrg-header-drop-down`} role="menu" id={id}>
      {children}
    </ul>
  );
}

export default HeaderMenu;
