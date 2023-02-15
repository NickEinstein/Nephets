import { CustomFieldTypeEnum } from "constants/CustomFieldConstants";
import { forwardRef } from "react";
import AttachmentCustomField from "./AttachmentCustomField";
import ChoiceCustomField from "./ChoiceCustomField";
import NumberCustomField from "./NumberCustomField";
import TextCustomField from "./TextCustomField";

const CustomField = forwardRef(
  /**
   * @param {CustomFieldProps} props
   */
  function CustomField(props, ref) {
    const { type, ...rest } = props;
    switch (type) {
      case CustomFieldTypeEnum.TEXT:
        return <TextCustomField {...{ ...rest, ref }} />;
      case CustomFieldTypeEnum.NUMBER:
        return <NumberCustomField {...{ ...rest, ref }} />;
      case CustomFieldTypeEnum.CHOICE:
        return <ChoiceCustomField {...{ ...rest, ref }} />;
      case CustomFieldTypeEnum.ATTACHMENT:
        return <AttachmentCustomField {...{ ...rest, ref }} />;
      default:
        return null;
    }
  }
);

export default CustomField;

/**
 * @typedef {import("./TextCustomField").TextCustomFieldProps
 * | import("./NumberCustomField").NumberCustomFieldProps
 * | import("./ChoiceCustomField").ChoiceCustomFieldProps
 * | import("./AttachmentCustomField").AttachmentCustomFieldProps
 * } CustomFieldProps
 */
