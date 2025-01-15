import React from "react";
import RichTextArea from "./RichTextArea";

export default {
  title: "Inputs/RichTextArea",
  component: RichTextArea,
  parameters: {
    docs: {
      description: {
        component: "Text area with rich text support and tools.",
      },
    },
  },
  decorators: [(story) => <div style={{ maxWidth: "25rem", padding: "1rem" }}>{story()}</div>],
};

export const Default = (args) => {
  return (
    <>
      <RichTextArea
        label="Rich text editor label"
        helperText="Rich text editor help text"
        id="default-text-area"
        placeholder={"Placeholder text"}
        maxWordCount={10}
        {...args}
      />
    </>
  );
};
