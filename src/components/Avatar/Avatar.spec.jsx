import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";

import Avatar from "./Avatar";

describe("Default Avatar", () => {
  describe("Renders as expected", () => {
    render(<Avatar src="ibm.com/fake/path/to/img.png" />);
    // it("size should be medium by default", () => {
    //   expect(wrapper.hasClass("cds--bmrg-avatar --medium")).toEqual(true);
    // });
    // it("should include child content", () => {
    //   expect(wrapper.find("img").length).toBe(1);
    // });
  });
});
