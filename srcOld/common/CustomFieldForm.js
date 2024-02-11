import {
  Button,
  Checkbox,
  FormControlLabel,
  Icon,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { CustomFieldTypeEnum } from "constants/CustomFieldConstants";
import { useFormik } from "formik";
import useDataRef from "hooks/useDataRef";
import { useEffect } from "react";
import {
  getCheckFieldFormikProps,
  getTextFieldFormikProps,
  yupCustomField,
} from "utils/FormikUtils";

/**
 *
 * @param {CustomFieldFormProps} props
 * @returns
 */
function CustomFieldForm(props) {
  const {
    initialValues,
    onCancel,
    onSave,
    LabelFieldProps,
    DescriptionFieldProps,
    TypeFieldProps,
    ...rest
  } = props;

  const formik = useFormik({
    initialValues: {
      type: "",
      ...DEFAULT_FILEDS,
      multiline: false,
      minimum: 0,
      maximum: 100,
      multiple: false,
      choices: [],
      dropdown: false,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: yupCustomField(),
    onSubmit: async (values) => {
      onSave?.(values);
      handleCancel?.();
    },
  });

  // console.log(formik.errors);

  function handleCancel(params) {
    formik.resetForm();
    onCancel?.();
  }

  const dataRef = useDataRef({ formik });

  useEffect(() => {
    const values = dataRef.current.formik.values;
    dataRef.current.formik.setValues({
      type: initialValues?.type || values.type,
      label: initialValues?.label || values.label,
      description: initialValues?.description || values.description,
      required: initialValues?.required || values.required,
      deprecated: initialValues?.deprecated || values.deprecated,
      multiline: initialValues?.multiline || values.multiline,
      minimum: initialValues?.minimum || values.minimum,
      maximum: initialValues?.maximum || values.maximum,
      multiple: initialValues?.multiple || values.multiple,
      choices: initialValues?.choices || values.choices,
      dropdown: initialValues?.dropdown || values.dropdown,
    });
  }, [
    dataRef,
    initialValues?.choices,
    initialValues?.deprecated,
    initialValues?.description,
    initialValues?.dropdown,
    initialValues?.label,
    initialValues?.maximum,
    initialValues?.minimum,
    initialValues?.multiline,
    initialValues?.multiple,
    initialValues?.required,
    initialValues?.type,
  ]);

  return (
    <div {...rest}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mb-4">
        <TextField
          label="Name"
          margin="normal"
          fullWidth
          {...getTextFieldFormikProps(formik, "label")}
          {...LabelFieldProps}
        />
        <TextField
          label="Type"
          margin="normal"
          fullWidth
          select
          {...getTextFieldFormikProps(formik, "type")}
          {...TypeFieldProps}
        >
          {Object.values(CustomFieldTypeEnum).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Description"
          margin="normal"
          fullWidth
          multiline
          maxRows={2}
          className="sm:col-span-2"
          {...getTextFieldFormikProps(formik, "description")}
          {...DescriptionFieldProps}
        />
        {formik.values.multiple && (
          <>
            <TextField
              label="Minimum"
              margin="normal"
              fullWidth
              {...getTextFieldFormikProps(formik, "minimum")}
              {...LabelFieldProps}
            />
            <TextField
              label="Maximum"
              margin="normal"
              fullWidth
              {...getTextFieldFormikProps(formik, "maximum")}
              {...LabelFieldProps}
            />
          </>
        )}
        {[
          { label: "Mandatory", key: "required" },
          { label: "Deprecated", key: "deprecated" },
          ...(formik.values.type === CustomFieldTypeEnum.TEXT
            ? [{ label: "Multiline", key: "multiline" }]
            : formik.values.type === CustomFieldTypeEnum.CHOICE
            ? [{ label: "Dropdown Input", key: "dropdown" }]
            : []),
          ...(formik.values.type === CustomFieldTypeEnum.CHOICE ||
          formik.values.type === CustomFieldTypeEnum.ATTACHMENT
            ? [{ label: "Multiple", key: "multiple" }]
            : []),
        ].map((item) => (
          <FormControlLabel
            key={item.label}
            label={item.label}
            control={
              <Checkbox {...getCheckFieldFormikProps(formik, item.key)} />
            }
          />
        ))}
      </div>
      {formik.values.type === CustomFieldTypeEnum.CHOICE && (
        <>
          <Typography className="font-bold">Choices</Typography>
          {formik.values.choices.map((choice, index) => {
            const key = `choices.${index}`;
            return (
              <div
                key={index}
                className="relative grid grid-cols-1 sm:grid-cols-2 gap-x-4 mb-1"
              >
                <TextField
                  label="Name"
                  margin="normal"
                  fullWidth
                  {...getTextFieldFormikProps(formik, key + ".label")}
                  {...LabelFieldProps}
                />
                <TextField
                  label="Description"
                  margin="normal"
                  fullWidth
                  {...getTextFieldFormikProps(formik, key + ".description")}
                  {...DescriptionFieldProps}
                />
                {[
                  { label: "Mandatory", key: key + ".required" },
                  { label: "Deprecated", key: key + ".deprecated" },
                ].map((item) => (
                  <FormControlLabel
                    key={item.label}
                    label={item.label}
                    control={
                      <Checkbox
                        {...getCheckFieldFormikProps(formik, item.key)}
                      />
                    }
                  />
                ))}
                <IconButton
                  color="error"
                  className="absolute -right-4 -top-4"
                  onClick={() => {
                    const newChoices = [...formik.values.choices];
                    newChoices.splice(index, 1);
                    formik.setFieldValue("choices", newChoices);
                  }}
                >
                  <Icon>cancel</Icon>
                </IconButton>
              </div>
            );
          })}
          <div className="flex items-center justify-center">
            <Button
              size="small"
              onClick={() => {
                const newRequirements = [
                  ...formik.values.choices,
                  DEFAULT_FILEDS,
                ];
                formik.setFieldValue("choices", newRequirements);
              }}
            >
              Add Choice
            </Button>
          </div>
        </>
      )}
      <div className="flex items-center gap-2">
        <div className="flex-1" />
        <Button size="small" variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button size="small" onClick={formik.handleSubmit}>
          {initialValues ? "Update" : "Add"}
        </Button>
      </div>
    </div>
  );
}

export default CustomFieldForm;

const DEFAULT_FILEDS = {
  label: "",
  description: "",
  required: false,
  deprecated: false,
};

/**
 * @typedef {{
 * onCancel: () => void
 * onSave: (values: any) => void
 * LabelFieldProps: import('@mui/material').TextFieldProps;
 * DescriptionFieldProps: import('@mui/material').TextFieldProps;
 * TypeFieldProps: import('@mui/material').TextFieldProps;
 * }} CustomFieldFormProps
 */
