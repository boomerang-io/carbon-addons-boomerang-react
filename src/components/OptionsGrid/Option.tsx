import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

Option.defaultProps = {
  className: `${prefix}--bmrg-optionsGrid-row__option`,
};

type OwnProps = {
  className?: string;
  id: string | number;
  index: any;
  onSelect: (...args: any[]) => any;
  selected?: boolean;
  text: string;
};

type Props = OwnProps & typeof Option.defaultProps;

function Option ({ className, text, id, selected, onSelect, ...rest }: Props) {
  const classNames = cx(className, { "--selected": selected });

  return (
    <button type="button" className={classNames} onClick={(e) => onSelect(id, e)} {...rest}>
      {text}
    </button>
  );
};

export default Option;
