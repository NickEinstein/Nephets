import ImagePreviewer from "./ImagePreviewer";
import SpreadSheetDocSvg from "assets/svgs/spreadsheet-doc.svg";
import clsx from "clsx";

/**
 *
 * @param {SpreadSheetPreviewerProps} props
 */
function SpreadSheetPreviewer(props) {
  const { src, className, ...rest } = props;
  return (
    <ImagePreviewer
      src={SpreadSheetDocSvg}
      className={clsx("p-2", className)}
      {...rest}
    />
  );
}

export default SpreadSheetPreviewer;

/**
 * @typedef {{} & import('react').ComponentProps<"img">} SpreadSheetPreviewerProps
 */
