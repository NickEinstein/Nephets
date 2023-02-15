import LoginXSignupScaffold from "features/login-x-signup/LoginXSignupScaffold";
import LoginXSignupTitle from "features/login-x-signup/LoginXSignupTitle";
import { Button, Typography } from "@mui/material";
import { RouteEnum } from "constants/RouteConstants";
import { Link, useSearchParams } from "react-router-dom";
import { urlSearchParamsExtractor } from "utils/URLUtils";

function SignupCongratulations(props) {
  const [searchParam] = useSearchParams();
  const { username } = urlSearchParamsExtractor(searchParam, {
    username: "",
  });

  return (
    <LoginXSignupScaffold>
      <LoginXSignupTitle>Congratulations</LoginXSignupTitle>
      <Typography gutterBottom className="text-center">
        Your email has been verified
      </Typography>
      <Typography gutterBottom className="text-center">
        Welcome to Softwrk! Everything you have ever dreamed of is here, connect
        to great professionals. You will find amazing Talents on Softwrk. Dont
        sleep on it, wake up and complete that project you need.
      </Typography>
      <Typography className="text-center my-4">
        From all of us at Softwrk, we are glad to have you.
      </Typography>
      <div className="flex items-center justify-center">
        <Button
          component={Link}
          size="large"
          to={RouteEnum.LOGIN.concat("?username=", username)}
        >
          Explore
        </Button>
      </div>
    </LoginXSignupScaffold>
  );
}

export default SignupCongratulations;
