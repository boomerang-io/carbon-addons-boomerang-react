import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

import ShipSharks from "./assets/ShipSharks";

const TEXT_LOCATIONS = {
  ABOVE: "above",
  BELOW: "below",
} as const;

type TextLocation = typeof TEXT_LOCATIONS[keyof typeof TEXT_LOCATIONS];

type Props = {
  className?: string;
  style?: any;
  text?: string;
  textLocation?: TextLocation;
};

function NoDisplay({
  className,
  text = "Nothing to display here",
  textLocation = TEXT_LOCATIONS.ABOVE,
  style,
  ...rest
}: Props) {
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
}

export default NoDisplay;
