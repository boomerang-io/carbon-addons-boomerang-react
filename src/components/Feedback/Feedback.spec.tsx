import { expect, test } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import Feedback from "./Feedback";

const platformName = "IBM Platform";
const sendIdeasUrl = "https://ideas.ibm.com";

test("feedback modal render", async () => {
  /**
   * In this test we do not mock out the response from the contact server,
   * so we want to show that the state of the submission button should still
   * be in "Sending" since we have not recieved a response
   */
  const { findByText, getByRole } = render(<Feedback platformName={platformName} sendIdeasUrl={sendIdeasUrl} />);
  const btn = getByRole("button", { name: /^Submit an Idea$/i });
  fireEvent.click(btn);
  (expect(await findByText("We look forward to your feedback!")) as any).toBeInTheDocument();
  fireEvent.click(getByRole("button", { name: /OK/i }));
});
