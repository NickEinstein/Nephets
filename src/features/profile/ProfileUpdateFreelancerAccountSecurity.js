import ProfileUpdateScaffold from "./ProfileUpdateScaffold";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Icon,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ProfileUpdateSectionTitle from "./ProfileUpdateSectionTitle";
import {
  getTextFieldFormikHelperTextAndErrorProps,
  getTextFieldFormikProps,
} from "utils/FormikUtils";
import DialogTitleXCloseButton from "common/DialogTitleXCloseButton";
import CountryApi from "apis/CountryApi";
import { useState } from "react";
import { normalizeArray } from "utils/ObjectUtils";
import useDebouncedState from "hooks/useDebouncedState";
import { useFormik } from "formik";
import * as yup from "yup";
import UserApi from "apis/UserApi";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import MuiRouterLink from "common/MuiRouterLink";
import useToggle from "hooks/useToggle";
import { UserSocialAccountStatus } from "constants/Global";

function ProfileUpdateFreelancerAccountSecurity({
  formik,
  authUser,
  isPhoneNumberViewMode,
  isFullViewMode,
  isCurrentMode,
}) {
  const [isAddPhoneNumber, toggleAddPhoneNumber] = useToggle();

  return (
    <>
      <ProfileUpdateScaffold
        title="Account Security"
        description="We value your security, and we will keep it safe. Please verify your email and phone numbers so that we can keep your account secured"
      >
        <div className="max-w-xl flex flex-col gap-4">
          {(isFullViewMode || isCurrentMode) && (
            <div className="flex items-center justify-between flex-wrap gap-4    py-4">
              <TextField
                label="Email"
                {...getTextFieldFormikProps(formik, "email_address")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>email</Icon>
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton variant="outlined">Change</LoadingButton>
            </div>
          )}
          {isPhoneNumberViewMode && (
            <div>
              <ProfileUpdateSectionTitle>
                Phone numbers <Icon>smartphone</Icon>
              </ProfileUpdateSectionTitle>
              <div className="flex flex-col gap-4">
                {formik.values.phone_numbers?.map((phoneNumber, index) => {
                  return (
                    <PhoneNumber
                      {...{
                        key: `${phoneNumber.code}-${phoneNumber.digits}`,
                        phoneNumber,
                        index,
                        authUser,
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    toggleAddPhoneNumber();
                  }}
                  startIcon={<Icon>add</Icon>}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>
      </ProfileUpdateScaffold>
      <PhoneNumberAdd
        {...{
          open: isAddPhoneNumber,
          onClose: toggleAddPhoneNumber,
          authUser,
          formik,
        }}
      />
    </>
  );
}

export default ProfileUpdateFreelancerAccountSecurity;

function PhoneNumber({ phoneNumber, index, authUser }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isVerify, toggleVerify] = useToggle();

  const [removeUserPhoneNumberMutation, removeUserPhoneNumberMutationResult] =
    UserApi.useRemoveUserPhoneNumberMutation();

  const label = `${phoneNumber.code}-${phoneNumber.digits}`;

  async function removePhoneNumber() {
    try {
      const data = await removeUserPhoneNumberMutation({
        path: { id: authUser?.id },
        data: { code: phoneNumber.code, digits: phoneNumber.digits },
      }).unwrap();
      enqueueSnackbar(data?.message, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error?.data?.message, { variant: "error" });
    }
  }

  return (
    <>
      <div className="flex gap-4 justify-between items-center flex-wrap">
        <Typography>{label}</Typography>
        <div className="flex items-center gap-2">
          <LoadingButton
            variant="outlined"
            loading={removeUserPhoneNumberMutationResult.isLoading}
            loadingPosition="start"
            startIcon={<></>}
            color="error"
            onClick={removePhoneNumber}
          >
            Remove
          </LoadingButton>
          {phoneNumber?.status !== UserSocialAccountStatus.VERIFIED && (
            <LoadingButton variant="outlined" onClick={toggleVerify}>
              Verify
            </LoadingButton>
          )}
        </div>
      </div>
      <PhoneNumberVerify
        {...{ open: isVerify, onClose: toggleVerify, phoneNumber, authUser }}
      />
    </>
  );
}

function PhoneNumberAdd({ formik, authUser, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [isVerify, toggleVerify] = useToggle();

  const [countryQ, setCategoryQ] = useState("");

  const [addUserPhoneNumberMutation, addUserPhoneNumberMutationResult] =
    UserApi.useAddUserPhoneNumberMutation();

  const phoneNumberFormik = useFormik({
    initialValues: {
      code: "",
      digits: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: yup.object({
      code: yup.string().label("Country").required(),
      digits: yup.number().integer().label("Digits").required(),
    }),
    onSubmit: async (values) => {
      try {
        const data = await addUserPhoneNumberMutation({
          path: { id: authUser?.id },
          data: values,
        }).unwrap();
        enqueueSnackbar(data?.message, { variant: "success" });
        toggleVerify();
      } catch (error) {
        enqueueSnackbar(error?.data?.message, { variant: "error" });
      }
    },
  });

  const [debouncedCountryQ] = useDebouncedState(countryQ, {
    wait: 200,
    enableReInitialize: true,
  });

  const countriesQueryResult = CountryApi.useGetCountriesQuery(
    {
      params: {
        fields: "name,phonecode,emoji",
        q: debouncedCountryQ || undefined,
        phonecode:
          (!debouncedCountryQ && phoneNumberFormik.values?.code) || undefined,
      },
    },
    {
      // skip: !(debouncedCountryQ || phoneNumberFormik.values?.code),
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data, {
          getId: ({ phonecode }) => phonecode,
        }),
      }),
    }
  );

  function getCountryCode(id) {
    const country = countriesQueryResult.normalizedData?.[id];
    return country?.phonecode ? `${country?.phonecode}` : "";
  }

  function handleClose() {
    phoneNumberFormik.resetForm();
    setCategoryQ("");
    onClose();
  }

  if (isVerify) {
    return (
      <PhoneNumberVerify
        {...{
          open: isVerify,
          onClose: () => {
            toggleVerify();
            handleClose();
          },
          phoneNumber: phoneNumberFormik.values,
          authUser,
        }}
      />
    );
  }

  return (
    <Dialog open={open} fullWidth>
      <DialogTitleXCloseButton onClose={handleClose}></DialogTitleXCloseButton>
      <DialogContent className="flex flex-col items-center">
        <Typography variant="h5" color="primary" className="text-center">
          Verify your phone number
        </Typography>
        <Typography className="text-center">
          This will only take few minutes
        </Typography>
        <div className="my-6">
          <Autocomplete
            loading={countriesQueryResult.isFetching}
            freeSolo
            options={countriesQueryResult?.data?.data || []}
            getOptionLabel={(option) => {
              return option?.phonecode
                ? option.phonecode
                : getCountryCode(option);
            }}
            isOptionEqualToValue={(option, value) => {
              return option?.id === value.id;
            }}
            renderOption={(props, option) => {
              const country =
                countriesQueryResult.normalizedData?.[option?.phonecode];
              return (
                <li {...props}>
                  {country?.phonecode
                    ? `${country?.emoji} ${country?.phonecode} | ${country?.name}`
                    : ""}
                </li>
              );
            }}
            inputValue={countryQ}
            onInputChange={(_, value) => setCategoryQ(value)}
            value={
              phoneNumberFormik.values.code
                ? {
                    phonecode: phoneNumberFormik.values.code,
                    name: getCountryCode(phoneNumberFormik.values.code),
                  }
                : null
            }
            onChange={(_, value) => {
              phoneNumberFormik.setFieldValue("code", value?.phonecode || "");
            }}
            renderInput={(params) => (
              <TextField
                label="Country Code"
                fullWidth
                margin="dense"
                {...getTextFieldFormikHelperTextAndErrorProps(
                  phoneNumberFormik,
                  "code"
                )}
                {...params}
              />
            )}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="dense"
            {...getTextFieldFormikProps(phoneNumberFormik, "digits")}
          />
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap my-6">
          <LoadingButton loadingPosition="start" disabled>
            Verify by call
          </LoadingButton>
          <LoadingButton
            loading={addUserPhoneNumberMutationResult.isLoading}
            loadingPosition="start"
            onClick={phoneNumberFormik.handleSubmit}
          >
            Verify by sms
          </LoadingButton>
        </div>
        {privacyPolicy()}
      </DialogContent>
    </Dialog>
  );
}

function PhoneNumberVerify({ open, onClose, authUser, phoneNumber }) {
  const { enqueueSnackbar } = useSnackbar();

  const [verifyUserPhoneNumberMutation, verifyUserPhoneNumberMutationResult] =
    UserApi.useVerifyUserPhoneNumberMutation();

  const [
    resendUserPhoneNumberVerificationMutation,
    resendUserPhoneNumberVerificationMutationResult,
  ] = UserApi.useResendUserPhoneNumberVerificationMutation();

  const config = { code: phoneNumber.code, digits: phoneNumber.digits };

  const phoneNumberFormik = useFormik({
    initialValues: {
      otp: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: yup.object({
      otp: yup.string().label("OTP").required(),
    }),
    onSubmit: async (values) => {
      try {
        const data = await verifyUserPhoneNumberMutation({
          path: { id: authUser?.id },
          data: { ...values, ...config },
        }).unwrap();
        enqueueSnackbar(data?.message, { variant: "success" });
        handleClose();
      } catch (error) {
        enqueueSnackbar(error?.data?.message, { variant: "error" });
      }
    },
  });

  async function resendVerification() {
    try {
      const data = await resendUserPhoneNumberVerificationMutation({
        path: { id: authUser?.id },
        data: config,
      }).unwrap();
      enqueueSnackbar(data?.message, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error?.data?.message, { variant: "error" });
    }
  }

  function handleClose() {
    phoneNumberFormik.resetForm();
    onClose();
  }

  return (
    <Dialog open={open} fullWidth>
      <DialogTitleXCloseButton onClose={handleClose}></DialogTitleXCloseButton>
      <DialogContent className="flex flex-col items-center gap-4">
        <Typography color="primary" className="text-center mt-4">
          Enter the code received on {config.code} {config.digits}
        </Typography>
        <div>
          <TextField
            fullWidth
            margin="dense"
            {...getTextFieldFormikProps(phoneNumberFormik, "otp")}
          />
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
          <LoadingButton
            loading={resendUserPhoneNumberVerificationMutationResult.isLoading}
            loadingPosition="start"
            onClick={resendVerification}
            variant="outlined"
          >
            Resend
          </LoadingButton>
          <LoadingButton
            loading={verifyUserPhoneNumberMutationResult.isLoading}
            loadingPosition="start"
            onClick={phoneNumberFormik.handleSubmit}
          >
            Verify
          </LoadingButton>
        </div>
        {privacyPolicy()}
      </DialogContent>
    </Dialog>
  );
}

const privacyPolicy = () => (
  <Typography color="textSecondary" variant="body2" className="text-center">
    Your phone number will remain private and will not be shared or used for
    marketing purpose.{" "}
    <MuiRouterLink className="font-bold" to="#">
      Privacy Policy
    </MuiRouterLink>
  </Typography>
);
