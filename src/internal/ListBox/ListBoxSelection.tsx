/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import cx from "classnames";
import { Close } from "@carbon/react/icons";
import { match, keys } from "../keyboard";
import { prefix } from "../settings";

type OwnProps = {
  clearSelection: (...args: any[]) => any;
  disabled?: boolean;
  onClearSelection?: (...args: any[]) => any;
  onClick?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
  selectionCount?: number;
  translateWithId: (...args: any[]) => any;
};

// @ts-expect-error TS(2565): Property 'defaultProps' is used before being assig... Remove this comment to see the full error message
type Props = OwnProps & typeof ListBoxSelection.defaultProps;

/**
 * `ListBoxSelection` is used to provide controls for clearing a selection, in
 * addition to conditionally rendering a badge if the control has more than one
 * selection.
 */
function ListBoxSelection({ clearSelection, selectionCount, translateWithId: t, disabled, onClearSelection }: Props) {
  const className = cx(`${prefix}--list-box__selection`, {
    [`${prefix}--tag--filter`]: selectionCount,
    [`${prefix}--list-box__selection--multi`]: selectionCount,
  });
  const handleOnClick = (event: any) => {
    event.stopPropagation();
    if (disabled) {
      return;
    }
    clearSelection(event);
    if (onClearSelection) {
      onClearSelection(event);
    }
  };
  const handleOnKeyDown = (event: any) => {
    event.stopPropagation();
    if (disabled) {
      return;
    }

    // When a user hits ENTER, we'll clear the selection
    if (match(event, keys.Enter)) {
      clearSelection(event);
      if (onClearSelection) {
        onClearSelection(event);
      }
    }
  };
  const description = selectionCount ? t("clear.all") : t("clear.selection");
  const tagClasses = cx(`${prefix}--tag`, `${prefix}--tag--filter`, `${prefix}--tag--high-contrast`, {
    [`${prefix}--tag--disabled`]: disabled,
  });
  return selectionCount ? (
    <div className={tagClasses}>
      {/* @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'. */}
      <span className={`${prefix}--tag__label`} title={selectionCount}>
        {selectionCount}
      </span>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={`${prefix}--tag__close-icon`}
        onClick={handleOnClick}
        onKeyDown={handleOnKeyDown}
        // @ts-expect-error TS(2322): Type '{ children: Element; role: "button"; tabInde... Remove this comment to see the full error message
        disabled={disabled}
        aria-label={t("clear.all")}
        title={description}
      >
        <Close />
      </div>
    </div>
  ) : (
    <div
      role="button"
      className={className}
      tabIndex={disabled ? -1 : 0}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      aria-label={description}
      title={description}
    >
      {selectionCount}
      <Close />
    </div>
  );
}

export const translationIds = {
  "clear.all": "clear.all",
  "clear.selection": "clear.selection",
};

const defaultTranslations = {
  [translationIds["clear.all"]]: "Clear all selected items",
  [translationIds["clear.selection"]]: "Clear selected item",
};

ListBoxSelection.defaultProps = {
  translateWithId: (id: any) => defaultTranslations[id],
};

export default ListBoxSelection;
