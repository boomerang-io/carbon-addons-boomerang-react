import React from "react";
import DelayedRender from "./DelayedRender";
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

export const Default = (args: any) => {
  const [index, setIndex] = React.useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Button onClick={() => setIndex(index + 1)}>Restart</Button>
      {/* @ts-expect-error TS(2786): 'DelayedRender' cannot be used as a JSX component. */}
      <DelayedRender {...args} key={index} />
    </div>
  );
};

Default.args = {
  delay: 1000,
  children: "I'm delayed",
};
