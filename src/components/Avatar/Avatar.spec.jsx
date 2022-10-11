import { expect, test,  } from "vitest";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";

import Avatar from "./Avatar";

test("render avatar", async () => {
  render(<Avatar src="ibm.com/fake/path/to/img.png" userName="Rick Deckard"/>);
  expect(await screen.findByAltText("Avatar for Rick Deckard")).toBeInTheDocument();
});
