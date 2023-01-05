/* eslint-disable no-script-url */
import React from "react";
import HeaderMenu from "../Header/HeaderMenu";
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
          <HeaderMenuItem
            external={true}
            kind="link"
            href="javascript:void(0)"
            text="Link 1"
          />
          <HeaderMenuItem
            external={false}
            kind="link"
            href="javascript:void(0)"
            text="Link 2"
          />
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
          <HeaderMenuItem
            kind="button"
            onClick={() => console.log("button 1")}
            text="Button 1"
          />
                    <HeaderMenuItem
            kind="button"
            onClick={() => console.log("button 2")}
            text="Button 2"
          />
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
          <HeaderMenuItem
            kind="user"
            onClick={() => console.log("button")}
            userName="John"
            src=""
          ></HeaderMenuItem>
        </HeaderMenu>
      </div>
    </div>
  );
};
