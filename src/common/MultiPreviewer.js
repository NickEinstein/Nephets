import { Icon, IconButton, TextField } from "@mui/material";
import clsx from "clsx";
import useStepper from "hooks/useStepper";
import { useState } from "react";
import AssetPreviewer from "./AssetPreviewer";
import "./MultiPreviewer.css";

/**
 *
 * @param {MultiPreviewerProps} props
 * @returns
 */
function MultiPreviewer(props) {
  const { srcs, AssetPreviewerProps, className, ...rest } = props;

  const stepper = useStepper({ maxStep: srcs?.length - 1 });

  const src = srcs?.[stepper.step];

  return (
    <div className={clsx("MultiPreviewer", className)} {...rest}>
      <AssetPreviewer {...{ ...AssetPreviewerProps, src }} />
      {!!srcs?.length && (
        <div
          className={clsx("MultiPreviewer__toolbar")}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex-1" />
          <IconButton
            size="small"
            className={clsx(
              "MultiPreviewer__navigator MultiPreviewer__navigatorLeft"
            )}
            onClick={() => stepper.prevStep()}
            disabled={!stepper.canPrevStep()}
          >
            <Icon>navigate_before</Icon>
          </IconButton>
          <IconButton
            size="small"
            className={clsx(
              "MultiPreviewer__navigator MultiPreviewer__navigatorRight"
            )}
            onClick={() => stepper.nextStep()}
            disabled={!stepper.canNextStep()}
          >
            <Icon>navigate_next</Icon>
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default MultiPreviewer;

/**
 * @typedef {{
 * srcs: (string | File)[];
 * AssetPreviewerProps: import("./AssetPreviewer").AssetPreviewerProps
 * } & import("react").ComponentProps<"div">} MultiPreviewerProps
 */
