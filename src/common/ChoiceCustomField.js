import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { forwardRef, useMemo } from "react";
import { normalizeArray } from "utils/ObjectUtils";

const ChoiceCustomField = forwardRef(
  /**
   *
   * @param {ChoiceCustomFieldProps} props
   * @returns
   */
  function ChoiceCustomField(props, ref) {
    const {
      config,
      FormControlProps,
      FormGroupProps,
      FormHelperTextProps,
      FormLabelProps,
      RadioGroupProps,
      FormControlLabelProps,
      CheckboxProps,
      RadioProps,
      TextFieldProps,
    } = props;

    const normalizedChoices = useMemo(
      () => normalizeArray(config?.choices),
      [config?.choices]
    );

    if (config.dropdown) {
      return (
        <TextField
          {...{
            ref,
            select: true,
            ...TextFieldProps,
            SelectProps: {
              multiple: config.multiple,
              // renderValue: (selected) => (
              //   <div className="flex flex-wrap gap-1">
              //     {selected.map((value) => (
              //       <Chip key={value} label={normalizedChoices?.[value]?.label} />
              //     ))}
              //   </div>
              // ),
              ...TextFieldProps?.SelectProps,
            },
          }}
        >
          {config?.choices.map((choice) => (
            <MenuItem key={choice.id} value={choice.id}>
              {choice.label}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    const groupItems = config?.choices?.map((choice) => (
      <FormControlLabel
        {...{
          key: choice.id,
          label: choice.label,
          ...(config?.multiple
            ? { control: <Checkbox {...CheckboxProps} /> }
            : { control: <Radio {...RadioProps} /> }),
          ...FormControlLabelProps,
        }}
      />
    ));

    return (
      <FormControl
        ref={ref}
        {...FormControlProps}
        className={clsx("", FormControlProps?.className)}
      >
        {!!config.label && (
          <FormLabel
            {...FormLabelProps}
            className={clsx("", FormLabelProps?.className)}
          >
            {config.label}
          </FormLabel>
        )}
        {config?.description && (
          <Typography color="textSecondary" variant="body2">
            {config?.description}
          </Typography>
        )}
        {config.multiple ? (
          <FormGroup {...FormGroupProps}>{groupItems}</FormGroup>
        ) : (
          <RadioGroup {...{ ...FormGroupProps, ...RadioGroupProps }}>
            {groupItems}
          </RadioGroup>
        )}
      </FormControl>
    );
  }
);

export default ChoiceCustomField;

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
 * choices: CustomFieldConfigMixin[];
 * dropdown: boolean;
 * multiple: boolean;
 * minimum?: number;
 * maximum?: number;
 * } & CustomFieldConfigMixin} ChoiceCustomFieldConfig
 */

/**
 * @typedef {{
 * type: 'CHOICE';
 * config: ChoiceCustomFieldConfig;
 * TextFieldProps: import("@mui/material").TextFieldProps;
 * FormControlProps: import("@mui/material").FormControlProps;
 * FormLabelProps: import("@mui/material").FormLabelProps;
 * FormGroupProps: import("@mui/material").FormGroupProps;
 * RadioGroupProps: import("@mui/material").RadioGroupProps;
 * FormHelperTextProps: import("@mui/material").FormHelperTextProps;
 * FormControlLabelProps: import("@mui/material").FormControlLabelProps;
 * CheckboxProps: import("@mui/material").CheckboxProps;
 * RadioProps: import("@mui/material").RadioProps;
 * }} ChoiceCustomFieldProps
 */
