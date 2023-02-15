import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import { Checkbox, TextField, Typography } from "@mui/material";
import MuiRouterLink from "common/MuiRouterLink";
import { RouteEnum } from "constants/RouteConstants";
import LoginXSignupScaffold from "features/login-x-signup/LoginXSignupScaffold";
import LoginXSignupTitle from "features/login-x-signup/LoginXSignupTitle";
import { useSearchParams } from "react-router-dom";
import { urlSearchParamsExtractor } from "utils/URLUtils";

function Login(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [searchParam] = useSearchParams();

  const { username } = urlSearchParamsExtractor(searchParam, { username: "" });

  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username,
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().label("Username").trim().required(),
      password: yup.string().label("Password").trim().required(),
    }),
    onSubmit: async (values) => {
      try {
        const data = await loginMuation({ data: values }).unwrap();
        enqueueSnackbar(data?.message || "Login successful", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar(error?.data?.message || "Failed to login", {
          variant: "error",
        });
      }
    },
  });

  return (
    <LoginXSignupScaffold>
      <form className="block" onSubmit={formik.handleSubmit}>
        <LoginXSignupTitle>Welcome Back</LoginXSignupTitle>
        <TextField
          required
          fullWidth
          margin="normal"
          label="Username"
          placeholder="Enter your username or Email"
          {...getTextFieldFormikProps(formik, "username")}
        />
        <PasswordTextField
          required
          fullWidth
          label="Password"
          margin="normal"
          placeholder="Enter your Password"
          {...getTextFieldFormikProps(formik, "password")}
        />
        <div class="flex justify-between items-center">
          <Typography variant="body2">
            <Checkbox /> Keep me logged in
          </Typography>
          <Typography variant="body2">
            <MuiRouterLink to={RouteEnum.FORGOT_PASSWORD}>
              Forgot Password?
            </MuiRouterLink>
          </Typography>
        </div>

        <LoadingButton
          loading={loginMutationResult.isLoading}
          loadingPosition="start"
          type="submit"
          className="my-6"
          fullWidth
          size="large"
        >
          Continue
        </LoadingButton>
        <Typography variant="body2" className="text-center">
          Don't have an Account?{" "}
          <MuiRouterLink to={RouteEnum.SIGNUP}>Sign Up</MuiRouterLink>
        </Typography>
      </form>
    </LoginXSignupScaffold>
  );
}

export default Login;
