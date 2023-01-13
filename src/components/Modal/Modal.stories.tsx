import React from "react";
import {
  Button,
  ComboBox,
  Dropdown,
  ModalBody,
  MultiSelect,
  Search,
  Select,
  SelectItem,
  TextInput,
} from "@carbon/react";
import Modal from "./index";
import { ModalForm } from "../ModalForm";

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: "Base modal component used as the underlying modal for other modal components in the library",
      },
    },
  },
};

function Component1({ setIsOpen }) {
  return (
    <ModalForm>
      <ModalBody style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem", width: "30rem" }}>
        <TextInput id="input" onChange={() => {}} placeholder="e.g text input" labelText="Text input" />
        <Search placeholder="e.g. search" labelText="Search" />
        <Select>
          <SelectItem value="carbon" text="Carbon" />
          <SelectItem value="boomerang" text="Boomerang" />
        </Select>
        <MultiSelect items={["Carbon", "Boomerang"]} itemToString={(item: string) => item} label="Muliselect" />
        <Dropdown items={["Carbon", "Boomerang"]} itemToString={(item: string) => item} label="Dropdown" />
        <ComboBox items={["Carbon", "Boomerang"]} itemToString={(item: string) => item} placeholder="e.g. Combobox" />
        <Button onClick={() => setIsOpen(false)}>Close </Button>
      </ModalBody>
    </ModalForm>
  );
}

export const Default = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} appElement="#root">
        <Component1 setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
};
