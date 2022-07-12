import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { prefix } from "../../internal/settings";

import ShipSharks from "./assets/ShipSharks";



const TEXT_LOCATIONS = {
  ABOVE: "above",
  BELOW: "below",
};

const NoDisplay = ({ className, text, textLocation = TEXT_LOCATIONS.ABOVE, style, ...rest }) => {
  const classNames = classnames(`${prefix}--bmrg-no-display`, className);
  return (
    <div className={classNames} style={style} {...rest}>
      {textLocation === TEXT_LOCATIONS.ABOVE && (
        <p className={classnames(`${prefix}--bmrg-no-display__text`, "--above")}>{text}</p>
      )}
      <ShipSharks className={`${prefix}--bmrg-no-display__img`} alt="no-display" />
      {textLocation === TEXT_LOCATIONS.BELOW && (
        <p className={classnames(`${prefix}--bmrg-no-display__text`, "--below")}>{text}</p>
      )}
    </div>
  );
};

NoDisplay.defaultProps = {
  text: "Nothing to display here",
};

NoDisplay.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string,
  textLocation: PropTypes.oneOf(["above", "below"]),
};

export default NoDisplay;
