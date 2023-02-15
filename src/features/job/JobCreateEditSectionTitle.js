import { Typography } from "@mui/material";
import clsx from "clsx";

function JobCreateEditSectionTitle(props) {
  return (
    <Typography
      variant="h6"
      {...props}
      className={clsx("font-bold", props.className)}
    >
      {props.children}
    </Typography>
  );
}

export default JobCreateEditSectionTitle;
