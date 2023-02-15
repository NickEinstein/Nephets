import { Typography } from "@mui/material";

/**
 *
 * @param {import("@mui/material").TypographyProps} props
 * @returns
 */
function JobCreateEditSectionDescription(props) {
  return (
    <Typography variant="body2" {...props}>
      {props.children}
    </Typography>
  );
}

export default JobCreateEditSectionDescription;
