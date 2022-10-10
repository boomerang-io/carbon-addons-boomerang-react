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
      <img alt="Boomerang logo" src={BoomerangLogo} style={{ height: "6rem", width: "auto" }} />
      <h1>Carbon Addons Boomerang React</h1>
    </header>
    <p>
      Open source React components for Boomerang projects based on IBM's Carbon Design System. Built for open source and
      internal applications within IBM.
    </p>
    <p>
      <strong>Carbon Addons Boomerang</strong> - Components that are either extensions of existing Carbon components
      with added functionality, or custom components to meet the needs of our applications.
    </p>
    <p>
      <strong>Carbon</strong> - View the base Carbon component library via the {" "}
      <a href="https://react.carbondesignsystem.com/">
        Carbon Storybook
      </a>
      . For additional guidance and information about the Carbon Design System, navigate to the {" "}
      <a href="https://www.carbondesignsystem.com/">
        Carbon Design Site
      </a>
      .
    </p>
    <Accordion>
      <AccordionItem title={"View exported components and functions"} open={false}>
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
