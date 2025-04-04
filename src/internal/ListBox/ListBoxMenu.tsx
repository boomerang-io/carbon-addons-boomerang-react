/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import ListBoxMenuItem from "./ListBoxMenuItem";
import { prefix } from "../settings";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?:
    | React.ReactNode
    | typeof ListBoxMenuItem[]
    | {
        type?: any; // TODO: PropTypes.oneOf([ListBoxMenuItem])
      }
    | boolean;
  id: string;
};

/**
 * `ListBoxMenu` is a simple container node that isolates the `list-box__menu`
 * class into a single component. It is also being used to validate given
 * `children` components.
 */
const ListBoxMenu = React.forwardRef<any, Props>(function ListBoxMenu({ children, id, ...rest }, ref) {
  return (
    <div ref={ref} id={id} className={`${prefix}--list-box__menu`} role="listbox" {...rest}>
      {children}
    </div>
  );
});

ListBoxMenu.displayName = "ListBoxMenu";

export default ListBoxMenu;
