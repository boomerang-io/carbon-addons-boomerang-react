import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { FeatureSideNav, FeatureSideNavFooter, FeatureSideNavHeader, FeatureSideNavLinks } from "../FeatureSideNav";
import { prefix } from "../../internal/settings";

test("render FeatureSideNav and components with correct classes", async () => {
    const { container, getByText } = render(<FeatureSideNav>
      <FeatureSideNavHeader>Test Header</FeatureSideNavHeader>
      <FeatureSideNavLinks>Test Links</FeatureSideNavLinks>
      <FeatureSideNavFooter>Test Footer</FeatureSideNavFooter>
    </FeatureSideNav>);
    (expect(container.firstChild) as any).toHaveClass(`${prefix}--bmrg-feature-sidenav-container`);
    (expect(getByText("Test Header")) as any).toHaveClass(`${prefix}--bmrg-feature-sidenav-header`);
    (expect(getByText("Test Links")) as any).toHaveClass(`${prefix}--bmrg-feature-sidenav-links`);
    (expect(getByText("Test Footer")) as any).toHaveClass(`${prefix}--bmrg-feature-sidenav-footer`);
});
