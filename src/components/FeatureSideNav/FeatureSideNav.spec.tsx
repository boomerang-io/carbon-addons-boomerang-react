/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { FeatureSideNav, FeatureSideNavFooter, FeatureSideNavHeader, FeatureSideNavLinks } from "../FeatureSideNav";

describe("FeatureSideNav", () => {
  test("functional ", () => {
    const { getByText } = render(
      <FeatureSideNav>
        <FeatureSideNavHeader>Test Header</FeatureSideNavHeader>
        <FeatureSideNavLinks>Test Links</FeatureSideNavLinks>
        <FeatureSideNavFooter>Test Footer</FeatureSideNavFooter>
      </FeatureSideNav>
    );
    expect(getByText("Test Header")).toBeInTheDocument();
    expect(getByText("Test Links")).toBeInTheDocument();
    expect(getByText("Test Footer")).toBeInTheDocument();
  });
});
