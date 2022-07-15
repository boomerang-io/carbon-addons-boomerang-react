import { select, text } from "@storybook/addon-knobs";
import TooltipHover from "./TooltipHover";

export default {
  title: "Components/TooltipHover",
  component: TooltipHover,
};

export const Default = () => {
  return (
    <div style={{ marginTop: "10rem" }}>
      <TooltipHover
        tooltipContent={text("content | tooltipContent | tooltipText  ", "some nice words here")}
        direction={select(
          "direction",
          { top: "top", bottom: "bottom", left: "left", right: "right", auto: "auto" },
          "top"
        )}
        align={select("align", { "default (no value)": null, start: "start", end: "end" })}
      >
        <button>Hover me!</button>
      </TooltipHover>
    </div>
  );
};
