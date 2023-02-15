import clsx from "clsx";
import { useMemo } from "react";

/**
 *
 * @param {AudioPreviewerProps} props
 */
function AudioPreviewer(props) {
  const { src, className, onLoad, ...rest } = props;
  const isFile = src instanceof File;
  const _src = useMemo(
    () => (isFile ? URL.createObjectURL(src) : src),
    [isFile, src]
  );
  
  return (
    <audio
      className={clsx("AudioPreviewer", className)}
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

export default AudioPreviewer;

/**
 * @typedef {{} & import('react').ComponentProps<"audio">} AudioPreviewerProps
 */
