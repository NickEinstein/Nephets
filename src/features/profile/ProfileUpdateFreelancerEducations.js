import {
  Autocomplete,
  Button,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import CountryApi from "apis/CountryApi";
import useDebouncedState from "hooks/useDebouncedState";
import { useState } from "react";
import {
  getTextFieldFormikHelperTextAndErrorProps,
  getTextFieldFormikProps,
} from "utils/FormikUtils";
import { normalizeArray } from "utils/ObjectUtils";
import ProfileUpdateSectionTitle from "./ProfileUpdateSectionTitle";

function ProfileUpdateFreelancerEducations({ formik, DEFAULT_EDUCATION }) {
  return (
    <div>
      <ProfileUpdateSectionTitle gutterBottom>
        Education
      </ProfileUpdateSectionTitle>
      <div className="flex flex-col mb-4 gap-4">
        {formik.values.educations?.map((education, index) => (
          <EducationField {...{ key: index, formik, education, index }} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            const newEducation = [
              ...formik.values.educations,
              { ...DEFAULT_EDUCATION },
            ];
            formik.setFieldValue("educations", newEducation);
          }}
          startIcon={<Icon>add</Icon>}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default ProfileUpdateFreelancerEducations;

function EducationField({ formik, education, index }) {
  const key = `educations.${index}`;
  const [countryQ, setCountryQ] = useState("");

  const [debouncedCountryQ] = useDebouncedState(countryQ, {
    wait: 200,
    enableReInitialize: true,
  });

  const countriesQueryResult = CountryApi.useGetCountriesQuery(
    {
      params: {
        q: debouncedCountryQ || undefined,
        id: (!debouncedCountryQ && education?.country) || undefined,
        fields: "name",
      },
    },
    {
      skip: !(debouncedCountryQ || education?.country),
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  function getCountryName(id) {
    return countriesQueryResult.normalizedData?.[id]?.name || "";
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
      <TextField
        margin="dense"
        fullWidth
        placeholder="Enter University Name"
        label="Institution"
        {...getTextFieldFormikProps(
          formik,
          `${key}.name`,
          "Enter University Name"
        )}
      />
      <Autocomplete
        loading={countriesQueryResult.isFetching}
        freeSolo
        options={countriesQueryResult?.data?.data || []}
        getOptionLabel={(option) => {
          return option?.name ? option.name : getCountryName(option);
        }}
        isOptionEqualToValue={(option, value) => {
          return option?.id === value.id;
        }}
        inputValue={countryQ}
        onInputChange={(_, value) => setCountryQ(value)}
        value={
          education?.country
            ? { id: education.country, name: getCountryName(education.country) }
            : null
        }
        onChange={(_, value) => {
          formik.setFieldValue(`${key}.country`, value?.id || "");
        }}
        renderInput={(params) => (
          <TextField
            label="Country"
            fullWidth
            placeholder="Type in your location & select from Dropdown"
            margin="dense"
            {...getTextFieldFormikHelperTextAndErrorProps(
              formik,
              `${key}.country`,
              "Type in your location & select from Dropdown"
            )}
            {...params}
          />
        )}
      />
      <TextField
        margin="dense"
        fullWidth
        // placeholder=""
        label="Qualification"
        {...getTextFieldFormikProps(formik, `${key}.title`)}
      />
      <TextField
        margin="dense"
        fullWidth
        placeholder="Computer Science"
        label="Course of Study"
        {...getTextFieldFormikProps(formik, `${key}.major`)}
      />
      <DatePicker
        label="Graduation Date"
        disableFuture
        value={education.date}
        onChange={(newValue) => {
          formik.setFieldValue(`${key}.date`, newValue);
        }}
        renderInput={(params) => (
          <TextField
            margin="dense"
            {...getTextFieldFormikHelperTextAndErrorProps(
              formik,
              `${key}.date`
            )}
            {...params}
          />
        )}
      />
      <div className="absolute -right-4 -top-4">
        <IconButton
          color="error"
          onClick={() => {
            const newEducations = [...formik.values.certifications];
            newEducations.splice(index, 1);
            formik.setFieldValue("educations", newEducations);
          }}
        >
          <Icon>cancel</Icon>
        </IconButton>
      </div>
    </div>
  );
}
