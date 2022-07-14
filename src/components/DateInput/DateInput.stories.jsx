import { action } from "@storybook/addon-actions";
import { object, text } from "@storybook/addon-knobs";
import DateInput from "./DateInput";

export default {
  title: "Inputs/DateInput",
  component: DateInput
};

export const Default = () => {
  return (
    <DateInput
      id="default-date-input"
      onCalendarChange={action("date input calendar change")}
      onChange={action("date input change")}
      placeholder={text("placeholder", "yyyy-mm-dd")}
      autoComplete="off"
      dateFormat="Y-m-d"
      max="2020-01-31T13:10:20.219+00:00"
      min="2020-01-01T13:10:20.219+00:00"
    />
  );
};

Default.story = {
  name: "default",
};

export const WithTooltipLabelAndHelperText = () => {
  return (
    <div style={{ height: "5rem", width: "20rem" }}>
      <DateInput
        id="tooltip-label-date-input"
        onCalendarChange={action("date input calendar change")}
        onChange={action("date input change")}
        placeholder={text("placeholder", "mm/dd/yyyy")}
        autoComplete="off"
        helperText={text("helperText", "Some helper text")}
        labelText={text("labelText", "Label for text input")}
        tooltipContent={text("tooltipContent", "Tooltip for text input")}
        tooltipProps={object("tooltipProps", { placement: "top" })}
      />
    </div>
  );
};

WithTooltipLabelAndHelperText.story = {
  name: "with tooltip, label and helper text",
};

export const ReadOnly = () => {
  return (
    <DateInput
      id="read-only-date-input"
      onCalendarChange={action("date input calendar change")}
      onChange={action("date input change")}
      placeholder={text("placeholder", "yyyy-mm-dd")}
      autoComplete="off"
      dateFormat="Y-m-d"
      max="2020-01-31T13:10:20.219+00:00"
      min="2020-01-01T13:10:20.219+00:00"
      value="2020-01-15T13:10:20.219+00:00"
      readOnly
    />
  );
};

ReadOnly.story = {
  name: "read only",
};

export const Range = () => {
  return (
    <div style={{ height: "5rem" }}>
      <DateInput
        id="range-date-input"
        dateFormat="Y-m-d"
        onChange={action("date input change")}
        placeholder={text("placeholder", "mm/dd/yyyy")}
        helperText={text("helperText", "Some helper text")}
        labelText={text("labelText", "Label for text input")}
        tooltipContent={text("tooltipContent", "Tooltip for text input")}
        tooltipProps={object("tooltipProps", { placement: "top" })}
        max="2021-10-31T13:10:20.219+00:00"
        min="2021-01-01T13:10:20.219+00:00"
        value="2021-08-15T13:10:20.219+00:00,2021-09-19T13:10:20.219+00:00"
        type="date-range"
      />
    </div>
  );
};

Range.story = {
  name: "range",
};
