/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
 import React from "react";
import cx from "classnames";
import { ChevronDown } from "@carbon/react/icons";
import { prefix } from "../settings";

export const translationIds = {
  "close.menu": "close.menu",
  "open.menu": "open.menu",
};

const defaultTranslations = {
  [translationIds["close.menu"]]: "Close menu",
  [translationIds["open.menu"]]: "Open menu",
};

type OwnProps = {
    isOpen: boolean;
    translateWithId: (...args: any[]) => any;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ListBoxMenuIcon.defaultProps;

/**
 * `ListBoxMenuIcon` is used to orient the icon up or down depending on the
 * state of the menu for a given `ListBox`
 */
// @ts-expect-error TS(7022): 'ListBoxMenuIcon' implicitly has type 'any' becaus... Remove this comment to see the full error message
const ListBoxMenuIcon = ({ isOpen, translateWithId: t }: Props) => {
  const className = cx(`${prefix}--list-box__menu-icon`, {
    [`${prefix}--list-box__menu-icon--open`]: isOpen,
  });
  const description = isOpen ? t("close.menu") : t("open.menu");
  return (
    <div className={className}>
      <ChevronDown name="chevron--down" aria-label={description}>
        <title>{description}</title>
      </ChevronDown>
    </div>
  );
};

ListBoxMenuIcon.defaultProps = {
  translateWithId: (id: any) => defaultTranslations[id],
};

export default ListBoxMenuIcon;
