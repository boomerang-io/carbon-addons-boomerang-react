import React from "react";
import { expect, test } from "vitest";
import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { UIShellKitchenSink } from "./UIShell.stories";
import UIShell from "./UIShell";

describe("UIShell", () => {
  test("snapshot", async () => {
    const { baseElement } = render(<UIShell productName="Boomerang" />);
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", async () => {
    const user = userEvent.setup();
    render(<UIShellKitchenSink />);

    // Get name and navs links
    expect(screen.getByText("Boomerang")).toBeInTheDocument();
    expect(screen.getByText("Flow")).toBeInTheDocument();
    expect(screen.getByText("Launchpad")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();

    // Get header menus and interact with them
    const requestsMenuButton = screen.getByLabelText("Requests menu");
    const notificationsMenuButton = screen.getByLabelText("Notifications menu");
    const supporttMenuButton = screen.getByLabelText("Support menu");
    const profileMenuButton = screen.getByLabelText("Profile menu");
    const appSwitcherButton = screen.getByLabelText("App switcher");

    expect(requestsMenuButton).toBeInTheDocument();
    expect(notificationsMenuButton).toBeInTheDocument();
    expect(supporttMenuButton).toBeInTheDocument();
    expect(profileMenuButton).toBeInTheDocument();
    expect(appSwitcherButton).toBeInTheDocument();

    user.click(requestsMenuButton);
    expect(await screen.findByText(/17 Requests/i)).toBeInTheDocument();
    expect(await screen.findByText(/11 Requests/i)).toBeInTheDocument();

    user.click(notificationsMenuButton);
    await waitForElementToBeRemoved(() => screen.queryByText(/17 Requests/i));
    expect(await screen.findByText(/Open Notification Center/i)).toBeInTheDocument();

    user.click(supporttMenuButton);
    expect(await screen.findByRole("link", { name: /Support Center/i })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /Community/i })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /Submit an idea/ })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /Tutorial/ })).toBeInTheDocument();

    user.click(profileMenuButton);
    expect(await screen.findByRole("link", { name: /Rick Deckard/i })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /About Platform/i })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /Email Preferences/i })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /Privacy Statement/i })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /App Policy/i })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /Sign Out/i })).toBeInTheDocument();

    user.click(appSwitcherButton);
    const firstTeamMenu = await screen.findByRole("button", { name: /Team 1/i });
    expect(firstTeamMenu).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<UIShell productName="Boomerang" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});


