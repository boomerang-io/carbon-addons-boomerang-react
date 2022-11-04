import { expect, test } from "vitest";
import { render } from "@testing-library/react";

import Error404 from "./Error404";

test("render Error404 with defaults", async () => {
  const { getByText } = render(<Error404 />);
  (expect(getByText("404 Page Not Found")) as any).toBeInTheDocument();
  (expect(getByText("We spaced out and couldn’t find your page.")) as any).toBeInTheDocument();
  (expect(getByText("Try refreshing, or contact the local authorities.")) as any).toBeInTheDocument();
});

test("render Error404 without text", async () => {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  const { queryByText } = render(<Error404 header={null} title={null} message={null} />);
  (expect(queryByText("404 Page Not Found")).not as any).toBeInTheDocument();
  (expect(queryByText("We spaced out and couldn’t find your page.")).not as any).toBeInTheDocument();
  (
    expect(queryByText("You shouldn’t be here - contact the local authorities if you disagree.")).not as any
  ).toBeInTheDocument();
});

test("render Error404 with custom text", async () => {
  const { getByText } = render(<Error404 header="hello" title="there" message="sir" />);
  (expect(getByText("hello")) as any).toBeInTheDocument();
  (expect(getByText("there")) as any).toBeInTheDocument();
  (expect(getByText("sir")) as any).toBeInTheDocument();
});
