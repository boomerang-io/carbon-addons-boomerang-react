/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import MemberBar from "./MemberBar";

const props = {
  id: "1",
  name: "Mister Owl",
  email: "owl@email.com",
  avatarSrc: "",
};

describe("MemberBar", () => {
  test("functional", () => {
    const { queryByText } = render(<MemberBar {...props} />);
    expect(queryByText(/Mister Owl/i)).toBeInTheDocument();
    expect(queryByText(/owl@email.com/i)).toBeInTheDocument();
  });
});
