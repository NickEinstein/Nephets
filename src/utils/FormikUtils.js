import { objectAccessor } from "./ObjectUtils";
import * as yup from "yup";
import { CustomFieldTypeEnum } from "constants/CustomFieldConstants";

export function getTextFieldFormikHelperText(formik, key, helperText) {
  return !!objectAccessor(formik.touched, key) &&
    objectAccessor(formik.errors, key)
    ? objectAccessor(formik.errors, key)
    : helperText;
}

export function getTextFieldFormikError(formik, key) {
  return (
    !!objectAccessor(formik.touched, key) &&
    !!objectAccessor(formik.errors, key)
  );
}

/**
 *
 * @param {*} formik
 * @param {*} key
 * @returns
 */
export function getTextFieldFormikHelperTextAndErrorProps(
  formik,
  key,
  helperText
) {
  return {
    error: getTextFieldFormikError(formik, key),
    helperText: getTextFieldFormikHelperText(formik, key, helperText),
  };
}

/**
 *
 * @param {*} formik
 * @param {*} key
 * @returns
 */
export function getTextFieldFormikProps(formik, key, helperText) {
  return {
    ...formik.getFieldProps(key),
    ...getTextFieldFormikHelperTextAndErrorProps(formik, key, helperText),
  };
}

export function getCheckFieldFormikProps(
  formik,
  key,
  checkedValue = true
  // unCheckedValue = false
) {
  const textFieldProps = getTextFieldFormikProps(formik, key);
 
  const value =
    typeof checkedValue === "boolean"
      ? !!textFieldProps.value
      : textFieldProps.value;
  return {
    ...textFieldProps,
    value: value,
    checked: value === checkedValue,
  };
  // return {
  //   checked: !!formik.values[key],
  //   onChange: (e) => formik.setFieldValue(key, e.target.checked),
  // };
}

export const yupCustomField = () =>
  yup.lazy((values) => {
    const generalSchema = () => ({
      label: yup.string().trim().required(),
      // id: yup
      //   .string()
      //   .trim()
      //   .default(() => new ObjectId().toString())
      //   .required(),
      description: yup.string().trim().optional(),
      required: yup.boolean().default(false).optional(),
      deprecated: yup.boolean().default(false).optional(),
    });

    const generalFieldSchema = {
      ...generalSchema(),
      type: yup
        .string()
        .trim()
        .oneOf(Object.values(CustomFieldTypeEnum))
        .required(),
      minimum: yup.number().optional(),
      maximum: yup.number().optional(),
    };

    const generalChoiceSchema = {
      ...generalSchema(),
    };

    switch (values.type) {
      case CustomFieldTypeEnum.TEXT:
        return yup.object({
          ...generalFieldSchema,
          multiline: yup.boolean().default(false).optional(),
        });
      case CustomFieldTypeEnum.NUMBER:
        return yup.object({
          ...generalFieldSchema,
        });
      case CustomFieldTypeEnum.CHOICE:
        return yup.object({
          ...generalFieldSchema,
          choices: yup
            .array(yup.object({ ...generalChoiceSchema }))
            .min(1)
            .required(),
          dropdown: yup.boolean().optional(),
          multiple: yup.boolean().optional(),
        });
      case CustomFieldTypeEnum.ATTACHMENT:
        return yup.object({
          ...generalFieldSchema,
          multiple: yup.boolean().optional(),
        });
      default:
        return yup.mixed().test({
          test(_, ctx) {
            return ctx.createError({ message: "Invalid Type" });
          },
        });
    }
  });

export const yupCustomFieldFilled = () =>
  yup.object({
    id: yup.string().trim().required(),
    value: yup
      .mixed()
      .oneOf([yup.array(yup.mixed().required()), yup.mixed().required()]),
  });
