import { expect, test } from "vitest";
import { render } from "@testing-library/react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'jest... Remove this comment to see the full error message
import { axe } from "jest-axe";

import UIShell from "./UIShell";

test("accessibility of UIShell", async () => {
    const { container } = render(<UIShell />);
    const results = await axe(container);
    (expect(results) as any).toHaveNoViolations();
});
