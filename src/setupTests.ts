// See https://github.com/kentcdodds/react-testing-library#global-config
import "jest-axe/extend-expect";
import "@testing-library/jest-dom";
import { setLogger } from "react-query";

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});
