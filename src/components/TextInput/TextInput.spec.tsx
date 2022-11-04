import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";

import TextInput from "./TextInput";

const mockfn = vi.fn();

const props = {
  id: "test",
  labelText: "test",
  onChange: mockfn,
  placeholder: "placeholder",
  tooltipContent: "tooltip content",
  helperText: "helper text",
};

test("render tooltip", () => {
  const { queryByText } = render(<TextInput {...props} />);
  (expect(queryByText(/helper text/i)) as any).toBeInTheDocument();
});
