import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import TextInput from "../TextInput";
import AutoSuggest from "./AutoSuggest";

export default {
  title: "Inputs/AutoSuggest",
  component: AutoSuggest,
};

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

export const Default = () => {
  return (
    <div style={{ width: "25rem" }}>
      <AutoSuggest
        autoSuggestions={animals}
        inputProps={{
          id: text("id", "auto-suggest"),
          placeholder: text("placeholder", "Type an animal"),
          labelText: text("labelText", "Animal"),
        }}
        onChange={action("Auto suggest change")}
      >
        <TextInput />
      </AutoSuggest>
    </div>
  );
};
