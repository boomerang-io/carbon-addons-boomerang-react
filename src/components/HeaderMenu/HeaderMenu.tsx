import React from "react";
import { prefix } from "../../internal/settings";
import FocusTrap from "focus-trap-react";

type Props = {
  children?: any;
  id: string;
};

function HeaderMenu({ children, id }: Props) {
  return (
    <FocusTrap active focusTrapOptions={{ allowOutsideClick: true, returnFocusOnDeactivate: false }}>
      <div className={`${prefix}--bmrg-header-drop-down`}>
        <ul className={`${prefix}--bmrg-header-drop-down__items`} role="menu" id={id}>
          {React.Children.map(children, (child) => (
            <li className={`${prefix}--bmrg-header-drop-down__item`} aria-label={`${child.key} button`} role="menuitem">
              {child}
            </li>
          ))}
        </ul>
      </div>
    </FocusTrap>
  );
}

export default HeaderMenu;
