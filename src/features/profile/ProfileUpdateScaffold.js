import { Paper, Typography } from "@mui/material";
import clsx from "clsx";
import useAuthUser from "hooks/useAuthUser";
import ProfileProgress from "./ProfileProgress";

function ProfileUpdateScaffold({ title, description, children }) {
  const authUser = useAuthUser();
  return (
    <Paper className="p-4 md:p-8">
      <div
        className={clsx(
          "flex items-start flex-row-reverse md:flex-row gap-4 mb-8",
          !description && "items-center"
        )}
      >
        <div className="grid gap-4">
          <Typography variant="h5">{title}</Typography>
          {!!description && <Typography>{description}</Typography>}
        </div>
        <div className="flex-1" />
        <ProfileProgress value={authUser?.profile_progress} />
      </div>
      {children}
    </Paper>
  );
}

export default ProfileUpdateScaffold;
