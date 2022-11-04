// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Router } from "react-router-dom";
import FeatureSideNavLink from "./FeatureSideNavLink";
import { Rocket } from "@carbon/react/icons";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'hist... Remove this comment to see the full error message
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default {
  title: "Features/FeatureSideNavLink",
  component: FeatureSideNavLink,
  parameters: {
    docs: {
      description: {
        component: "Link used in FeatureSideNav component. Uses react-router NavLink.",
      },
    },
  },
};

export const Default = () => {
  return (
    <Router history={history}>
      {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; }' is not as... Remove this comment to see the full error message */}
      <FeatureSideNavLink to="#" children="TESTING" />
    </Router>
  );
};

export const Icon = () => {
  return (
    <Router history={history}>
      {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; iconProps: {... Remove this comment to see the full error message */}
      <FeatureSideNavLink to="#" children="Boomerang" iconProps={{ "data-testid": "rocket-icon" }} icon={Rocket} />
    </Router>
  );
};


export const CustomContent = () => {
  return (
    <Router history={history}>
      {/* @ts-expect-error TS(2322): Type '{ children: Element; to: string; }' is not a... Remove this comment to see the full error message */}
      <FeatureSideNavLink to="#">
        <div>
          <p>text1</p>
          <p>text2</p>
        </div>
      </FeatureSideNavLink>
    </Router>
  );
};

export const Divider = () => {
  return (
    <Router history={history}>
      {/* @ts-expect-error TS(2322): Type '{ to: string; children: string; hasDivider: ... Remove this comment to see the full error message */}
      <FeatureSideNavLink to="#" children="Boomerang" hasDivider />
    </Router>
  );
};
