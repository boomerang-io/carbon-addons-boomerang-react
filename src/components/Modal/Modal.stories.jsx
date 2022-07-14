import React from "react";

import {
  TextArea,
  TextInput,
  ModalBody,
  Search,
  MultiSelect,
  Dropdown,
  Select,
  SelectItem,
  ComboBox,
  Toggle,
} from "@carbon/react";
import Modal from "./index";
import { ModalForm } from "../ModalForm";

export default {
  title: "Components/Modal",
};

function Component1() {
  return (
    <ModalForm>
      <ModalBody>
        <TextInput id="input" onChange={() => {}} placeholder="This is an input" />
        <TextArea id="area" onChange={() => {}} placeholder="This is a text area" />
        <Search placeHolderText="This is a search" />
        <Select>
          <SelectItem value="test" text="test" />
          <SelectItem value="this" text="this" />
        </Select>
        <MultiSelect items={["test", "this"]} itemToString={(item) => item} label="This is an multi" />
        <Dropdown items={["test", "this"]} itemToString={(item) => item} label="This is an dropdown" />
        <ComboBox items={["test", "this"]} itemToString={(item) => item} placeholder="This is an combo" />
        <Toggle />
      </ModalBody>
    </ModalForm>
  );
}


export const Default = () => {
  return (
    <Modal isOpen appElement="#root">
      <Component1 />
    </Modal>
  );
};

Default.story = {
  name: "default",
};
