import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from "./index";

const Header = () => {
  return (
    <>
      <FeatureHeaderTitle>Header Title</FeatureHeaderTitle>
      <FeatureHeaderSubtitle>Header Subtitle</FeatureHeaderSubtitle>
    </>
  );
};

const props = {
  header: <Header />,
};

test("FeatureHeader - render correctly", () => {
  const { queryByText } = render(<FeatureHeader {...props} />);
  expect(queryByText(/Header Title/i)).toBeInTheDocument();
  expect(queryByText(/Header Subtitle/i)).toBeInTheDocument();
});
