import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";

import Toggle from "./Toggle";

const mockfn = vi.fn();

const props = {
  id: "test",
  onToggle: mockfn,
  tooltipContent: "tooltip content",
  helperText: "helper text",
  labelText: "label text",
};

test("render label, helperText and tooltip", () => {
  const { queryByText } = render(<Toggle {...props} />);
  expect(queryByText(/helper text/i)).toBeInTheDocument();
  expect(queryByText(/label text/i)).toBeInTheDocument();
});
