import UserApi from "apis/UserApi";
import { useSnackbar } from "notistack";
import LoginXSignupScaffold from "features/login-x-signup/LoginXSignupScaffold";
import LoginXSignupTitle from "features/login-x-signup/LoginXSignupTitle";
import { Link, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { urlSearchParamsExtractor } from "utils/URLUtils";
import MuiRouterLink from "common/MuiRouterLink";
import { LoadingButton } from "@mui/lab";

function SignupVerificationRequest(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [searchParam] = useSearchParams();
  const { username, id } = urlSearchParamsExtractor(searchParam, {
    username: "",
    id: "",
  });

  const [resendUserVerificationMutation, resendUserVerificationMutationResult] =
    UserApi.useResendUserVerificationMutation();

  async function resendVerification() {
    try {
      const data = await resendUserVerificationMutation({
        data: { id },
      }).unwrap();
      enqueueSnackbar(data?.message || "Verification sent", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error?.data?.message || "Failed to send verification", {
        variant: "error",
      });
    }
  }

  return (
    <LoginXSignupScaffold>
      <LoginXSignupTitle>
        Verify your email address and proceed
      </LoginXSignupTitle>
      <Typography className="text-center">
        We just sent an email to the address:{" "}
        <span className="font-bold">{username}</span>. Please click on the link
        provided to verify your address
      </Typography>
      <div className="flex items-center gap-4 flex-wrap justify-between my-8">
        <Link variant="text" size="small">
          Change email
        </Link>
        <MuiRouterLink to="#">Help with email verification</MuiRouterLink>
      </div>
      <div className="flex justify-center">
        <LoadingButton
          loading={resendUserVerificationMutationResult.isLoading}
          loadingPosition="start"
          onClick={resendVerification}
          size="large"
        >
          Resend verification
        </LoadingButton>
      </div>
    </LoginXSignupScaffold>
  );
}

export default SignupVerificationRequest;
