/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import cx from "classnames";
import { prefix } from "../settings";
import type { ListBoxType, ListBoxSize } from "./ListBoxTypes";

const handleOnKeyDown = (event: any) => {
  if (event.keyCode === 27) {
    event.stopPropagation();
  }
};

const handleClick = (event: any) => {
  event.preventDefault();
  event.stopPropagation();
};

type ListBoxProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: React.ReactNode;
  isOpen?: boolean;
  light?: boolean;
  size?: ListBoxSize;
  type?: ListBoxType;
  warn?: boolean;
  warnText?: React.ReactNode;

};

/**
 * `ListBox` is a generic container component that handles creating the
 * container class name in response to certain props.
 */
const ListBox = React.forwardRef<any, ListBoxProps>(function ListBox(
  {
    children,
    className: containerClassName,
    disabled = false,
    type = "default",
    size,
    invalid,
    invalidText,
    warn,
    warnText,
    light,
    isOpen,
    ...rest
  },
  ref
) {
  const showWarning = !invalid && warn;

  const className = cx({
    // @ts-expect-error TS(2464): A computed property name must be of type 'string',... Remove this comment to see the full error message
    [containerClassName]: !!containerClassName,
    [`${prefix}--list-box`]: true,
    [`${prefix}--list-box--${size}`]: size,
    [`${prefix}--list-box--inline`]: type === "inline",
    [`${prefix}--list-box--disabled`]: disabled,
    [`${prefix}--list-box--light`]: light,
    [`${prefix}--list-box--expanded`]: isOpen,
    [`${prefix}--list-box--warning`]: showWarning,
  });
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        {...rest}
        className={className}
        ref={ref}
        onKeyDown={handleOnKeyDown}
        onClick={handleClick}
        data-invalid={invalid || undefined}
      >
        {children}
      </div>
      {invalid ? <div className={`${prefix}--form-requirement`}>{invalidText}</div> : null}
      {showWarning ? <div className={`${prefix}--form-requirement`}>{warnText}</div> : null}
    </>
  );
});

ListBox.displayName = "ListBox";

export default ListBox;
