import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import CountryApi from "apis/CountryApi";
import clsx from "clsx";
import LabelXHelpTooltip from "common/LabelXHelpTooltip";
import useDebouncedState from "hooks/useDebouncedState";
import { useState } from "react";
import {
  getTextFieldFormikHelperTextAndErrorProps,
  getTextFieldFormikProps,
} from "utils/FormikUtils";
import { normalizeArray } from "utils/ObjectUtils";
import ProfileUpdateScaffold from "./ProfileUpdateScaffold";

function ProfileUpdateFreelancerWorkHistory({ formik, DEFAULT_WORK_HISTORY }) {
  return (
    <ProfileUpdateScaffold
      title="Work History"
      description="If you have relevant work experience, add it here."
    >
      <div className="max-w-xl">
        <div className="mb-4">
          {formik.values.work_histories?.map((work_history, index) => (
            <History {...{ key: index, formik, work_history, index }} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => {
              const newWorkHistories = [
                ...formik.values.work_histories,
                { ...DEFAULT_WORK_HISTORY },
              ];
              formik.setFieldValue("work_histories", newWorkHistories);
            }}
            startIcon={<Icon>add</Icon>}
          >
            Add
          </Button>
        </div>
      </div>
    </ProfileUpdateScaffold>
  );
}

export default ProfileUpdateFreelancerWorkHistory;

function History({ formik, work_history, index }) {
  const key = `work_histories.${index}`;
  const titleKey = `${key}.title`;
  const companyKey = `${key}.company`;
  const locationKey = `${key}.location`;
  const startDateKey = `${key}.start_date`;
  const endDateKey = `${key}.end_date`;
  const descriptionKey = `${key}.description`;

  const [locationQ, setLocationQ] = useState("");
  const [currentJob, setCurrentJob] = useState(false);

  const [debouncedLocationQ] = useDebouncedState(locationQ, {
    wait: 200,
    enableReInitialize: true,
  });

  const countriesQueryResult = CountryApi.useGetCountriesQuery(
    {
      params: {
        q: debouncedLocationQ || undefined,
        id: (!debouncedLocationQ && work_history.location) || undefined,
      },
    },
    {
      // skip: !(debouncedLocationQ || work_history.location),
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  function getLocationName(id) {
    return countriesQueryResult.normalizedData?.[id]?.name || "";
  }
    

  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 md:grid-cols-2 gap-4 py-4 relative",
          !!index && "border-t"
        )}
      >
        <TextField
          fullWidth
          required
          margin="dense"
          placeholder="E.g UI/UX Designer"
          label={<LabelXHelpTooltip label="Title" title="" />}
          {...getTextFieldFormikProps(formik, titleKey)}
        />
        <TextField
          fullWidth
          required
          margin="dense"
          placeholder="E.g Google"
          label={<LabelXHelpTooltip label="Company" title="" />}
          {...getTextFieldFormikProps(formik, companyKey)}
        />
        <div>
          <Autocomplete
            loading={countriesQueryResult.isFetching}
            freeSolo
            options={countriesQueryResult?.data?.data || []}
            getOptionLabel={(option) => {
              return option?.name ? option.name : getLocationName(option);
            }}
            isOptionEqualToValue={(option, value) => {
              return option?.id === value.id;
            }}
            inputValue={locationQ}
            onInputChange={(_, value) => setLocationQ(value)}
            value={
              work_history.location
                ? {
                    id: work_history.location,
                    name: getLocationName(work_history.location),
                  }
                : null
            }
            onChange={(_, value) => {
              formik.setFieldValue(locationKey, value?.id || "");
            }}
            renderInput={(params) => (
              <TextField
                label="Country"
                placeholder="Type in your location & select from Dropdown"
                fullWidth
                margin="dense"
                {...getTextFieldFormikHelperTextAndErrorProps(
                  formik,
                  locationKey,
                  "Type in your location & select from Dropdown"
                )}
                {...params}
              />
            )}
          />

          <FormControlLabel
            label="I still work here"
            control={
              <Checkbox
                onChange={(e) => {
                  setCurrentJob(e.target.checked);
                }}
              />
            }
          />
        </div>

        <div />
        <DatePicker
          label="Start Date"
          value={work_history.start_date}
          disableFuture
          maxDate={work_history.end_date}
          onChange={(newValue) => {
            formik.setFieldValue(startDateKey, newValue);
          }}
          renderInput={(params) => (
            <TextField
              margin="dense"
              {...getTextFieldFormikProps(formik, locationKey)}
              {...params}
            />
          )}
        />
        {!currentJob && (
          <DatePicker
            label="End Date"
            disableFuture
            minDate={work_history.start_date}
            value={work_history.end_date}
            onChange={(newValue) => {
              formik.setFieldValue(endDateKey, newValue);
            }}
            renderInput={(params) => (
              <TextField
                margin="dense"
                {...getTextFieldFormikProps(formik, locationKey)}
                {...params}
              />
            )}
          />
        )}
        <div>
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            multiline
            maxRows={4}
            {...getTextFieldFormikProps(formik, descriptionKey)}
            className="md:col-span-2"
          />
          <div className="flex justify-between px-2">
            <Typography>Minimum of 100 Characters</Typography>
            <Typography>{work_history?.description?.length}/500</Typography>
          </div>
        </div>

        <div className="absolute -right-4 -top-4">
          <IconButton
            color="error"
            onClick={() => {
              const newWorkHistories = [...formik.values.work_histories];
              newWorkHistories.splice(index, 1);
              formik.setFieldValue("work_histories", newWorkHistories);
            }}
          >
            <Icon>cancel</Icon>
          </IconButton>
        </div>
      </div>
    </>
  );
}
