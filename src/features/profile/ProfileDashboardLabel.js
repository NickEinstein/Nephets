import { Typography } from "@mui/material";
import clsx from "clsx";

function ProfileDashboardLabel({ className, children }) {
  return (
    <Typography className={clsx("font-semibold", className)}>
      {children}
    </Typography>
  );
}

export default ProfileDashboardLabel;
