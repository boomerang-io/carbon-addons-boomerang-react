import React from "react";
import { action } from "@storybook/addon-actions";
import OptionsGrid from "./index";
// import { tools, selectedTools } from "../../helpers/mockData";

export default {
  title: "Deprecated/OptionsGrid",
  excludeStories: ["selectedTools"],
};

const tools = [
  {
    id: 1,
    name: "Assembly Kit",
  },
  {
    id: 2,
    name: "Client Engagement Assist",
  },
  {
    id: 3,
    name: "Jira",
  },
  {
    id: 4,
    name: "Slack",
  },
  {
    id: 5,
    name: "Urban Code Deploy",
  },
  {
    id: 6,
    name: "Boomerang",
  },
  {
    id: 7,
    name: "IBM Github Enterprise",
  },
  {
    id: 8,
    name: "Send Grid",
  },
  {
    id: 9,
    name: "Travis CI",
  },
];

export const selectedTools = [
  {
    id: 2,
    name: "Client Engagement Assist",
  },
  {
    id: 5,
    name: "Urban Code Deploy",
  },
  {
    id: 6,
    name: "Boomerang",
  },

  {
    id: 8,
    name: "Send Grid",
  },

  {
    id: 10,
    name: "Zeplin",
  },
];

const mockFunc = action("onSelect");
const style = { background: "#1d496d", margin: "2rem", width: "45rem" };


export const SingleColumn = () => {
  return (
    <div style={style}>
      <OptionsGrid columns={1} data={tools} selectedItems={selectedTools} onSelect={mockFunc} />
    </div>
  );
};

SingleColumn.story = {
  name: "single column",
};

export const DoubleColumn = () => {
  return (
    <div style={style}>
      <OptionsGrid width="5rem" columns={2} data={tools} selectedItems={selectedTools} onSelect={mockFunc} />
    </div>
  );
};

DoubleColumn.story = {
  name: "double column",
};

export const TripleColumn = () => {
  return (
    <div style={style}>
      <OptionsGrid width="5rem" columns={3} data={tools} selectedItems={selectedTools} onSelect={mockFunc} />
    </div>
  );
};

TripleColumn.story = {
  name: "triple column",
};
