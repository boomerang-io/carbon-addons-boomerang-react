import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import HeaderMenu from "./HeaderMenu";
import HeaderMenuItem from "./HeaderMenuItem";

describe("Feedback", () => {
  test("snapshot", async () => {
    const { baseElement, container } = render(
      <HeaderMenu id="header-menu">
        <HeaderMenuItem type="link" kind="external" href="https://useboomerang.io" text="Use Boomerang" />
        <HeaderMenuItem type="link" kind="internal" href="https://useboomerang.io" text="Use Boomerang" />
        <HeaderMenuItem type="link" kind="app" href="https://useboomerang.io" text="Use Boomerang" />
        <HeaderMenuItem type="button" onClick={() => void 0} text="Show Boomerang" />
        <HeaderMenuItem
          type="user"
          onClick={() => void 0}
          userName="Boomerang user"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        />
      </HeaderMenu>
    );
    expect(baseElement).toMatchSnapshot();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test("a11y", async () => {
    const { container } = render(
      <HeaderMenu id="header-menu">
        <HeaderMenuItem type="link" kind="external" href="https://useboomerang.io" text="Use Boomerang" />
        <HeaderMenuItem type="link" kind="internal" href="https://useboomerang.io" text="Use Boomerang" />
        <HeaderMenuItem type="link" kind="app" href="https://useboomerang.io" text="Use Boomerang" />
        <HeaderMenuItem type="button" onClick={() => void 0} text="Show Boomerang" />
        <HeaderMenuItem
          type="user"
          onClick={() => void 0}
          userName="Boomerang user"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        />
      </HeaderMenu>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
