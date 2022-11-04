import { expect, test } from "vitest";
import { render } from "@testing-library/react";

import HeaderMenuUser from "./HeaderMenuUser";

function Test() {
  return <div>test</div>;
}

test("contact us sending", () => {
  /**
   * In this test we do not mock out the response from the contact server,
   * so we want to show that the state of the submission button should still
   * be in "Sending" since we have not recieved a response
   */
  // @ts-expect-error TS(2322): Type '{ children: () => Element; src: string; user... Remove this comment to see the full error message
  const { getByText } = render(
    <HeaderMenuUser src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" userName="Gravatar User">
      {() => <Test />}
    </HeaderMenuUser>
  );
  (expect(getByText(/Gravatar User/i)) as any).toBeInTheDocument();
});
