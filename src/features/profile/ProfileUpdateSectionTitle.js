import { Typography } from "@mui/material";
import clsx from "clsx";

function ProfileUpdateSectionTitle(props) {
  return (
    <Typography
      variant="h6"
      color="primary"
      {...props}
      className={clsx("font-bold", props.className)}
    >
      {props.children}
    </Typography>
  );
}

export default ProfileUpdateSectionTitle;
