/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { prefix } from "../settings";

// No longer used, left export for backward-compatibility
export const translationIds = {};

type Props = {
  "aria-haspopup"?: string | boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  role?: string;
  tabIndex?: number | string;
};

/**
 * `ListBoxField` is responsible for creating the containing node for valid
 * elements inside of a field. It also provides a11y-related attributes like
 * `role` to make sure a user can focus the given field.
 */
function ListBoxField({ children, disabled, tabIndex, ...rest }: Props) {
  return (
    // @ts-expect-error TS(2322): Type 'string | number' is not assignable to type '... Remove this comment to see the full error message
    <div className={`${prefix}--list-box__field`} tabIndex={(!disabled && tabIndex) || -1} {...rest}>
      {children}
    </div>
  );
}

export default ListBoxField;
