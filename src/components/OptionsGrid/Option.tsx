
import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type OwnProps = {
    className?: string;
    id: string | number;
    onSelect: (...args: any[]) => any;
    selected?: boolean;
    text: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Option.defaultProps;



// @ts-expect-error TS(7022): 'Option' implicitly has type 'any' because it does... Remove this comment to see the full error message
const Option = ({ className, text, id, selected, onSelect, ...rest }: Props) => {
  const classNames = cx(className, { "--selected": selected });

  return (
    <button type="button" className={classNames} onClick={(e) => onSelect(id, e)} {...rest}>
      {text}
    </button>
  );
};

Option.defaultProps = {
  className: `${prefix}--bmrg-optionsGrid-row__option`,
};

export default Option;
