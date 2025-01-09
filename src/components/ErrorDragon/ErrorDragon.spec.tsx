/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import ErrorDragon from "./ErrorDragon";

const statusUrl = "https://useboomerang.io";

describe("ErrorDragon", () => {
  test("render with message", async () => {
    const { findByText } = render(<ErrorDragon statusUrl={statusUrl} />);
    const title = await findByText(/Don’t lose your daks/i);
    expect(title).toBeInTheDocument();
  });
  
}
)
