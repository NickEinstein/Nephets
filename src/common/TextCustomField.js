import { TextField } from "@mui/material";
import { forwardRef } from "react";

const TextCustomField = forwardRef(
  /**
   *
   * @param {TextCustomFieldProps} props
   * @returns
   */
  function TextCustomField(props, ref) {
    const { config, ...rest } = props;

    return (
      <TextField
        {...{
          ref,
          label: config?.label,
          multiline: config?.multiline,
          ...rest,
        }}
      />
    );
  }
);

export default TextCustomField;

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
 * id: string;
 * multiline: boolean;
 * minimum?: number;
 * maximum?: number;
 * } & CustomFieldConfigMixin} TextCustomFieldConfig
 */

/**
 * @typedef {{type: 'TEXT', config: TextCustomFieldConfig} & import("@mui/material").TextFieldProps} TextCustomFieldProps
 */
