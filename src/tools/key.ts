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

export const keys = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  PAGEUP: 33,
  PAGEDOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

/**
 * Check to see if at least one key code matches the key code of the
 * given event.
 *
 * @example
 * import { keys, matches } from '../keys';
 * function handleOnKeyDown(event) {
 *   if (matches(event, [keys.ENTER, keys.SPACE]) {
 *     // ...
 *   }
 * }
 * @param {Event} event
 * @param {Array<number>} keysToMatch
 * @returns {boolean}
 */
export function matches(event: any, keysToMatch: any) {
  for (let i = 0; i < keysToMatch.length; i++) {
    if (keysToMatch[i] === event.which) {
      return true;
    }
  }
  return false;
}

/**
 * Check to see if the given key matches the corresponding keyboard event. Also
 * supports passing in the value directly if you can't used the given event.
 *
 * @example
 * import { keys, match } from '../keys';
 * function handleOnKeyDown(event) {
 *   if (match(event, keys.ENTER) {
 *     // ...
 *   }
 * }
 * @param {Event|number} eventOrCode
 * @param {number} key - the `which` value, should come from keys
 * @returns {boolean}
 */
export function match(eventOrCode: any, key: any) {
  return eventOrCode.which === key || eventOrCode === key;
}

/**
 * Get a string character for a given event or event code (useful for synthetic
 * events)
 *
 * @param {Event|number} eventOrCode
 * @returns {string}
 */
export function getCharacterFor(eventOrCode: any) {
  if (typeof eventOrCode === "number") {
    return String.fromCharCode(eventOrCode);
  }

  return eventOrCode.key || String.fromCharCode(eventOrCode.which || eventOrCode.keyCode);
}
