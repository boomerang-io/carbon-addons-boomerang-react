import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";

import ErrorDragon from "./ErrorDragon";

const statusUrl = "/test";

test("ErrorDragon - render with message", async () => {
  const { findByText } = render(<ErrorDragon statusUrl={statusUrl} />);
  const title = await findByText(/Don’t lose your daks/i);
  expect(title).toBeInTheDocument();
});
