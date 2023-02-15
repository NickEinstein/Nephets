import { TextField, Typography } from "@mui/material";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import LoginXSignupTitle from "features/login-x-signup/LoginXSignupTitle";
import PasswordTextField from "common/PasswordTextField";
import { LoadingButton } from "@mui/lab";
import MuiRouterLink from "common/MuiRouterLink";
import { RouteEnum } from "constants/RouteConstants";

function SignupInformation({ formik, signupMutationResult, isClient }) {
  return (
    <>
      <LoginXSignupTitle>
        {isClient ? "Find Reliable Talents" : "Find your perfect Job"}
      </LoginXSignupTitle>
      <Typography className="text-center">Enter Information</Typography>
      <Typography
        gutterBottom
        variant="body2"
        color="textSecondary"
        className="text-center"
      >
        This will only take a few minutes
      </Typography>

      <TextField
        required
        margin="normal"
        value={formik.values.email_address}
        fullWidth
        placeholder="Email"
        InputProps={{
          readOnly: true,
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <TextField
          required
          margin="normal"
          fullWidth
          placeholder="First Name"
          {...getTextFieldFormikProps(formik, "firstname")}
        />
        <TextField
          required
          margin="normal"
          fullWidth
          placeholder="Last Name"
          {...getTextFieldFormikProps(formik, "lastname")}
        />
      </div>
      <TextField
        required
        margin="normal"
        fullWidth
        placeholder="Username"
        {...getTextFieldFormikProps(formik, "username")}
      />
      {isClient ? (
        <>
          <TextField
            required
            margin="normal"
            fullWidth
            placeholder="Company"
            {...getTextFieldFormikProps(formik, "company")}
          />
          <TextField
            // required
            margin="normal"
            fullWidth
            placeholder="Description"
            {...getTextFieldFormikProps(formik, "description")}
            multiline
            minRows={2}
            maxRows={5}
          />
        </>
      ) : null}
      <PasswordTextField
        required
        margin="normal"
        fullWidth
        placeholder="Password"
        {...getTextFieldFormikProps(formik, "password")}
      />
      <PasswordTextField
        required
        margin="normal"
        fullWidth
        placeholder="Confirm Password"
        {...getTextFieldFormikProps(formik, "confirm_password")}
      />

      <Typography variant="body2" className="text-center mt-4">
        By pressing "Create account", you agree to our {""}
        <MuiRouterLink className="" to={"#"}>
          Terms & Conditions
        </MuiRouterLink>
      </Typography>

      <LoadingButton
        className="my-6"
        fullWidth
        type="submit"
        loading={signupMutationResult.isLoading}
        loadingPosition="start"
        size="large"
      >
        Create Account
      </LoadingButton>
    </>
  );
}

export default SignupInformation;
