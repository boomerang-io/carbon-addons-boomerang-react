
import PropTypes from "prop-types";
import { prefix } from "../../internal/settings";
import FocusTrap from "focus-trap-react";



function HeaderMenu({ children }) {
  return (
    <FocusTrap active focusTrapOptions={{ allowOutsideClick: true }}>
      <div className={`${prefix}--bmrg-header-drop-down`}>
        <ul className={`${prefix}--bmrg-header-drop-down__items`} role="menu">
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

HeaderMenu.propTypes = {
  children: PropTypes.any,
};

export default HeaderMenu;
