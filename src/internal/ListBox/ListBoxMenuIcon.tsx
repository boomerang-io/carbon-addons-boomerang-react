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

type Props = {
  isOpen: boolean;
  translateWithId?: (id: string) => string;
};

/**
 * `ListBoxMenuIcon` is used to orient the icon up or down depending on the
 * state of the menu for a given `ListBox`
 */
const ListBoxMenuIcon = ({ isOpen, translateWithId: t = (id: any) => defaultTranslations[id] }: Props) => {
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

export default ListBoxMenuIcon;
