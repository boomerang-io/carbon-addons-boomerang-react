import React from "react";
import { BrowserRouter } from "react-router-dom";
import SidenavComponent from "./index";
import { navItems, header, SidenavOutstandingTeams, outstandingTeamRequests } from "./helpers";

export default {
  title: "Deprecated/Sidenav",
  component: SidenavComponent,
};

export const Default = (args) => {
  return (
    <BrowserRouter>
      <SidenavComponent navItems={navItems} {...args} />
    </BrowserRouter>
  );
};

Default.args = {
  navItems: navItems,
};

export const WithTitle = (args) => {
  return (
    <BrowserRouter>
      <SidenavComponent header={header} navItems={navItems} {...args} />
    </BrowserRouter>
  );
};

WithTitle.args = {
  header: header,
  navItems: navItems,
};

WithTitle.story = {
  name: "with title",
};

export const WithTitleFooter = (args) => {
  return (
    <BrowserRouter>
      <SidenavComponent
        header={header}
        navItems={navItems}
        footer={() => <SidenavOutstandingTeams outstandingTeamRequests={outstandingTeamRequests} {...args} />}
      />
    </BrowserRouter>
  );
};

WithTitleFooter.args = {
  header: header,
  navItems: navItems,
  footer: () => <SidenavOutstandingTeams outstandingTeamRequests={outstandingTeamRequests} />,
};

WithTitleFooter.story = {
  name: "with title & footer",
};

export const OnlyTitleFooter = (args) => {
  return (
    <BrowserRouter>
      <SidenavComponent
        header={header}
        footer={() => <SidenavOutstandingTeams outstandingTeamRequests={outstandingTeamRequests} {...args} />}
      />
    </BrowserRouter>
  );
};

OnlyTitleFooter.args = {
  header: header,
  footer: () => <SidenavOutstandingTeams outstandingTeamRequests={outstandingTeamRequests} />,
};

OnlyTitleFooter.story = {
  name: "only title & footer",
};

export const WithContent = (args) => {
  return (
    <BrowserRouter>
      <SidenavComponent {...args} />
    </BrowserRouter>
  );
};

WithContent.args = {
  header: header,
  navItems: navItems,
  content: () => <div style={{ color: "white" }}>test content</div>,
};

WithContent.story = {
  name: "with content",
};
