import React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import Avatar from "./Avatar";

test("Avatar - render correctly", async () => {
  render(<Avatar src="ibm.com/fake/path/to/img.png" userName="Rick Deckard" />);
  expect(await screen.findByAltText("Avatar for Rick Deckard")).toBeInTheDocument();
});
