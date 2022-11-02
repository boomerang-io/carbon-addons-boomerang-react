
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { prefix } from "../../internal/settings";



const Option = ({ className, text, id, selected, onSelect, ...rest }) => {
  const classNames = cx(className, { "--selected": selected });

  return (
    <button type="button" className={classNames} onClick={(e) => onSelect(id, e)} {...rest}>
      {text}
    </button>
  );
};

Option.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

Option.defaultProps = {
  className: `${prefix}--bmrg-optionsGrid-row__option`,
};

export default Option;