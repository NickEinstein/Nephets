import clsx from "clsx";
import { forwardRef, useMemo } from "react";

const VideoPreviewer = forwardRef(
  /**
   *
   * @param {VideoPreviewerProps} props
   */
  function VideoPreviewer(props, ref) {
    const { src, className, onLoad, ...rest } = props;
    const isFile = src instanceof File;
    const _src = useMemo(
      () => (isFile ? URL.createObjectURL(src) : src),
      [isFile, src]
    );

    return (
      <video
        ref={ref}
        className={clsx("VideoPreviewer", className)}
        src={_src}
        onLoad={(e) => {
          if (isFile) {
            URL.revokeObjectURL(_src);
          }
          onLoad?.(e);
        }}
        {...rest}
      />
    );
  }
);

export default VideoPreviewer;

/**
 * @typedef {{} & import('react').ComponentProps<"video">} VideoPreviewerProps
 */
