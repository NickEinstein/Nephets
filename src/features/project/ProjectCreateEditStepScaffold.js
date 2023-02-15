import { Paper, Typography } from "@mui/material";
import clsx from "clsx";

function ProjectCreateEditStepScaffold({ title, description, children }) {
  return (
    <Paper className="p-4 md:p-8">
      <div
        className={clsx(
          "flex items-start md:flex-row gap-4 mb-8",
          !description && "items-center"
        )}
      >
        <div className="grid gap-4">
          <Typography variant="h5" className="font-bold">{title}</Typography>
          {!!description && <Typography>{description}</Typography>}
        </div>
        <div className="flex-1" />
        {/*  */}
      </div>
      {children}
    </Paper>
  );
}

export default ProjectCreateEditStepScaffold;
