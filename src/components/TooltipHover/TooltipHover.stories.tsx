import TooltipHover from "./TooltipHover";
import { Button } from "@carbon/react";

export default {
  title: "Components/TooltipHover",
  component: TooltipHover,
  parameters: {
    docs: {
      description: {
        component: "Informational tooltip shown on hover over children element. Built with [Tippy.js](https://github.com/atomiks/tippyjs)",
      },
    },
  },
  decorators: [
    (story: any) => <div style={{ height: "10rem", width: "10rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {story()}
    </div>,
  ],
  argTypes: {
    children: {
      control: false,
    },
    content: {
      control: "text",
      defaultValue: "Some nice words here",
    },
    tooltipContent: {
      control: false,
    },
    tooltipText: {
      control: false,
    },
  },
};

export const Default = (args: any) => {
  return (
    <TooltipHover {...args}>
      <Button>Hover me!</Button>
    </TooltipHover>
  );
};
