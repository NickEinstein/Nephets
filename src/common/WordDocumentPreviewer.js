import ImagePreviewer from "./ImagePreviewer";
import WordDocSvg from "assets/svgs/word-doc.svg";
import clsx from "clsx";

/**
 *
 * @param {WordDocumentPreviewerProps} props
 */
function WordDocumentPreviewer(props) {
  const { src, className, ...rest } = props;
  return (
    <ImagePreviewer
      src={WordDocSvg}
      className={clsx("p-2", className)}
      {...rest}
    />
  );
}

export default WordDocumentPreviewer;

/**
 * @typedef {{} & import('react').ComponentProps<"img">} WordDocumentPreviewerProps
 */
