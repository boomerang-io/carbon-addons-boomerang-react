// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Router, Link } from "react-router-dom";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'hist... Remove this comment to see the full error message
import { createMemoryHistory } from "history";
import { FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from "./index";
import { default as Tabs } from "../FeatureNavTabs";
import { default as Tab } from "../FeatureNavTab";
import { Button, Breadcrumb, BreadcrumbItem } from "@carbon/react";
import { Save, View } from "@carbon/react/icons";

export default {
  title: "Features/FeatureHeader",
  component: FeatureHeader,
  parameters: {
    docs: {
      description: {
        component: "Page feature header for consistent layouts. Includes component slots to support many usecases.",
      },
    },
  },
  decorators: [
    (story: any) => (
      <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
        <div style={{ backgroundColor: "#f2f4f8", height: "20rem", width: "100%" }}>{story()}</div>
      </Router>
    ),
  ],
};

const Nav = () => {
  return (
    <Breadcrumb noTrailingSlash>
      <BreadcrumbItem>
        <Link to="/teams">Teams</Link>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <Link to="/teams/boomerang">Boomerang</Link>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

const Footer = () => {
  return (
    <Tabs>
      <Tab label="Services" to="/services" />
      <Tab label="Members" to="/members" />
      <Tab label="Service Requests" to="/service-requests" />
      <Tab label="Members Requests" to="/members-requests" />
      <Tab label="Settings" to="/settings" />
    </Tabs>
  );
};

const DataList = () => {
  return (
    <dl style={{ display: "flex", width: "100%", marginBottom: "2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", marginRight: "1rem" }}>
        <dt>
          <strong>Term</strong>
        </dt>
        <dd>Definition</dd>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginRight: "1rem" }}>
        <dt>
          <strong>Term</strong>
        </dt>
        <dd>Definition</dd>
      </div>
    </dl>
  );
};

const Actions = () => (
  <div style={{ display: "flex", alignItems: "flex-end", marginBottom: "1rem" }}>
    <Button kind="ghost" renderIcon={View} style={{ marginRight: "1rem" }} size="medium">
      View component
    </Button>
    <Button renderIcon={Save} size="medium">
      Save
    </Button>
  </div>
);

export const Default = (args: any) => {
  return (
    <FeatureHeader
      header={
        <>
          <FeatureHeaderTitle>With Header</FeatureHeaderTitle>
          <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
        </>
      }
      {...args}
    />
  );
};

export const SubtitleFirst = (args: any) => {
  return (
    <FeatureHeader
      header={
        <>
          <FeatureHeaderSubtitle style={{ fontSize: "0.875rem", fontWeight: "300" }}>
            Subtitle as label
          </FeatureHeaderSubtitle>
          {/* @ts-expect-error TS(2322): Type '{ children: string; style: { fontSize: strin... Remove this comment to see the full error message */}
          <FeatureHeaderTitle style={{ fontSize: "1.5rem" }}>I'm smaller</FeatureHeaderTitle>
        </>
      }
      {...args}
    />
  );
};

SubtitleFirst.story = {
  name: "Subtitle above title",
};

export const WithoutBorder = (args: any) => {
  return (
    <FeatureHeader
      includeBorder={false}
      header={
        <>
          <FeatureHeaderTitle>Withouth Border</FeatureHeaderTitle>
          <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
        </>
      }
      {...args}
    />
  );
};

WithoutBorder.story = {
  name: "No border",
};

export const Loading = (args: any) => {
  return (
    <FeatureHeader
      isLoading
      header={
        <>
          <FeatureHeaderTitle>It is Loading</FeatureHeaderTitle>
          <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
        </>
      }
      {...args}
    />
  );
};

Loading.story = {
  name: "Loading state",
};

export const WithFooter = (args: any) => {
  return <FeatureHeader footer={<Footer />} {...args} />;
};

WithFooter.story = {
  name: "Footer",
};

export const WithNav = (args: any) => {
  return (
    <FeatureHeader
      nav={<Nav />}
      header={
        <>
          <FeatureHeaderTitle>With Header</FeatureHeaderTitle>
          <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
        </>
      }
      {...args}
    />
  );
};

WithNav.story = {
  name: "Breadcrumb",
};

export const WithActions = () => {
  return (
    <FeatureHeader actions={<Actions />} header={<FeatureHeaderTitle>Actions</FeatureHeaderTitle>}></FeatureHeader>
  );
};

WithActions.story = {
  name: "Actions",
};

export const OnlyChildren = () => {
  return (
    <FeatureHeader>
      <div style={{ marginBottom: "1rem" }}>
        <FeatureHeaderTitle>Rendered as Child</FeatureHeaderTitle>
      </div>
      <DataList />
    </FeatureHeader>
  );
};

OnlyChildren.story = {
  name: "Children",
};

export const WithNavHeaderFooterActionsAndChildren = (args: any) => {
  return (
    <FeatureHeader
      nav={<Nav />}
      footer={<Footer />}
      actions={<Actions />}
      header={
        <>
          <FeatureHeaderTitle>Everything Everywhere</FeatureHeaderTitle>
          <FeatureHeaderSubtitle>All at once</FeatureHeaderSubtitle>
        </>
      }
      {...args}
    >
      <DataList />
    </FeatureHeader>
  );
};

WithNavHeaderFooterActionsAndChildren.story = {
  name: "Kitchen Sink",
};
