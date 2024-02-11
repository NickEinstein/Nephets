import { TextField } from "@mui/material";
import { forwardRef } from "react";

const NumberCustomField = forwardRef(
  /**
   *
   * @param {NumberCustomFieldProps} props
   * @returns
   */
  function NumberCustomField(props, ref) {
    const { config, value, onChange, ...rest } = props;
    return (
      <TextField
        {...{
          ref,
          type: "number",
          ...rest,
          inputProps: {
            min: config?.minimum,
            max: config?.maximum,
            ...rest?.inputProps,
          },
          ...(value ? { value: value?.value } : {}),
          onChange: (e) => {
            onChange?.({ id: config.id, value: e.target.value });
          },
        }}
      />
    );
  }
);

export default NumberCustomField;

/**
 * @typedef {{
 * label: string;
 * id: string;
 * description: string;
 * required: boolean;
 * deprecated: boolean;
 * }} CustomFieldConfigMixin
 */

/**
 * @typedef {{
 * minimum?: number;
 * maximum?: number;
 * } & CustomFieldConfigMixin} NumberCustomFieldConfig
 */

/**
 * @typedef {{
 * type: 'NUMBER';
 * config: NumberCustomFieldConfig
 * } & import("@mui/material").TextFieldProps} NumberCustomFieldProps
 */
