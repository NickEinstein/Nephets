export const CustomFieldTypeEnum = {
  TEXT: "TEXT",
  NUMBER: "NUMBER",
  CHOICE: "CHOICE",
  ATTACHMENT: "ATTACHMENT",
};

export const DEFAULT_CUSTOM_FIELD_MIXIN = {
  label: "",
  id: "",
  description: "",
  required: false,
  deprecated: false,
};

export const DEFAULT_TEXT_CUSTOM_FIELD = {
  ...DEFAULT_CUSTOM_FIELD_MIXIN,
  type: CustomFieldTypeEnum.TEXT,
  multiline: false,
  minimum: 0,
  maximum: 100,
};

export const DEFAULT_NUMBER_CUSTOM_FIELD = {
  ...DEFAULT_CUSTOM_FIELD_MIXIN,
  type: CustomFieldTypeEnum.NUMBER,
  minimum: 0,
  maximum: 100,
};

export const DEFAULT_CHOICE_CUSTOM_FIELD = {
  ...DEFAULT_CUSTOM_FIELD_MIXIN,
  type: CustomFieldTypeEnum.CHOICE,
  choices: [],
  dropdown: false,
  multiple: false,
  minimum: 0,
  maximum: 100,
};

export const DEFAULT_ATTACHMENT_CUSTOM_FIELD = {
  ...DEFAULT_CUSTOM_FIELD_MIXIN,
  type: CustomFieldTypeEnum.ATTACHMENT,
  multiple: false,
  minimum: 0,
  maximum: 100,
};

export const DEFAULT_CUSTOM_FIELD_FILLED = {
  id: "",
  value: "",
};
