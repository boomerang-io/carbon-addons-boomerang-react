/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import DelayedRender, { Props } from "./DelayedRender";
import { Button } from "@carbon/react";

export default {
  title: "Components/DelayedRender",
  component: DelayedRender,
  argTypes: {
    delay: {
      description: "Number of milliseconds to delay before rendering the children",
      defaultValue: 300,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Component that is used to delay the rendering of the children. It is useful for avoiding waterfall spinners on load for resources that are dynamically loaded but usually resolve quickly",
      },
    },
  },
};

export const Default = (args: Props) => {
  const [index, setIndex] = React.useState(0);
  const { children, ...rest } = args;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Button onClick={() => setIndex(index + 1)}>Restart</Button>
      <DelayedRender {...rest} key={index}>
        {children}
      </DelayedRender>
    </div>
  );
};

Default.args = {
  delay: 1000,
  children: "I'm delayed",
};
