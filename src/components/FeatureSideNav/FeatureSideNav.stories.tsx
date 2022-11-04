// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Router } from "react-router-dom";
import FeatureSideNav from "./FeatureSideNav";
import FeatureSideNavLinks from "./FeatureSideNavLinks";
import FeatureSideNavFooter from "./FeatureSideNavFooter";
import FeatureSideNavHeader from "./FeatureSideNavHeader";
import FeatureSideNavLink from "../FeatureSideNavLink";
import { Search, Accordion, AccordionItem, Button } from "@carbon/react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'hist... Remove this comment to see the full error message
import { createMemoryHistory } from "history";

export default {
  title: "Features/FeatureSideNav",
  component: FeatureSideNav,
  parameters: {
    docs: {
      description: {
        component: "Page sidenav for persistent navigation and other functionality. Built using react-router NavLink.",
      },
    },
  },
  decorators: [(story: any) => <Router history={createMemoryHistory({ initialEntries: ["/"] })}>{story()}</Router>],
};

export const SidenavLinks = (args: any) => {
  return (
    <FeatureSideNav border="right" small {...args}>
      <FeatureSideNavLinks>
        {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; hasDivider: ... Remove this comment to see the full error message */}
        <FeatureSideNavLink to="/home" children="Home" hasDivider />
        {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
        <FeatureSideNavLink to="/link1" children="Link1" />
        {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
        <FeatureSideNavLink to="/link2" children="Link2" />
        {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
        <FeatureSideNavLink to="/link3" children="Link3" />
      </FeatureSideNavLinks>
    </FeatureSideNav>
  );
};

export const SidenavLinksWithHeaderAndCustomLinks = (args: any) => {
  return (
    <FeatureSideNav border="left" {...args}>
      <FeatureSideNavHeader>
        <h1>Test Title</h1>
        <Search />
      </FeatureSideNavHeader>
      <FeatureSideNavLinks>
        <Accordion>
          {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
          <FeatureSideNavLink to="/link1" children="Link1" />
          {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
          <FeatureSideNavLink to="/link2" children="Link2" />
          <AccordionItem title="Item 1">
            {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
            <FeatureSideNavLink to="/link3" children="Link3" />
            {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
            <FeatureSideNavLink to="/link4" children="Link4" />
          </AccordionItem>
          {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
          <FeatureSideNavLink to="/link5" children="Link5" />
          {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
          <FeatureSideNavLink to="/link6" children="Link6" />
          {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
          <FeatureSideNavLink to="/link7" children="Link7" />
          {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
          <FeatureSideNavLink to="/link8" children="Link8" />
          {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
          <FeatureSideNavLink to="/link9" children="Link9" />
          {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
          <FeatureSideNavLink to="/link10" children="Link10" />
        </Accordion>
      </FeatureSideNavLinks>
      <FeatureSideNavFooter>
        <Button>Click here</Button>
        <Button>Click here again</Button>
      </FeatureSideNavFooter>
    </FeatureSideNav>
  );
};

SidenavLinksWithHeaderAndCustomLinks.story = {
  name: "Sidenav Links, Header and Custom Links",
};

export const Loading = (args: any) => {
  return (
    <FeatureSideNav border="right" isLoading={true} {...args}>
      {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
      <FeatureSideNavLink to="/link1" children="Link1" />
      {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
      <FeatureSideNavLink to="/link2" children="Link2" />
    </FeatureSideNav>
  );
};

export const ComponentsLoading = (args: any) => {
  return (
    <FeatureSideNav border="left" {...args}>
      <FeatureSideNavHeader isLoading={true}>
        <h1>Test Title</h1>
        <Search />
      </FeatureSideNavHeader>
      {/* @ts-expect-error TS(2322): Type '{ children: Element; isLoading: boolean; }' ... Remove this comment to see the full error message */}
      <FeatureSideNavLinks isLoading={true}>
        <Accordion>
          {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
          <FeatureSideNavLink to="/link1" children="Link1" />
          {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
          <FeatureSideNavLink to="/link2" children="Link2" />
        </Accordion>
      </FeatureSideNavLinks>
      <FeatureSideNavFooter isLoading={true}>
        <Button>Click here</Button>
      </FeatureSideNavFooter>
    </FeatureSideNav>
  );
};
