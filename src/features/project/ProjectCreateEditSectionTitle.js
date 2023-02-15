import { Typography } from "@mui/material";
import clsx from "clsx";

function ProjectCreateEditSectionTitle(props) {
  return (
    <Typography variant="h6" {...props} className={clsx("font-bold", props.className)}>
      {props.children}
    </Typography>
  );
}

export default ProjectCreateEditSectionTitle;
