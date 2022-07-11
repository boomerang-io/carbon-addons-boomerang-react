/* eslint-disable no-template-curly-in-string */
import React from "react";
import { action } from "@storybook/addon-actions";
import TextInput from "../TextInput";
import * as Yup from "yup";
import DynamicFormik from "./DynamicFormik";

const additionalSchema = Yup.object().shape({
  text: Yup.string().required("Text is required - Additional Schema"),
});

const inputs = [
  {
    key: "text",
    label: "Text",
    value: "boomerang",
    type: "text",
    placeholder: "text",
    helperText: "text",
    description: "text",
    required: false,
    pattern: "(boomerang|carbon)",
    patternInvalidText: "Custom error for invalid pattern - Type boomerang or carbon.",
  },
  {
    key: "password",
    label: "Password",
    value: "password",
    type: "password",
    placeholder: "password",
    helperText: "password",
    description: "password",
    required: false,
    min: "2",
    max: "20",
  },
  {
    key: "secured",
    label: "Secured",
    value: "secured",
    type: "secured",
    placeholder: "secured",
    helperText: "secured",
    description: "secured",
    required: false,
    min: "2",
    max: "20",
  },
  {
    key: "date",
    label: "Date",
    value: "2020-01-01T13:10:20.219+00:00",
    type: "date",
    placeholder: "yyyy-mm-dd",
    helperText: "date",
    dateFormat: "Y-m-d",
    min: "2020-01-01T13:10:20.219+00:00",
    max: "2020-01-31T13:10:20.219+00:00",
  },
  {
    key: "date-range",
    label: "Date Range",
    values: ["2021-08-15T13:10:20.219+00:00", "2021-09-21T13:10:20.219+00:00"],
    type: "date-range",
    placeholder: "yyyy-mm-dd",
    helperText: "Date range",
    dateFormat: "Y-m-d",
    min: "2021-01-01T13:10:20.219+00:00",
    max: "2021-10-31T13:10:20.219+00:00",
  },
  {
    required: false,
    placeholder: null,
    helperText: null,
    language: null,
    disabled: null,
    defaultValue: null,
    value: "yay",
    values: null,
    readOnly: false,
    id: "20200f76-e676-4737-b51b-s92371901",
    description: "kafka",
    key: "kafka.bot-failure.notifications-enabled",
    label: "kafka",
    type: "text",
    min: null,
    max: null,
    options: null,
  },
  {
    key: "email",
    label: "Email",
    value: "example@email.com",
    defaultValue: "example@email.com",
    type: "email",
    required: true,
    placeholder: "test@mail.com",
    helperText: "text",
    description: "text",
    invalidValues: ["boomerang@gmail.com"],
  },
  {
    key: "url",
    label: "Url",
    value: "url.com",
    defaultValue: "url.com",
    type: "url",
    required: true,
    placeholder: "url.com",
    helperText: "text",
    description: "text",
  },
  {
    key: "number",
    label: "Number",
    value: "1",
    defaultValue: "",
    type: "number",
    required: true,
    placeholder: "0",
    max: 100,
    min: -1,
    helperText: "text",
    description: "text",
  },
  {
    key: "area",
    label: "Area",
    value: "area",
    type: "textarea",
    placeholder: "placeholder",
    required: true,
    helperText: "text",
    description: "text",
    max: "150",
    min: "4",
  },
  {
    key: "editor",
    label: "Editor",
    value: "text",
    type: "texteditor",
    placeholder: "placeholder",
    required: true,
    helperText: "text",
    description: "text",
  },
  {
    key: "toggle",
    label: "Toggle",
    value: "true",
    type: "boolean",
    helperText: "text",
    description: "text",
  },
  {
    key: "radio",
    label: "Radio",
    value: "two",
    type: "radio",
    orientation: "vertical",
    options: [
      { key: "test", value: "Test" },
      { key: "one", value: "One" },
      { key: "two", value: "Two" },
      { key: "three", value: "Three" },
      { key: "four", value: "Four" },
      { key: "five", value: "Five" },
      { key: "six", value: "Six" },
      { key: "seven", value: "Seven" },
      { key: "eight", value: "Eight" },
      { key: "nine", value: "Nine" },
      { key: "ten", value: "Ten" },
    ],
    placeholder: "placeholder",
    helperText: "text",
    description: "text",
  },
  {
    key: "select",
    label: "Select",
    value: "one",
    defaultValue: "two",
    type: "select",
    options: [
      { key: "one", value: "One" },
      { key: "two", value: "Two" },
    ],
    placeholder: "placeholder",
    helperText: "text",
    description: "text",
  },
  {
    key: "multiselect",
    label: "MultiSelect",
    type: "multiselect",
    options: [
      { key: "one", value: "One" },
      { key: "two", value: "Two" },
      { key: "three", value: "Three" },
    ],
    values: ["one"],
    defaultValue: ["two"],
    placeholder: "placeholder",
    helperText: "text",
    description: "text",
  },

  {
    key: "checkboxList",
    label: "Checkbox",
    type: "checkbox",
    values: ["one", "two"],
    options: [
      { value: "One", key: "one" },
      { value: "Two", key: "two" },
      { value: "Three", key: "three" },
    ],
    helperText: "text",
    description: "text",
  },
  {
    key: "creatable",
    label: "Creatable",
    type: "creatable-single",
    values: ["ONE"],
    placeholder: "placeholder TEST",
    conditionallyRender: true,
    requiredForKey: "select",
    requiredValueOf: ["one"],
    pattern: "[A-Z]+",
    patternInvalidText: "Custom error for invalid pattern - Type only on Upper Case",
    helperText: "text",
    description: "text",
  },
  {
    key: "creatableLimited",
    label: "Creatable",
    type: "creatable-single",
    values: ["one", "two", "three"],
    placeholder: "placeholder",
    conditionallyRender: true,
    requiredForKey: "select",
    requiredValueOf: ["one"],
    helperText: "limited by 3 values",
    description: "limited by 3 values",
    max: 3,
  },
  {
    key: "custom",
    label: "Custom",
    value: "custom",
    type: "text",
    placeholder: "custom",
    required: true,
    helperText: "text",
    description: "text",
    // eslint-disable-next-line
    customComponent: ({ formikProps, ...rest }) => <TextInput {...rest} />,
  },
  {
    key: "general.worker.nextgen.enable",
    label: "Enable Generation 3 Worker Integration",
    max: null,
    min: null,
    type: "boolean",
    defaultValue: "false",
    required: false,
    validValues: null,
    category: "general",
    description: "",
    adminOnly: false,
    options: [],
    helpertext: "Enabling this will require integration to the DAG based worker implementation.",
  },
  {
    key: "general.worker.token.deploy",
    label: "Next Gen Worker Deploy Token",
    max: null,
    min: null,
    type: "text",
    defaultValue: "",
    required: false,
    validValues: null,
    category: "general",
    description: "",
    adminOnly: false,
    conditionallyRender: true,
    requiredValueOf: ["true"],
    requiredForKey: "general.worker.nextgen.enable",
    helpertext: "Leave this blank to retain the default Gen 2 worker.",
    placeholder: "",
  },
];

const governingSelectsInputs = [
  {
    required: false,
    placeholder: "",
    language: null,
    disabled: null,
    defaultValue: null,
    value: "",
    values: null,
    readOnly: false,
    dateFormat: null,
    order: 0,
    description: "",
    key: "countries",
    label: "Country",
    type: "select",
    min: null,
    max: null,
    options: [],
    governingJson: [
      {
        id: 233,
        name: "United States",
        iso3: "USA",
        states: [
          {
            id: 1456,
            name: "Alabama",
            state_code: "AL",
            latitude: "32.31823140",
            longitude: "-86.90229800",
            type: null,
            cities: [
              {
                id: 110968,
                name: "Abbeville",
                latitude: "31.57184000",
                longitude: "-85.25049000",
              },
              {
                id: 111032,
                name: "Adamsville",
                latitude: "33.60094000",
                longitude: "-86.95611000",
              },
              {
                id: 111083,
                name: "Alabaster",
                latitude: "33.24428000",
                longitude: "-86.81638000",
              },
            ],
          },
          {
            id: 1441,
            name: "Wisconsin",
            state_code: "WI",
            latitude: "43.78443970",
            longitude: "-88.78786780",
            type: null,
            cities: [
              {
                id: 110970,
                name: "Abbotsford",
                latitude: "44.94636000",
                longitude: "-90.31597000",
              },
              {
                id: 111015,
                name: "Adams",
                latitude: "43.95608000",
                longitude: "-89.81818000",
              },
              {
                id: 111023,
                name: "Adams County",
                latitude: "43.96963000",
                longitude: "-89.77064000",
              },
            ],
          },
        ],
      },
      {
        id: 39,
        name: "Canada",
        iso3: "CAN",
        states: [
          {
            id: 872,
            name: "Alberta",
            state_code: "AB",
            latitude: "53.93327060",
            longitude: "-116.57650350",
            type: null,
            cities: [
              {
                id: 16151,
                name: "Airdrie",
                latitude: "51.30011000",
                longitude: "-114.03528000",
              },
              {
                id: 16178,
                name: "Athabasca",
                latitude: "54.71687000",
                longitude: "-113.28537000",
              },
              {
                id: 16190,
                name: "Banff",
                latitude: "51.17622000",
                longitude: "-115.56982000",
              },
            ],
          },
          {
            id: 875,
            name: "British Columbia",
            state_code: "BC",
            latitude: "53.72666830",
            longitude: "-127.64762050",
            type: null,
            cities: [
              {
                id: 16146,
                name: "Abbotsford",
                latitude: "49.05798000",
                longitude: "-122.25257000",
              },
              {
                id: 16150,
                name: "Agassiz",
                latitude: "49.23298000",
                longitude: "-121.76926000",
              },
              {
                id: 16155,
                name: "Aldergrove",
                latitude: "49.05801000",
                longitude: "-122.47087000",
              },
            ],
          },
        ],
      },
    ],
    isGoverning: true,
    isGoverned: false,
    governingJsonKey: "countries",
    governingKey: null,
    jsonKey: "id",
    jsonLabel: "name",
    helperText: "",
  },
  {
    required: false,
    placeholder: "",
    language: null,
    disabled: null,
    defaultValue: null,
    value: "",
    values: null,
    readOnly: false,
    dateFormat: null,
    order: 0,
    description: "",
    key: "states",
    label: "State",
    type: "select",
    min: null,
    max: null,
    options: [],
    governingJson: null,
    isGoverning: true,
    isGoverned: true,
    governingJsonKey: "countries",
    governingKey: "countries",
    jsonKey: "id",
    jsonLabel: "name",
    helperText: "",
  },
  {
    required: false,
    placeholder: "",
    language: null,
    disabled: null,
    defaultValue: null,
    value: "",
    values: null,
    readOnly: false,
    dateFormat: null,
    order: 0,
    description: "",
    key: "cities",
    label: "City",
    type: "select",
    min: null,
    max: null,
    options: [],
    governingJson: null,
    isGoverning: false,
    isGoverned: true,
    governingJsonKey: "countries",
    governingKey: "states",
    jsonKey: "id",
    jsonLabel: "name",
    helperText: "",
  },
];

function Wrapper(props) {
  return <div style={{ padding: "2rem" }}>{props.children}</div>;
}

export default {
  title: "DynamicFormik",
};

export const Default = () => {
  return (
    <Wrapper>
      <DynamicFormik
        id="dynamic-formik-form-id"
        inputs={inputs}
        onSubmit={() => {
          action("submit clicked");
        }}
        radioProps={({ input }) => ({ ...input, verticalWrapped: true, columnHeight: "8rem" })}
        validationSchemaExtension={additionalSchema}
      >
        {({ inputs, formikProps }) => {
          return (
            <form>
              {inputs}
              <button
                disabled={!formikProps.isValid}
                onClick={formikProps.handleSubmit}
                style={{ marginTop: "1rem" }}
                type="button"
              >
                Submit
              </button>
            </form>
          );
        }}
      </DynamicFormik>
    </Wrapper>
  );
};

Default.story = {
  name: "default",
};

export const AllowPropertySyntax = () => {
  return (
    <Wrapper>
      <DynamicFormik
        allowCustomPropertySyntax
        id="dynamic-formik-form-id"
        inputs={inputs}
        onSubmit={() => {
          action("submit clicked");
        }}
        validationSchemaExtension={additionalSchema}
      >
        {({ inputs, formikProps }) => {
          return (
            <form>
              {inputs}
              <button
                disabled={!formikProps.isValid}
                onClick={formikProps.handleSubmit}
                style={{ marginTop: "1rem" }}
                type="button"
              >
                Submit
              </button>
            </form>
          );
        }}
      </DynamicFormik>
    </Wrapper>
  );
};

AllowPropertySyntax.story = {
  name: "allow property syntax",
};

export const AllowPropertySyntaxCustomPatternB = () => {
  return (
    <Wrapper>
      <DynamicFormik
        allowCustomPropertySyntax
        customPropertySyntaxPattern={/\$\{b:([a-zA-Z0-9_.-]+)\}/}
        id="dynamic-formik-form-id"
        inputs={inputs}
        onSubmit={() => {
          action("submit clicked");
        }}
        validationSchemaExtension={additionalSchema}
      >
        {({ inputs, formikProps }) => {
          return (
            <form>
              {inputs}
              <button
                disabled={!formikProps.isValid}
                onClick={formikProps.handleSubmit}
                style={{ marginTop: "1rem" }}
                type="button"
              >
                Submit
              </button>
            </form>
          );
        }}
      </DynamicFormik>
    </Wrapper>
  );
};

AllowPropertySyntaxCustomPatternB.story = {
  name: "allow property syntax, custom pattern ${b:}",
};

export const GoverningSelects = () => {
  return (
    <Wrapper>
      <DynamicFormik
        id="dynamic-formik-form-id"
        inputs={governingSelectsInputs}
        onSubmit={() => {
          action("submit clicked");
        }}
        radioProps={({ input }) => ({ ...input, verticalWrapped: true, columnHeight: "8rem" })}
        validationSchemaExtension={additionalSchema}
      >
        {({ inputs, formikProps }) => {
          return (
            <form>
              {inputs}
              <button
                disabled={!formikProps.isValid}
                onClick={formikProps.handleSubmit}
                style={{ marginTop: "1rem" }}
                type="button"
              >
                Submit
              </button>
            </form>
          );
        }}
      </DynamicFormik>
    </Wrapper>
  );
};

GoverningSelects.story = {
  name: "governing selects",
};
