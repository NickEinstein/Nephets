import { forwardRef } from "react";
import Dropzone from "react-dropzone";
import AssetPreviewer from "./AssetPreviewer";
import DropzoneField from "./DropzoneField";
import MultiPreviewer from "./MultiPreviewer";
import HelpTooltipLabel from "./HelpTooltipLabel";

const AttachmentCustomField = forwardRef(
  /**
   *
   * @param {AttachmentCustomFieldProps} props
   * @returns
   */
  function AttachmentCustomField(props) {
    const { config, DropzoneFieldProps, ...rest } = props;

    return (
      <Dropzone
        {...{
          multiple: config?.multiple,
          maxFiles: config?.maximum,
          ...rest,
        }}
      >
        {(dropzone) => (
          <DropzoneField
            {...{
              dropzone,
              label: config.description ? (
                <HelpTooltipLabel
                  label={config?.label}
                  title={config?.description}
                />
              ) : (
                config?.label
              ),
              ...DropzoneFieldProps,
            }}
          >
            {() =>
              false ? (
                config?.multiple ? (
                  <MultiPreviewer />
                ) : (
                  <AssetPreviewer />
                )
              ) : null
            }
          </DropzoneField>
        )}
      </Dropzone>
    );
  }
);

export default AttachmentCustomField;

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
 * multiple: boolean;
 * minimum?: number;
 * maximum?: number;
 * } & CustomFieldConfigMixin} AttachmentCustomFieldConfig
 */

/**
 * @typedef {{
 * type: 'ATTACHMENT';
 * config: AttachmentCustomFieldConfig;
 * DropzoneFieldProps: import("./DropzoneField").DropzoneFieldProps;
 * FormControlProps: import("@mui/material").FormControlProps;
 * FormLabelProps: import("@mui/material").FormLabelProps;
 * FormHelperTextProps: import("@mui/material").FormHelperTextProps;
 * } & import("react-dropzone").DropzoneProps} AttachmentCustomFieldProps
 */
