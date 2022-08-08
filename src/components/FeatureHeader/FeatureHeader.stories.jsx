import { Router, Link } from "react-router-dom";
import { createMemoryHistory } from "history";
import { FeatureHeader, FeatureHeaderTitle, FeatureHeaderSubtitle } from "./index";
import { default as Tabs } from "../FeatureNavTabs";
import { default as Tab } from "../FeatureNavTab";
import { Button, Breadcrumb, BreadcrumbItem } from "@carbon/react";
import { Save, View } from "@carbon/react/icons";

export default {
  title: "Features/FeatureHeader",
  component: FeatureHeader,
};

const Nav = () => {
  return (
    <Breadcrumb noTrailingSlash>
      <BreadcrumbItem>
        <Link to="/teams">Teams</Link>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <Link to="/teams/123">Testing Team</Link>
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

export const Default = () => {
  return (
    <div style={{ backgroundColor: "#f2f4f8", height: "100vh", width: "100vw" }}>
      <FeatureHeader
        header={
          <>
            <FeatureHeaderTitle>With Header</FeatureHeaderTitle>
            <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
          </>
        }
      />
    </div>
  );
};

export const SubtitleFirst = () => {
  return (
    <div style={{ backgroundColor: "#f2f4f8", height: "100vh", width: "100vw" }}>
      <FeatureHeader
        header={
          <>
            <FeatureHeaderSubtitle style={{ fontSize: "0.875rem", fontWeight: "300" }}>
              Subtitle as label
            </FeatureHeaderSubtitle>
            <FeatureHeaderTitle style={{ fontSize: "1.5rem" }}>I'm smaller</FeatureHeaderTitle>
          </>
        }
      />
    </div>
  );
};

SubtitleFirst.story = {
  name: "subtitle first",
};

export const WithoutBorder = () => {
  return (
    <div style={{ backgroundColor: "#f2f4f8", height: "100vh", width: "100vw" }}>
      <FeatureHeader
        includeBorder={false}
        header={
          <>
            <FeatureHeaderTitle>Withouth Border</FeatureHeaderTitle>
            <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
          </>
        }
      ></FeatureHeader>
    </div>
  );
};

WithoutBorder.story = {
  name: "without border",
};

export const Loading = () => {
  return (
    <div style={{ backgroundColor: "#f2f4f8", height: "100vh", width: "100vw" }}>
      <FeatureHeader
        isLoading
        header={
          <>
            <FeatureHeaderTitle>It is Loading</FeatureHeaderTitle>
            <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
          </>
        }
      ></FeatureHeader>
    </div>
  );
};

Loading.story = {
  name: "loading",
};

export const WithFooter = () => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
      <div style={{ backgroundColor: "#f2f4f8", height: "100vh", width: "100vw" }}>
        <FeatureHeader footer={<Footer />} />
      </div>
    </Router>
  );
};

WithFooter.story = {
  name: "with footer",
};

export const WithNav = () => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
      <div style={{ backgroundColor: "#f2f4f8", height: "100vh", width: "100vw" }}>
        <FeatureHeader
          nav={<Nav />}
          header={
            <>
              <FeatureHeaderTitle>With Header</FeatureHeaderTitle>
              <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
            </>
          }
        />
      </div>
    </Router>
  );
};

WithNav.story = {
  name: "with nav",
};

export const OnlyNav = () => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
      <div style={{ backgroundColor: "#f2f4f8", height: "100vh", width: "100vw" }}>
        <FeatureHeader nav={<Nav />} />
      </div>
    </Router>
  );
};

OnlyNav.story = {
  name: "only nav",
};

export const WithActions = () => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
      <div style={{ backgroundColor: "#f2f4f8", height: "100vh", width: "100vw" }}>
        <FeatureHeader
          actions={<Actions />}
          header={<FeatureHeaderTitle>With Actions</FeatureHeaderTitle>}
        ></FeatureHeader>
      </div>
    </Router>
  );
};

WithActions.story = {
  name: "with actions",
};

export const OnlyChildren = () => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
      <div style={{ backgroundColor: "#f2f4f8", height: "100vh", width: "100vw" }}>
        <FeatureHeader>
          <div style={{ marginBottom: "1rem" }}>
            <FeatureHeaderTitle>Rendered as Child</FeatureHeaderTitle>
          </div>
          <DataList />
        </FeatureHeader>
      </div>
    </Router>
  );
};

OnlyChildren.story = {
  name: "only children",
};

export const WithNavHeaderFooterActionsAndChildren = () => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
      <div style={{ backgroundColor: "#f2f4f8", height: "100vh", width: "100vw" }}>
        <FeatureHeader
          nav={<Nav />}
          footer={<Footer />}
          actions={<Actions />}
          header={
            <>
              <FeatureHeaderTitle>With Everything</FeatureHeaderTitle>
              <FeatureHeaderSubtitle>Subtitle</FeatureHeaderSubtitle>
            </>
          }
        >
          <DataList />
        </FeatureHeader>
      </div>
    </Router>
  );
};

WithNavHeaderFooterActionsAndChildren.story = {
  name: "with nav, header, footer, actions, and children",
};
