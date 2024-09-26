import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import AdvantageSideNav from "../AdvantageSideNav";

const sidenavProps = {
  homeLink: "http://test.home.com",
  assistantLink: "http://test.ai.com",
  joinCreateTrigger: () => console.log("Trigger modal if exists"),
  teams: [
    {id:"11", name: "Team1", privateTeam: true, services: [{url: 1, name: "service1"}, {url:2, name:"service12"}, {url:3, name:"service13"}, {url: 4, name: "service2"}, {url:5, name:"service22"}, {url: 4, name: "service2"}, {url:5, name:"service22"}]},
    {id:"22", name: "Team2", privateTeam: false, services: [{url: 4, name: "service2"}, {url:5, name:"service22"}]},
    {id:"33", name: "Team3", privateTeam: false, services: [{url: 6, name: "service3"}]},
    {id:"44", name: "Team4", privateTeam: true, services: []},
  ],
  accounts: [
    {id:"1111", name: "Account1", teams: [{id: 111, name: "team1", isTeamMember: true}, {id:211, name:"team12", isTeamMember: true}, {id:223, name:"team13", isTeamMember: true}]},
    {id:"2222", name: "Account2", teams: [{id: 222, name: "team2", isTeamMember: true}, {id:221, name:"team22", isTeamMember: true}]},
    {id:"3333", name: "Account3", teams: [{id: 333, name: "team3", isTeamMember: true}]},
    {id:"4444", name: "Account4", teams: []},
  ],
  baseEnvUrl:"https://baseurl.com",
  app: "testapp",
};

describe("FeatureSideNav", () => {
  test("functional ", () => {
    const { getByText } = render(
      <AdvantageSideNav 
        {...sidenavProps}
      />
    );
    expect(getByText("Home")).toBeInTheDocument();
  });
});
