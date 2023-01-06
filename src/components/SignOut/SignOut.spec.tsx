import React from "react";
import { expect, test} from "vitest";
import { render, screen } from "@testing-library/react";
import SignOut from "./SignOut";
import { headerModalProps } from "../../internal/helpers";

test("Signout - render correctly", () => {
  const { baseElement } = render(<div id="root"><SignOut signOutLink="https://ibm.com" {...headerModalProps} /></div>);
  expect(baseElement).toMatchSnapshot();
  expect(screen.getByText(/Are you sure you'd like to leave us\?/i)).toBeInTheDocument();
});
