/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/

import React from "react";
import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import AdvantageSideNav from "../AdvantageSideNav";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const sidenavProps = {
  appLink: { newChatRedirect: "" },
  joinCreateTrigger: () => console.log("Trigger modal if exists"),
  teams: [
    {
      id: "11",
      name: "Team1",
      privateTeam: true,
      services: [
        { url: 1, name: "service1" },
        { url: 2, name: "service12" },
        { url: 3, name: "service13" },
        { url: 4, name: "service2" },
        { url: 5, name: "service22" },
        { url: 4, name: "service2" },
        { url: 5, name: "service22" },
      ],
    },
    {
      id: "22",
      name: "Team2",
      privateTeam: false,
      services: [
        { url: 4, name: "service2" },
        { url: 5, name: "service22" },
      ],
    },
    { id: "33", name: "Team3", privateTeam: false, services: [{ url: 6, name: "service3" }] },
    { id: "44", name: "Team4", privateTeam: true, services: [] },
  ],
  accounts: [
    {
      id: "1111",
      name: "Account1",
      teams: [
        { id: 111, name: "team1", isTeamMember: true },
        { id: 211, name: "team12", isTeamMember: true },
        { id: 223, name: "team13", isTeamMember: true },
      ],
    },
    {
      id: "2222",
      name: "Account2",
      teams: [
        { id: 222, name: "team2", isTeamMember: true },
        { id: 221, name: "team22", isTeamMember: true },
      ],
    },
    { id: "3333", name: "Account3", teams: [{ id: 333, name: "team3", isTeamMember: true }] },
    { id: "4444", name: "Account4", teams: [] },
  ],
  baseEnvUrl: "https://baseurl.com",
  app: "testapp",
  user: { id: "1" },
  sideNavUrls: [
    {
      name: "Home",
      url: "https://ocp2.cloud.boomerangplatform.net/dev/launchpad/",
      key: "home",
      icon: "Home",
    },
    {
      name: "Chat",
      url: "https://ocp2.cloud.boomerangplatform.net/dev/curatorai/apps/ui/new-chat?teamName=10thSeptTeamFinal&teamId=68c16b4f56a126227190a280",
      key: "chat",
      icon: "ChatBot",
    },
    {
      name: "Tools",
      url: "https://ocp2.cloud.boomerangplatform.net/dev/curatorai/apps/ui/connectors?teamName=10thSeptTeamFinal&teamId=68c16b4f56a126227190a280",
      key: "tools",
      icon: "Api",
    },
    {
      name: "Team Page",
      url: "https://ocp2.cloud.boomerangplatform.net/dev/launchpad/teams/68c16b4f56a126227190a280",
      key: "teamPage",
      icon: "UserMultiple",
    },
    {
      name: "Agent & Assistant Library",
      url: "https://ocp2.cloud.boomerangplatform.net/dev/curatorai/apps/ui/explore-prompts-assistants?teamName=10thSeptTeamFinal&teamId=68c16b4f56a126227190a280",
      key: "agentLibrary",
      icon: "Folders",
    },
    {
      name: "Agent & Assistant Studio",
      url: "https://ocp2.cloud.boomerangplatform.net/dev/launchpad/agent-assistant-studio",
      key: "agentStudio",
      icon: "",
    },
    {
      name: "Document Collections",
      url: "https://ocp2.cloud.boomerangplatform.net/dev/curatorai/apps/ui/chat-with-documents?teamName=10thSeptTeamFinal&teamId=68c16b4f56a126227190a280",
      key: "documentCollections",
      icon: "DocumentMultiple_02",
    },
    {
      name: "Settings",
      url: "https://ocp2.cloud.boomerangplatform.net/dev/curatorai/apps/ui/settings?teamName=10thSeptTeamFinal&teamId=68c16b4f56a126227190a280",
      key: "settings",
      icon: "Settings",
    },
    {
      name: "Catalog",
      url: "https://ocp2.cloud.boomerangplatform.net/dev/catalog/",
      key: "catalog",
      icon: "Catalog",
    },
    {
      name: "Admin",
      url: "https://ocp2.cloud.boomerangplatform.net/dev/admin/",
      key: "admin",
      icon: "Admin",
    },
  ],
};

describe("FeatureSideNav", () => {
  test("functional ", () => {
    const { getByText } = render(<AdvantageSideNav {...sidenavProps} />);
    expect(getByText("Home")).toBeInTheDocument();
  });
});
