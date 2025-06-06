/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { expect, test, vi } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ComboBoxMultiSelect from "./ComboBoxMultiSelect";

const mockfn = vi.fn();

const animals = [
  { label: "Cat", value: "cat" },
  { label: "Dog", value: "dog" },
  { label: "Panda", value: "panda" },
];

const initialDefaultAnimals = [
  { label: "Panda", value: "panda" },
  { label: "Dog", value: "dog" },
];

const props = {
  id: "test",
  initialSelectedItems: initialDefaultAnimals,
  items: animals,
  itemToString: (item) => item.label,
  helperText: "helper text",
  onChange: mockfn,
  placeholder: "select some animals",
  titleText: "label text",
  tooltipContent: "tooltip content",
};

describe("ComboBoxMultiSelect", () => {
  test("render label, helperText and tooltip", () => {
    const { queryByText } = render(<ComboBoxMultiSelect {...props} />);
    expect(queryByText(/helper text/i)).toBeInTheDocument();
    expect(queryByText(/label text/i)).toBeInTheDocument();
  });

  test("select and remove items", async () => {
    const { getByRole, getByPlaceholderText, getByText, queryByLabelText, findAllByLabelText } = render(<ComboBoxMultiSelect {...props} />);
    const input = getByPlaceholderText(/select some animals/i);
    fireEvent.click(getByText(/panda/i));
    fireEvent.click(input);
    fireEvent.click(getByText(/cat/i));
    fireEvent.click(input);
    let clearFilters = await findAllByLabelText("Clear filter");
    await waitFor(() => {
      expect(clearFilters[0]).toBeInTheDocument();
      expect(clearFilters[1]).toBeInTheDocument();
    });
    const clearButton = getByRole("button", { name: "Clear selected item" });
    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(queryByLabelText("Clear filter")).not.toBeInTheDocument();
    });
  });
});
