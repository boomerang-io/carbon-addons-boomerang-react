import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

import ShipSharks from "./assets/ShipSharks";



const TEXT_LOCATIONS = {
  ABOVE: "above",
  BELOW: "below",
};

type OwnProps = {
    className?: string;
    style?: any;
    text?: string;
    textLocation?: "above" | "below";
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof NoDisplay.defaultProps;

// @ts-expect-error TS(7022): 'NoDisplay' implicitly has type 'any' because it d... Remove this comment to see the full error message
const NoDisplay = ({ className, text, textLocation = TEXT_LOCATIONS.ABOVE, style, ...rest }: Props) => {
  const classNames = cx(`${prefix}--bmrg-no-display`, className);
  return (
    <div className={classNames} style={style} {...rest}>
      {textLocation === TEXT_LOCATIONS.ABOVE && (
        <p className={cx(`${prefix}--bmrg-no-display__text`, "--above")}>{text}</p>
      )}
      <ShipSharks className={`${prefix}--bmrg-no-display__img`} alt="no-display" />
      {textLocation === TEXT_LOCATIONS.BELOW && (
        <p className={cx(`${prefix}--bmrg-no-display__text`, "--below")}>{text}</p>
      )}
    </div>
  );
};

NoDisplay.defaultProps = {
  text: "Nothing to display here",
};

export default NoDisplay;
