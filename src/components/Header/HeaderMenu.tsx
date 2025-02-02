/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { prefix } from "../../internal/settings";

type Props = {
  ["aria-labelledby"]: string;
  children?: any;
  id: string;
};

function HeaderMenu({ children, id, ...rest }: Props) {
  return (
    <ul className={`${prefix}--bmrg-header-drop-down`} id={id} role="menu" {...rest}>
      {children}
    </ul>
  );
}

export default HeaderMenu;
