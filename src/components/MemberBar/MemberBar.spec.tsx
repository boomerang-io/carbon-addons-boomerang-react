import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import MemberBar from "./MemberBar";

const props = {
  name: "Mister Owl",
  email: "owl@email.com",
  avatarSrc: "",
};

test("render member bar", () => {
  const { queryByText } = render(<MemberBar {...props} />);
  (expect(queryByText(/Mister Owl/i)) as any).toBeInTheDocument();
  (expect(queryByText(/owl@email.com/i)) as any).toBeInTheDocument();
});
