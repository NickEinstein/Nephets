import clsx from "clsx";
import { useMemo } from "react";
import ImagePreviewer from "./ImagePreviewer";
import PdfSvg from "assets/svgs/pdf.svg";
import "./PdfPreviewer.css";

/**
 *
 * @param {PdfPreviewerProps} props
 */
function PdfPreviewer(props) {
  const { data, src, disabled, className, onLoad, ...rest } = props;
  const isFile = data instanceof File || src instanceof File;
  const _data = useMemo(
    () => (isFile ? URL.createObjectURL(data || src) : data || src),
    [isFile, data, src]
  );

  return (
    <object
      className={clsx("PdfPreviewer", className, {
        "PdfPreviewer--disabled": disabled,
      })}
      type="application/pdf"
      data={_data}
      onLoad={(e) => {
        if (isFile) {
          URL.revokeObjectURL(_data);
        }
        onLoad?.(e);
      }}
      {...rest}
    >
      <ImagePreviewer src={PdfSvg} className={clsx("p-4", className)} />
    </object>
  );
}

export default PdfPreviewer;

/**
 * @typedef {{
 * src: string | File;
 *  disabled: boolean
 * } & import('react').ComponentProps<"object">} PdfPreviewerProps
 */
