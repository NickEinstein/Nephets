import { Typography } from "@mui/material";
import clsx from "clsx";

function ProfileDashboardSubtitle({ className, children }) {
  return (
    <Typography variant="h6" className={clsx("font-bold", className)}>
      {children}
    </Typography>
  );
}

export default ProfileDashboardSubtitle;
