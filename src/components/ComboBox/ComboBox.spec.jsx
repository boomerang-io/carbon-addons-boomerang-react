import { expect, test, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import ComboBox from "./ComboBox";

const mockfn = vi.fn();

const animals = [
  { label: "Cat", value: "cat" },
  { label: "Dog", value: "dog" },
  { label: "Panda", value: "panda" },
];

const props = {
  id: "test",
  items: animals,
  helperText: "helper text",
  onChange: mockfn,
  placeholder: "select an animal",
  titleText: "label text",
  tooltipContent: "tooltip content",
};

test("render label, helperText and tooltip", () => {
  const { queryByText } = render(<ComboBox {...props} />);
  expect(queryByText(/helper text/i)).toBeInTheDocument();
  expect(queryByText(/label text/i)).toBeInTheDocument();
});

test("select and remove items", () => {
  const { getByPlaceholderText, getByText, getByLabelText } = render(<ComboBox {...props} />);
  const input = getByPlaceholderText(/select an animal/i);

  expect(input.value).toBe("");

  fireEvent.click(input);
  fireEvent.click(getByText(/panda/i));

  expect(input.value).toBe("Panda");

  const clearButton = getByLabelText("Clear selected item");
  fireEvent.click(clearButton);

  expect(input.value).toBe("");
});