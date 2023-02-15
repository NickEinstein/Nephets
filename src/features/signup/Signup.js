import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import LoginXSignupScaffold from "features/login-x-signup/LoginXSignupScaffold";
import { Typography } from "@mui/material";
import MuiRouterLink from "common/MuiRouterLink";
import { RouteEnum } from "constants/RouteConstants";
import useStepper from "hooks/useStepper";
import SignupLocation from "./SignupLocation";
import SignupEmail from "./SignupEmail";
import { useNavigate, useSearchParams } from "react-router-dom";
import SignupInformation from "./SignupInformation";
import { urlSearchParamsExtractor } from "utils/URLUtils";
import { UserTypeEnum } from "constants/Global";

function Signup(props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [searchParam] = useSearchParams();

  const { type } = urlSearchParamsExtractor(searchParam, { type: "" });

  const stepper = useStepper();

  const [signupMutation, signupMutationResult] = UserApi.useSignupMutation();
  const [checkuserAvailabilityMutation, checkuserAvailabilityMutationResult] =
    UserApi.useCheckUserAvailabilityMutation();

  const formik = useFormik({
    initialValues: {
      type,
      username: "",
      firstname: "",
      lastname: "",
      email_address: "",
      password: "",
      confirm_password: "",
      location: null,
      company: "",
      description: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: yup.lazy((values) => {
      return yup.object({
        ...[
          {
            type: yup
              .string()
              .label("Type")
              .trim()
              .required("Please select a specific user type"),
            location: yup.mixed().label("Country").required(),
          },
          {
            email_address: yup
              .string()
              .label("Email Address")
              .email()
              .trim()
              .required(),
          },
          {
            username: yup.string().label("Username").trim().required(),
            firstname: yup.string().label("First Name").trim().required(),
            lastname: yup.string().label("Last Name").trim().required(),
            password: yup
              .string()
              .label("Password")
              .trim()
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
                `Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character`
              )
              .required(),
            confirm_password: yup
              .string()
              .label("Confirmed Password")
              .trim()
              .oneOf([yup.ref("password")], "Passwords must match")
              // .test("isPassword", "Passwords must match", (value, testCtx) => {
              //   return value === testCtx.parent.password;
              // })
              .required(),
            ...(values.type === UserTypeEnum.CLIENT
              ? {
                  company: yup.string().label("Company").trim().required(),
                  description: yup
                    .string()
                    .label("Description")
                    .trim()
                    .optional(),
                }
              : {}),
          },
        ][stepper.step],
      });
    }),
    onSubmit: async (values) => {
      try {
        if (stepper.step === 1) {
          const data = await checkuserAvailabilityMutation({
            params: { email_address: values.email_address },
          }).unwrap();
          if (!data?.data?.email_address_available) {
            enqueueSnackbar("Email Already Exist. Please Login", {
              variant: "warning",
            });
            return navigate(
              RouteEnum.LOGIN.concat("?username=", values.email_address)
            );
          }
        }

        if (stepper.step < 2) {
          return stepper.nextStep();
        }
        const data = await signupMutation({
          data: { ...values, location: values.location?.id },
        }).unwrap();
        enqueueSnackbar(data?.message, { variant: "success" });
        navigate(
          RouteEnum.SIGNUP_VERIFICATION_REQUEST.concat(
            "?username=",
            values.email_address,
            "&id=",
            data?.data?.id
          )
        );
      } catch (error) {
        enqueueSnackbar(error.data?.message, { variant: "error" });
      }
    },
  });

  const isClient = formik.values.type === UserTypeEnum.CLIENT;
  const isFreelancer = formik.values.type === UserTypeEnum.FREELANCER;

  const contentProps = {
    formik,
    stepper,
    signupMutationResult,
    checkuserAvailabilityMutationResult,
    checkuserAvailabilityMutation,
    isClient,
    isFreelancer,
  };

  return (
    <LoginXSignupScaffold
      onBackClick={!!stepper.step && (() => stepper.prevStep())}
    >
      <form className="block" onSubmit={formik.handleSubmit}>
        {
          [
            <SignupLocation {...contentProps} />,
            <SignupEmail {...contentProps} />,
            <SignupInformation {...contentProps} />,
          ][stepper.step]
        }
        <Typography variant="body2" className="text-center">
          Already a member?{" "}
          <MuiRouterLink to={RouteEnum.LOGIN}>Log in</MuiRouterLink>
        </Typography>
      </form>
    </LoginXSignupScaffold>
  );
}

export default Signup;
