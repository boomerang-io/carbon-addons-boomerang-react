/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/

// See https://github.com/kentcdodds/react-testing-library#global-config
import "jest-axe/extend-expect";
import "@testing-library/jest-dom";

// jsdom does not implement ResizeObserver; Carbon's useResizeObserver requires it
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).ResizeObserver = ResizeObserverMock;
