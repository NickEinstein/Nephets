import UserApi from "apis/UserApi";
import { useSnackbar } from "notistack";
import LoginXSignupScaffold from "features/login-x-signup/LoginXSignupScaffold";
import LoginXSignupTitle from "features/login-x-signup/LoginXSignupTitle";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useMountEffect from "hooks/useMountEffect";
import { RouteEnum } from "constants/RouteConstants";

function SignupVerification(props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id, otp } = useParams();

  const [verifyUserMutation, verifyUserMutationResult] =
    UserApi.useVerifyUserMutation();

  async function verifyUser() {
    try {
      const data = await verifyUserMutation({
        data: { id, otp },
      }).unwrap();
      enqueueSnackbar(data?.message || "Verification sent", {
        variant: "success",
      });
      navigate(
        RouteEnum.SIGNUP_CONGRATULATIONS.concat(
          "?username=",
          data?.data?.user?.email_address
        )
      );
    } catch (error) {
      enqueueSnackbar(error?.data?.message || "Failed to send verification", {
        variant: "error",
      });
    }
  }

  useMountEffect(() => {
    verifyUser();
  });

  return (
    <LoginXSignupScaffold>
      {verifyUserMutationResult.isLoading && (
        <>
          <LoginXSignupTitle>Verifying your email</LoginXSignupTitle>
          <Typography className="text-center">
            This will only take a few minutes
          </Typography>
          <div className="flex items-center justify-center my-4">
            <CircularProgress size={80} />
          </div>
        </>
      )}
      {verifyUserMutationResult.isError && (
        <>
          <LoginXSignupTitle>Error Verifying</LoginXSignupTitle>
          <Typography className="text-center mb-4" color="textSecondary">
            Click the button below to reverify
          </Typography>
          <div className="flex items-center justify-center">
            <Button onClick={verifyUser} size="large">
              Try Again
            </Button>
          </div>
        </>
      )}
    </LoginXSignupScaffold>
  );
}

export default SignupVerification;
