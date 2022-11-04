import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";

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

test("render label, helperText, tooltip and options", () => {
  const { queryByText } = render(<CheckboxList {...props} />);
  (expect(queryByText(/helper text/i)) as any).toBeInTheDocument();
  (expect(queryByText(/label text/i)) as any).toBeInTheDocument();
  (expect(queryByText(/cat/i)) as any).toBeInTheDocument();
  (expect(queryByText(/dog/i)) as any).toBeInTheDocument();
  (expect(queryByText(/panda/i)) as any).toBeInTheDocument();
});
