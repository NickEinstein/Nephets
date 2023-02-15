import { Typography } from "@mui/material";

function LoginXSignupTitle(props) {
  return (
    <Typography
      variant="h4"
      color="primary"
      className="mb-8 text-center font-bold"
      {...props}
    >
      {props.children}
    </Typography>
  );
}

export default LoginXSignupTitle;
