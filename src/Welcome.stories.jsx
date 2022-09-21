import "./welcome-story.css";
import BoomerangLogo from "../.storybook/favicon.png";
import {
  Accordion,
  AccordionItem,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from "@carbon/react";
import * as All from "./index";
//const carbonExports = Object.keys(require('@carbon/react'));
const boomerangAddonsExports = Object.keys(All);

export default {
  title: "Welcome",
};

export const Welcome = () => (
  <div className="storybook-welcome">
    <header className="header">
      <img alt="Boomerang logo" src={BoomerangLogo} style={{height: "6rem", width: "auto" }} />
      <h1>Carbon Addons Boomerang React</h1>
    </header>
    <p>
      Open source components for Boomerang projects. It includes the following:
    </p>
    <p>
      <strong>Carbon Addons Boomerang</strong> - Components that are either extensions of Carbon components with added functionality,
      or custom components beyond the functionality that Carbon provides. The components are grouped by function and purpose.
    </p>
    <p>
      <strong>Carbon</strong> - Please reference the
      <a href="https://react.carbondesignsystem.com/" style={{ marginLeft: "0.15rem" }}>
        Carbon Storybook
      </a>
      to see the full component library.
    </p>

    <p>
      For additional guidance, see the
      <a href="https://www.carbondesignsystem.com/" style={{ marginLeft: "0.15rem" }}>
        Carbon Design Site
      </a>
    </p>
    <Accordion>
      <AccordionItem title={"Component Exports table"} open={false}>
        <p>
          The following table displays a list of the total exported components: our custom Boomerang
          compoonents and re-exported carbon-components
        </p>
        <StructuredListWrapper>
          <StructuredListHead>
            <StructuredListRow head></StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {[...new Set(boomerangAddonsExports)].map((item) => (
              <StructuredListRow key={item}>
                <StructuredListCell>{item === "styles" ? null : item}</StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      </AccordionItem>
    </Accordion>
  </div>
);
