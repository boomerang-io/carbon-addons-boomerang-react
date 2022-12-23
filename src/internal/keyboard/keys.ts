/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const Tab = {
  key: "Tab",
  which: 9,
  keyCode: 9,
  code: "Tab",
} as const;

export const Enter = {
  key: "Enter",
  which: 13,
  keyCode: 13,
  code: "Enter",
} as const;

export const Escape = {
  key: [
    "Escape",
    // IE11 Escape
    "Esc",
  ],
  which: 27,
  keyCode: 27,
  code: "Esc",
} as const;

export const Space = {
  key: " ",
  which: 32,
  keyCode: 32,
  code: "Space",
} as const;

export const PageUp = {
  key: "PageUp",
  which: 33,
  keyCode: 33,
  code: "Numpad9",
} as const;

export const PageDown = {
  key: "PageDown",
  which: 34,
  keyCode: 34,
  code: "Numpad3",
} as const;

export const End = {
  key: "End",
  which: 35,
  keyCode: 35,
  code: "Numpad1",
} as const;

export const Home = {
  key: "Home",
  which: 36,
  keyCode: 36,
  code: "Numpad7",
} as const;

export const ArrowLeft = {
  key: "ArrowLeft",
  which: 37,
  keyCode: 37,
  code: "ArrowLeft",
} as const;

export const ArrowUp = {
  key: "ArrowUp",
  which: 38,
  keyCode: 38,
  code: "ArrowUp",
} as const;

export const ArrowRight = {
  key: "ArrowRight",
  which: 39,
  keyCode: 39,
  code: "ArrowRight",
} as const;

export const ArrowDown = {
  key: "ArrowDown",
  which: 40,
  keyCode: 40,
  code: "ArrowDown",
} as const;

export const Delete = {
  key: "Delete",
  which: 8 || 46,
  keyCode: 8 || 46,
  code: "ArrowDecimal",
}
