/* eslint-disable no-script-url */
import React from "react";
import HeaderMenu from "./HeaderMenu";
import HeaderMenuItem from "./HeaderMenuItem";

export default {
  title: "Platform/HeaderMenu",
  component: HeaderMenuItem,
  parameters: {
    docs: {
      description: {
        component: "Generic platform header menu item that can be used to render button, link or user",
      },
    },
  },
};

export const Link = () => {
  return (
    <div style={{ position: "relative", height: "16rem" }}>
      <div style={{ position: "relative", width: "15rem" }}>
        <HeaderMenu id="link">
          <HeaderMenuItem kind={"external"} type="link" href="javascript:void(0)" text="External Link" />
          <HeaderMenuItem kind="internal" type="link" href="javascript:void(0)" text="Internal Link" />
          <HeaderMenuItem kind="app" type="link" href="javascript:void(0)" text="App Link" />
        </HeaderMenu>
      </div>
    </div>
  );
};

export const Button = () => {
  return (
    <div style={{ position: "relative", height: "16rem" }}>
      <div style={{ position: "relative", width: "15rem" }}>
        <HeaderMenu id="link">
          <HeaderMenuItem type="button" onClick={() => console.log("button 1")} text="Button 1" />
          <HeaderMenuItem type="button" onClick={() => console.log("button 2")} text="Button 2" />
        </HeaderMenu>
      </div>
    </div>
  );
};
export const User = () => {
  return (
    <div style={{ position: "relative", height: "16rem" }}>
      <div style={{ position: "relative", width: "15rem" }}>
        <HeaderMenu id="link">
          <HeaderMenuItem type="user" onClick={() => console.log("button")} userName="John" src=""></HeaderMenuItem>
        </HeaderMenu>
      </div>
    </div>
  );
};
