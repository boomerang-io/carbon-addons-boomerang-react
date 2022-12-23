import React from "react";
import { action } from "@storybook/addon-actions";
import DateInput from "./DateInput";
import { DATE_TYPES } from "../../internal/DataDrivenInputTypes";

export default {
  title: "Inputs/DateInput",
  component: DateInput,
  parameters: {
    docs: {
      description: {
        component: "Enhanced date input with support for tooltip text and use as a data driven component",
      },
    },
  },
};

export const Default = (args: any) => {
  return (
    <DateInput
      id="default-date-input"
      onCalendarChange={action("date input calendar change")}
      onChange={action("date input change")}
      placeholder={"yyyy-mm-dd"}
      autoComplete="off"
      dateFormat="Y-m-d"
      max="2020-01-31T13:10:20.219+00:00"
      min="2020-01-01T13:10:20.219+00:00"
      {...args}
    />
  );
};

export const ReadOnly = (args: any) => {
  return (
    <DateInput
      id="read-only-date-input"
      onCalendarChange={action("date input calendar change")}
      onChange={action("date input change")}
      placeholder={"yyyy-mm-dd"}
      autoComplete="off"
      dateFormat="Y-m-d"
      max="2020-01-31T13:10:20.219+00:00"
      min="2020-01-01T13:10:20.219+00:00"
      value="2020-01-15T13:10:20.219+00:00"
      readOnly
      {...args}
    />
  );
};

export const Range = (args: any) => {
  return (
    <div style={{ height: "5rem" }}>
      <DateInput
        id="range-date-input"
        dateFormat="Y-m-d"
        onChange={action("date input change")}
        placeholder={"mm/dd/yyyy"}
        helperText={"Some helper text"}
        labelText={"Label for text input"}
        tooltipContent={"Tooltip for text input"}
        tooltipProps={{ placement: "top" }}
        max="2021-10-31T13:10:20.219+00:00"
        min="2021-01-01T13:10:20.219+00:00"
        value="2021-08-15T13:10:20.219+00:00,2021-09-19T13:10:20.219+00:00"
        type={DATE_TYPES.DATE_RANGE}
        {...args}
      />
    </div>
  );
};

export const KitchenSink = (args: any) => {
  return (
    <div style={{ height: "5rem", width: "20rem" }}>
      <DateInput
        id="tooltip-label-date-input"
        onCalendarChange={action("date input calendar change")}
        onChange={action("date input change")}
        placeholder={"mm/dd/yyyy"}
        autoComplete="off"
        helperText={"Some helper text"}
        labelText={"Label for text input"}
        tooltipContent={"Tooltip for text input"}
        tooltipProps={{ placement: "top" }}
        {...args}
      />
    </div>
  );
};
