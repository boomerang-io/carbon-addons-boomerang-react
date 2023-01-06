// See https://github.com/kentcdodds/react-testing-library#global-config
import "jest-axe/extend-expect";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { setLogger } from "react-query";
const lib = (await vi.importActual("tabbable")) as any;

const tabbable = {
  ...lib,
  tabbable: (node: any, options: any) => lib.tabbable(node, { ...options, displayCheck: "none" }),
  focusable: (node: any, options: any) => lib.focusable(node, { ...options, displayCheck: "none" }),
  isFocusable: (node: any, options: any) => lib.isFocusable(node, { ...options, displayCheck: "none" }),
  isTabbable: (node: any, options: any) => lib.isTabbable(node, { ...options, displayCheck: "none" }),
};

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

vi.stubGlobal("tabbable", tabbable);
