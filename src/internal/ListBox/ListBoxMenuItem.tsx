/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { prefix } from "../settings";

function useIsTruncated(ref: any) {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const { offsetWidth, scrollWidth } = ref.current;
    setIsTruncated(offsetWidth < scrollWidth);
  }, [ref, setIsTruncated]);

  return isTruncated;
}

type Props = {
    children?: React.ReactNode;
    isActive: boolean;
    isHighlighted: boolean;
    title?: string;
};

/**
 * `ListBoxMenuItem` is a helper component for managing the container class
 * name, alongside any classes for any corresponding states, for a generic list
 * box menu item.
 */
const ListBoxMenuItem = React.forwardRef<any, Props>(function ListBoxMenuItem(
  { children, isActive, isHighlighted, title, ...rest },
  forwardedRef
) {
  const ref = useRef(null);
  const isTruncated = useIsTruncated((forwardedRef as any)?.menuItemOptionRef || ref);
  const className = cx(`${prefix}--list-box__menu-item`, {
    [`${prefix}--list-box__menu-item--active`]: isActive,
    [`${prefix}--list-box__menu-item--highlighted`]: isHighlighted,
  });

  return (<div {...rest} className={className} title={isTruncated ? title : undefined}>
      <div className={`${prefix}--list-box__menu-item__option`} ref={(forwardedRef as any)?.menuItemOptionRef || ref}>
        {children}
      </div>
    </div>);
});

ListBoxMenuItem.displayName = "ListBoxMenuItem";

ListBoxMenuItem.defaultProps = {
  isActive: false,
  isHighlighted: false,
};

export default ListBoxMenuItem;
