import { Router } from "react-router-dom";
import FeatureSideNav from "./FeatureSideNav";
import FeatureSideNavLinks from "./FeatureSideNavLinks";
import FeatureSideNavFooter from "./FeatureSideNavFooter";
import FeatureSideNavHeader from "./FeatureSideNavHeader";
import FeatureSideNavLink from "../FeatureSideNavLink";
import { Search, Accordion, AccordionItem, Button } from "@carbon/react";
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
        <FeatureSideNavLink to="/home" children="Home" hasDivider />
        <FeatureSideNavLink to="/link1" children="Link1" />
        <FeatureSideNavLink to="/link2" children="Link2" />
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
          <FeatureSideNavLink to="/link1" children="Link1" />
          <FeatureSideNavLink to="/link2" children="Link2" />
          <AccordionItem title="Item 1">
            <FeatureSideNavLink to="/link3" children="Link3" />
            <FeatureSideNavLink to="/link4" children="Link4" />
          </AccordionItem>
          <FeatureSideNavLink to="/link5" children="Link5" />
          <FeatureSideNavLink to="/link6" children="Link6" />
          <FeatureSideNavLink to="/link7" children="Link7" />
          <FeatureSideNavLink to="/link8" children="Link8" />
          <FeatureSideNavLink to="/link9" children="Link9" />
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
      <FeatureSideNavLink to="/link1" children="Link1" />
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
      <FeatureSideNavLinks isLoading={true}>
        <Accordion>
          <FeatureSideNavLink to="/link1" children="Link1" />
          <FeatureSideNavLink to="/link2" children="Link2" />
        </Accordion>
      </FeatureSideNavLinks>
      <FeatureSideNavFooter isLoading={true}>
        <Button>Click here</Button>
      </FeatureSideNavFooter>
    </FeatureSideNav>
  );
};
