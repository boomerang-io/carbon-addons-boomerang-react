import { action } from "@storybook/addon-actions";
import TextInput from "../TextInput";
import AutoSuggest from "./AutoSuggest";

const animals = [
  { label: "caribou", value: "caribou" },
  { label: "cat", value: "cat" },
  { label: "catfish", value: "catfish" },
  { label: "cheetah", value: "cheetah" },
  { label: "chipmunk", value: "chipmunk" },
  { label: "dog", value: "dog" },
  { label: "dolphin", value: "dolphin" },
  { label: "dove", value: "dove" },
  { label: "panda", value: "panda" },
  { label: "parrot", value: "parrot" },
  { label: "peacock", value: "peacock" },
  { label: "penguin", value: "penguin" },
];

export default {
  title: "Inputs/AutoSuggest",
  component: AutoSuggest,
  parameters: {
    docs: {
      description: {
        component: "An enhanced TextInput that supports selecting from a provided list of options.",
      },
    },
  },
  decorators: [(story: any) => <div style={{ maxWidth: "25rem", minHeight: "20rem" }}>{story()}</div>],
  argTypes: {
    autoSuggestions: { control: "array", defaultValue: animals },
    inputProps: {
      control: "object",
      defaultValue: {
        id: "auto-suggest",
        placeholder: "Type an animal",
        labelText: "Animal",
      },
    },
  },
};

export const Default = (args: any) => {
  return (
    <AutoSuggest onChange={action("Auto suggest change")} {...args}>
      <TextInput id="auto-suggest"/>
    </AutoSuggest>
  );
};
