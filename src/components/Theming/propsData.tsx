/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


export const initialRows = [
  {
    id: "a",
    name: "Load Balancer 3",
    protocol: "HTTP",
    port: 3000,
    rule: "Round robin",
    attached_groups: "Kevins VM Groups",
    status: "Disabled",
  },
  {
    id: "b",
    name: "Load Balancer 1",
    protocol: "HTTP",
    port: 443,
    rule: "Round robin",
    attached_groups: "Maureens VM Groups",
    status: "Starting",
  },
  {
    id: "c",
    name: "Load Balancer 2",
    protocol: "HTTP",
    port: 80,
    rule: "DNS delegation",
    attached_groups: "Andrews VM Groups",
    status: "Active",
  },
];

export const headers = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "protocol",
    header: "Protocol",
  },
  {
    key: "port",
    header: "Port",
  },
  {
    key: "rule",
    header: "Rule",
  },
  {
    key: "attached_groups",
    header: "Attached Groups",
  },
  {
    key: "status",
    header: "Status",
  },
];

export const comboBoxItems = [
  {
    id: "option-0",
    text: "Carbon",
  },
  {
    id: "option-1",
    text: "React Router",
  },
  {
    id: "option-2",
    text: "React Query",
    selected: true,
  },
  {
    id: "option-3",
    text: "Boomerang",
  },
  {
    id: "Lodash",
    text: "An example option that is really long to show what should be done to handle long text",
  },
];

export const dropdownOptions = [
  {
    id: "option-1",
    text: "The Beatles",
  },
  {
    id: "option-2",
    text: "The Rolling Stones",
  },
  {
    id: "option-3",
    text: "Pink Floyd",
  },
  {
    id: "option-4",
    text: "Bob Dylan",
  },
];

export const multiSelectOptions = [
  {
    id: "downshift-1-item-0",
    text: "Paul",
  },
  {
    id: "downshift-1-item-1",
    text: "John",
  },
  {
    id: "downshift-1-item-2",
    text: "George",
  },
  {
    id: "downshift-1-item-3",
    text: "Ringo",
  },
  {
    id: "downshift-1-item-4",
    text: "Billy",
  },
];
