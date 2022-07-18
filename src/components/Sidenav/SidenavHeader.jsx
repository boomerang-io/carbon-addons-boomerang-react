
import PropTypes from "prop-types";
import { prefix } from "../../internal/settings";



const SidenavHeader = ({ children, ...rest }) => {
  return (
    <header className={`${prefix}--bmrg-sidenav-header`} {...rest}>
      {children}
    </header>
  );
};

SidenavHeader.propTypes = {
  children: PropTypes.node,
};

export default SidenavHeader;
