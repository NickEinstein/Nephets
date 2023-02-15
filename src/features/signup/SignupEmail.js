import { Button, Divider, TextField, Typography } from "@mui/material";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import GoogleRoundIconPng from "assets/imgs/google-round-icon.png";
import AppleIconPng from "assets/imgs/apple-icon.png";
import LoginXSignupTitle from "features/login-x-signup/LoginXSignupTitle";
import { LoadingButton } from "@mui/lab";

function SignupEmail({
  formik,
  steppper,
  checkuserAvailabilityMutationResult,
}) {
  return (
    <>
      <LoginXSignupTitle>Earn on Softwrk</LoginXSignupTitle>
      <TextField
        required
        fullWidth
        label="Email Address"
        margin="normal"
        placeholder="Enter your email address"
        {...getTextFieldFormikProps(formik, "email_address")}
      />
      <Divider className="my-4">OR</Divider>
      <div className="mb-2">
        <Typography
          variant="overline"
          className="text-center block font-bold mb-4"
        >
          Signup in with
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: GoogleRoundIconPng, name: "Google" },
            { icon: AppleIconPng, name: "Apple" },
          ].map(({ icon, name }) => (
            <Button
              key={name}
              fullWidth
              variant="outlined"
              size="large"
              startIcon={
                <div className="w-6 h-6">
                  <img className="w-full h-full" alt={name} src={icon} />
                </div>
              }
            >
              {name}
            </Button>
          ))}
        </div>
      </div>
      <LoadingButton
        loading={checkuserAvailabilityMutationResult.isLoading}
        loadingPosition="start"
        className="my-6"
        fullWidth
        type="submit"
        size="large"
      >
        Continue
      </LoadingButton>
    </>
  );
}

export default SignupEmail;
