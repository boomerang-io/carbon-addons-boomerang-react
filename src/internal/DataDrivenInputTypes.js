export const CHECKBOX_TYPES = {
  CHECKBOX: 'checkbox',
};

export const CREATABLE_TYPES = {
  CREATABLE_SINGLE: 'creatable-single',
  CREATABLE_PAIR: 'creatable-pair',
};

export const MULTI_SELECT_TYPES = {
  MULTI_SELECT: 'multiselect',
};

export const RADIO_TYPES = {
  RADIO: 'radio',
};

export const SELECT_TYPES = {
  SELECT: 'select',
};

export const TEXT_AREA_TYPES = {
  TEXT_AREA: 'textarea',
};

export const TEXT_EDITOR_TYPES = {
  TEXT_EDITOR: 'texteditor',
};

export const TEXT_INPUT_TYPES = {
  TEXT: 'text',
  PASSWORD: 'password',
  SECURED: 'secured',
  NUMBER: 'number',
  URL: 'url',
  EMAIL: 'email',
  TIME: 'time',
  TEL: 'tel',
};

export const BOOLEAN_TYPES = {
  BOOLEAN: 'boolean',
};

export const INPUT_GROUPS = {
  CHECKBOX: 'checkbox',
  CREATABLE: 'creatable',
  MULTI_SELECT: 'multiselect',
  RADIO: 'radio',
  SELECT: 'select',
  TEXT_AREA: 'textArea',
  TEXT_EDITOR: 'textEditor',
  TEXT_INPUT: 'textInput',
  BOOLEAN: 'boolean',
};

export const INPUT_TYPES_ARRAY = Object.values({
  ...CHECKBOX_TYPES,
  ...CREATABLE_TYPES,
  ...MULTI_SELECT_TYPES,
  ...RADIO_TYPES,
  ...SELECT_TYPES,
  ...TEXT_AREA_TYPES,
  ...TEXT_EDITOR_TYPES,
  ...TEXT_INPUT_TYPES,
});
