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

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  disabled?: boolean;
  tabIndex?: number | string;
};

/**
 * `ListBoxField` is responsible for creating the containing node for valid
 * elements inside of a field. It also provides a11y-related attributes like
 * `role` to make sure a user can focus the given field.
 */
function ListBoxField({ children, disabled, tabIndex, ...rest }: Props) {
  const numTabIndex = typeof tabIndex === "string" ? parseInt(tabIndex) : tabIndex;
  return (
    <div className={`${prefix}--list-box__field`} tabIndex={(!disabled && numTabIndex) || -1} {...rest}>
      {children}
    </div>
  );
}

export default ListBoxField;
