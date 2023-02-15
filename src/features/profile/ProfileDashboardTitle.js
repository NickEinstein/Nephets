import { Typography } from "@mui/material";
import clsx from "clsx";

function ProfileDashboardTitle({ className, children, ...rest }) {
  return (
    <Typography variant="h5" className={clsx("font-bold", className)} {...rest}>
      {children}
    </Typography>
  );
}

export default ProfileDashboardTitle;
