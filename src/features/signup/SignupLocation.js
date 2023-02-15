import { useState } from "react";
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormHelperText,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CountryApi from "apis/CountryApi";
import useDebouncedState from "hooks/useDebouncedState";
import { UserTypeEnum } from "constants/Global";
import {
  getTextFieldFormikHelperTextAndErrorProps,
  getTextFieldFormikProps,
} from "utils/FormikUtils";
import LoginXSignupTitle from "features/login-x-signup/LoginXSignupTitle";

function SignupLocation({ formik, steppper }) {
  const [locationQ, setLocationQ] = useState("");

  const [debouncedLocationQ] = useDebouncedState(locationQ, {
    wait: 1000,
    enableReInitialize: true,
  });

  const countriesQueryResult = CountryApi.useGetCountriesQuery(
    {
      params: {
        q: debouncedLocationQ || undefined,
        id: (!debouncedLocationQ && formik.values.location) || undefined,
      },
    },
    {
      // skip: !(debouncedLocationQ || formik.values.location),
      selectFromResult: (state) => ({
        ...state,
        normalizedData: state.data?.data?.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {}),
      }),
    }
  );

  const typeFormikHelperTextAndError =
    getTextFieldFormikHelperTextAndErrorProps(formik, "type");

  return (
    <>
      <LoginXSignupTitle>Join Softwrk</LoginXSignupTitle>
      <Autocomplete
        loading={countriesQueryResult.isFetching}
        freeSolo
        options={countriesQueryResult?.data?.data || []}
        getOptionLabel={(option) => {
          return option?.name
            ? option.name
            : countriesQueryResult.normalizedData?.[option]?.name || "";
        }}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
        inputValue={locationQ}
        onInputChange={(_, value) => setLocationQ(value)}
        value={formik.values.location}
        onChange={(_, value) => {
          formik.setFieldValue("location", value);
        }}
        renderInput={(params) => (
          <TextField
            label="Country"
            margin="normal"
            required
            placeholder="Type in your location & select from Dropdown"
            {...getTextFieldFormikHelperTextAndErrorProps(
              formik,
              "location",
              "Type in your location & select from Dropdown"
            )}
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {countriesQueryResult.isFetching ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <div className="my-2">
        <Typography variant="overline" className="text-center block font-bold">
          Signup as a
        </Typography>
        <ToggleButtonGroup
          color="primary"
          fullWidth
          // orientation="vertical"
          value={formik.values.type}
          exclusive
          onChange={(_, value) => formik.setFieldValue("type", value || "")}
          aria-label="Platform"
        >
          <ToggleButton value={UserTypeEnum.CLIENT}>Client</ToggleButton>
          <ToggleButton value={UserTypeEnum.FREELANCER}>
            Freelancer
          </ToggleButton>
        </ToggleButtonGroup>
        <FormHelperText
          error={typeFormikHelperTextAndError.error}
          className="text-center"
        >
          {typeFormikHelperTextAndError.helperText}
        </FormHelperText>
      </div>
      <Button className="my-6" fullWidth type="submit" size="large">
        Continue
      </Button>
    </>
  );
}

export default SignupLocation;
