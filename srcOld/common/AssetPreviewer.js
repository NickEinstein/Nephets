import { useMemo } from "react";
import { AssetTypeEnum } from "constants/AssetConstants";
import FileTypeZipSvg from "assets/svgs/file-type-zip.svg";
import ImagePreviewer from "./ImagePreviewer";
import VideoPreviewer from "./VideoPreviewer";
import AudioPreviewer from "./AudioPreviewer";
import PdfPreviewer from "./PdfPreviewer";
import { getAssetInfo } from "utils/AssetUtils";
import SpreadSheetPreviewer from "./SpreadSheetPreviewer";
import WordDocumentPreviewer from "./WordDocumentPreviewer";

/**
 *
 * @param {AssetPreviewerProps} props
 */
function AssetPreviewer(props) {
  const {
    src,
    ImagePreviewerProps,
    VideoPreviewerProps,
    AudioPreviewerProps,
    PdfPreviewerProps,
    WordDocumentPreviewerProps,
    SpreadSheetPreviewerProps,
    ...rest
  } = props;
  const { name, type } = useMemo(() => getAssetInfo(src), [src]);

  if ([AssetTypeEnum.JPEG, AssetTypeEnum.JPG, AssetTypeEnum.PNG].includes(type))
    return (
      <ImagePreviewer alt={name} src={src} {...rest} {...ImagePreviewerProps} />
    );

  if ([AssetTypeEnum.WAV, AssetTypeEnum.WEBM, AssetTypeEnum.MP4].includes(type))
    return <VideoPreviewer src={src} {...rest} {...VideoPreviewerProps} />;

  if ([AssetTypeEnum.MP3].includes(type))
    return <AudioPreviewer src={src} {...rest} {...AudioPreviewerProps} />;

  if ([AssetTypeEnum.PDF].includes(type))
    return <PdfPreviewer src={src} {...rest} {...PdfPreviewerProps} />;

  if ([AssetTypeEnum.DOC, AssetTypeEnum.DOCX].includes(type))
    return (
      <WordDocumentPreviewer
        src={src}
        {...rest}
        {...WordDocumentPreviewerProps}
      />
    );

  if ([AssetTypeEnum.XLS, AssetTypeEnum.XLSX].includes(type))
    return (
      <SpreadSheetPreviewer
        src={src}
        {...rest}
        {...SpreadSheetPreviewerProps}
      />
    );

  if ([AssetTypeEnum.ZIP, AssetTypeEnum.RAR, AssetTypeEnum.ISO].includes(type))
    return (
      <ImagePreviewer
        alt={name}
        src={FileTypeZipSvg}
        {...rest}
        {...ImagePreviewerProps}
      />
    );

  return null;
}

export default AssetPreviewer;

/**
 * @typedef {{
 * src: File | string;
 * type: keyof typeof AssetTypeEnum;
 * ImagePreviewerProps: import("./ImagePreviewer").ImagePreviewerProps;
 * VideoPreviewerProps: import("./VideoPreviewer").VideoPreviewerProps;
 * AudioPreviewerProps: import("./AudioPreviewer").AudioPreviewerProps;
 * PdfPreviewerProps: import("./PdfPreviewer").PdfPreviewerProps;
 * SpreadSheetPreviewerProps: import("./SpreadSheetPreviewer").SpreadSheetPreviewerProps;
 * WordDocumentPreviewerProps: import("./WordDocumentPreviewer").WordDocumentPreviewerProps
 * }} AssetPreviewerProps
 */
