import { LinearProgress, Typography } from "@mui/material";

function ProfileProgress({ value = 0 }) {
  return (
    <div>
      <Typography gutterBottom>{value}% Complete</Typography>
      <LinearProgress
        className="h-2 rounded-lg"
        variant="determinate"
        value={value}
      />
    </div>
  );
}

export default ProfileProgress;
