/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ListBox from "./ListBox";
import ListBoxField from "./ListBoxField";
import ListBoxMenu from "./ListBoxMenu";
import ListBoxMenuIcon from "./ListBoxMenuIcon";
import ListBoxMenuItem from "./ListBoxMenuItem";
import ListBoxSelection from "./ListBoxSelection";

(ListBox as any).Field = ListBoxField;
(ListBox as any).Menu = ListBoxMenu;
(ListBox as any).MenuIcon = ListBoxMenuIcon;
(ListBox as any).MenuItem = ListBoxMenuItem;
(ListBox as any).Selection = ListBoxSelection;

export * as PropTypes from "./ListBoxPropTypes";

export default ListBox;
