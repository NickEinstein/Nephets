import { Typography } from "@mui/material";
import clsx from "clsx";

function SettingTitle(props) {
  return (
    <Typography
      variant="h5"
      {...props}
      className={clsx("mb-4", props.className)}
    />
  );
}

export default SettingTitle;
