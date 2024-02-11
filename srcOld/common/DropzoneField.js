import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import clsx from "clsx";
import "./DropzoneField.css";

/**
 *
 * @param {DropzoneFieldProps} props
 * @returns
 */
function DropzoneField(props) {
  const {
    label,
    helperText,
    FormLabelProps,
    InputContainerProps,
    FormHelperTextProps,
    dropzone,
    className,
    children,
    ...rest
  } = props;
  const { getRootProps, getInputProps } = dropzone;
  return (
    <FormControl {...rest} className={clsx("DropzoneField", className)}>
      {!!label && <FormLabel {...FormLabelProps}>{label}</FormLabel>}
      <div
        {...getRootProps({
          ...InputContainerProps,
          className: clsx(
            "DropzoneField__inputContainer",
            InputContainerProps?.className,
            {
              // [classes.active]: dropzone.isDragActive,
              // [classes.accept]: dropzone.isDragAccept,
              // [classes.reject]: dropzone.isDragReject || error,
            }
          ),
        })}
      >
        <input {...getInputProps()} />
        {children?.(dropzone)}
      </div>
      {!!helperText && (
        <FormHelperText {...FormHelperTextProps}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

/**
 * @type {DropzoneFieldProps}
 */
DropzoneField.defaultProps = {
  variant: "outlined",
};

export default DropzoneField;

/**
 * @typedef {import("@mui/material").PaperProps &  {
 * label: import("react").ReactNode;
 * helperText: import("react").ReactNode;
 * dropzone: import('react-dropzone').DropzoneState;
 * FormLabelProps: import("@mui/material").FormLabelProps;
 * InputContainerProps: import("react").ComponentPropsWithRef<"div">;
 * FormHelperTextProps: import("@mui/material").FormHelperTextProps;
 * children: (dropzone: import('react-dropzone').DropzoneState) => import("react").ReactNode;
 * } & import("@mui/material").FormControlProps} DropzoneFieldProps
 */
