import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import AdvantageSideNav from "./AdvantageSideNav";

export default {
  title: "Features/AdvantageSideNav",
  component: AdvantageSideNav,
  parameters: {
    docs: {
      description: {
        component: "Page sidenav for persistent navigation and other functionality. Built using react-router NavLink.",
      },
    },
  },
  decorators: [(story) => <Router>{story()}</Router>],
};

const sidenavProps = {
  homeLink: "http://test.home.com",
  assistantLink: "http://test.ai.com",
  joinCreateTrigger: () => console.log("Trigger modal if exists"),
  teams: [
    {id:"11", name: "Team1", privateTeam: true, services: [{url: 1, name: "service1 with a really long name so we can test elipsis"}, {url:2, name:"service12"}, {url:3, name:"service13"}, {url: 4, name: "service2"}, {url:5, name:"service22"}, {url: 4, name: "service2"}, {url:5, name:"service22"}]},
    {id:"22", name: "Team2", privateTeam: false, services: [{url: 4, name: "service2"}, {url:5, name:"service22"}]},
    {id:"33", name: "Team3 with a really long name so we can test elipsis", privateTeam: false, services: [{url: 6, name: "service3"}]},
    {id:"44", name: "Team4", privateTeam: true, services: []},
  ],
  accounts: [
    {id:"1111", name: "Account1 with a really long name so we can test elipsis", projectTeams: [{id: 111, name: "team1", isTeamMember: true}, {id:211, name:"team12 with a really long name so we can test elipsis", isTeamMember: true}, {id:223, name:"team13 with a really long name so we can test elipsis", isTeamMember: true}]},
    {id:"2222", name: "Account2", projectTeams: [{id: 222, name: "team2", isTeamMember: true}, {id:221, name:"team22 with a really long name so we can test elipsis", isTeamMember: true}]},
    {id:"3333", name: "Account3", projectTeams: [{id: 333, name: "team3", isTeamMember: true}]},
    {id:"4444", name: "Account4 with a really long name so we can test elipsis", projectTeams: []},
  ],
  baseEnvUrl:"https://baseurl.com",
  app: "testapp",
  isOpen: false
};

export const AdvantageSideNavCustomLinks = (args) => {
  return (
    <AdvantageSideNav 
      {...sidenavProps}
    />
  );
};

AdvantageSideNavCustomLinks.story = {
  name: "Sidenav for Advantage",
};
