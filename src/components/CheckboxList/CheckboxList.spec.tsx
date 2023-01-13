import React from "react";
import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import CheckboxList from "./CheckboxList";

const mockfn = vi.fn();

const animals = [
  { labelText: "Cat", id: "cat" },
  { labelText: "Dog", id: "dog" },
  { labelText: "Panda", id: "panda" },
];

const props = {
  id: "test",
  options: animals,
  helperText: "helper text",
  onChange: mockfn,
  labelText: "label text",
  tooltipContent: "tooltip content",
};
describe("CheckboxList", () => {
  test("snapshot", () => {
    const { baseElement } = render(<CheckboxList {...props} />);
    expect(baseElement).toMatchSnapshot();
  });
  test("functional", () => {
    const { queryByText } = render(<CheckboxList {...props} />);
    expect(queryByText(/helper text/i)).toBeInTheDocument();
    expect(queryByText(/label text/i)).toBeInTheDocument();
    expect(queryByText(/cat/i)).toBeInTheDocument();
    expect(queryByText(/dog/i)).toBeInTheDocument();
    expect(queryByText(/panda/i)).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<CheckboxList {...props} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
});
