
import PropTypes from "prop-types";
import { prefix } from "../../internal/settings";



const SidenavContent = ({ children, ...rest }) => {
  return (
    <main className={`${prefix}--bmrg-sidenav-content`} {...rest}>
      {children}
    </main>
  );
};

SidenavContent.propTypes = {
  children: PropTypes.node,
};

export default SidenavContent;
