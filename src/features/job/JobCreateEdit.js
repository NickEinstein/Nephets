import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { AmountRateEnum, MediaQueryBreakpointEnum } from "constants/Global";
import ProjectApi from "apis/ProjectApi";
import { RouteEnum } from "constants/RouteConstants";
import useDataRef from "hooks/useDataRef";
import { useEffect, useMemo, useState } from "react";
import AssetApi from "apis/AssetsApi";
import useAuthUser from "hooks/useAuthUser";
import LoadingContent from "common/LoadingContent";
import useMounted from "hooks/useMounted";
import {
  getTextFieldFormikHelperTextAndErrorProps,
  getTextFieldFormikProps,
} from "utils/FormikUtils";
import JobCreateEditSectionTitle from "./JobCreateEditSectionTitle";
import JobCreateEditSectionDescription from "./JobCreateEditSectionDescription";
import useDebouncedState from "hooks/useDebouncedState";
import SkillApi from "apis/SkillsApi";
import { normalizeArray } from "utils/ObjectUtils";
import { DatePicker } from "@mui/x-date-pickers";
import CurrencyTextField from "common/CurrencyTextField";
import LinkButton from "common/LinkButton";

function JobCreateEdit(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const mounted = useMounted();

  const authUser = useAuthUser();

  const isEdit = !!id;

  const [uploadAssetMutation, uploadAssetMutationResult] =
    AssetApi.useUploadAssetMutation();

  const [createProjectMutation, createProjectMutationResult] =
    ProjectApi.useCreateProjectMutation();

  const [updateProjectMutation, updateProjectMutationResult] =
    ProjectApi.useUpdateProjectMutation();

  const projectQueryResult = ProjectApi.useGetProjectQuery(
    useMemo(() => ({ path: { id } }), [id]),
    { skip: !isEdit }
  );

  const project = projectQueryResult?.data?.data;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      skills: [],
      start_date: null,
      end_date: null,
      budget: 0,
      budget_type: AmountRateEnum.FIXED,
    },
    validationSchema: yup.lazy((values) => {
      return yup.object({});
    }),
    onSubmit: async (values) => {
      try {
        // const func = isEdit ? updateProjectMutation : createProjectMutation;
        // const data = await func({ path: { id }, data: values }).unwrap();
        // enqueueSnackbar(data?.message, { variant: "success" });
        navigate(RouteEnum.JOBS);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.data?.message, { variant: "error" });
      }
    },
  });

  // console.log(formik.values);

  // console.log(formik.errors);

  const isSubmitting =
    uploadAssetMutationResult.isLoading ||
    createProjectMutationResult.isLoading ||
    updateProjectMutationResult.isLoading;

  const dataRef = useDataRef({
    mounted,
    formik,
    project,
  });

  const [skillQ, setSkillQ] = useState("");

  const [debouncedSkillQ] = useDebouncedState(skillQ, {
    wait: 200,
    enableReInitialize: true,
  });

  const skillsQueryResult = SkillApi.useGetSkillsQuery(
    {
      params: {
        q: debouncedSkillQ || undefined,
        id: `in(${formik.values.skills?.join(",")})`,
        operator: "or",
      },
    },
    {
      skip: !(debouncedSkillQ || formik.values.skills?.length),
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
        remappedData: state.data?.data?.map((data) => data?.id),
      }),
    }
  );

  function getSkillName(id) {
    return skillsQueryResult.normalizedData?.[id]?.name || "";
  }

  useEffect(() => {
    const values = dataRef.current.formik.values;
    if (project) {
      dataRef.current.formik.setValues({});
    }
  }, [dataRef, project]);

  return (
    <LoadingContent
      loading={projectQueryResult.isLoading}
      error={projectQueryResult.isError}
      onReload={projectQueryResult.refetch}
    >
      {() => (
        <Paper className="p-4 lg:p-8">
          <div className="max-w-lg grid grid-cols-1 gap-8">
            <div>
              <JobCreateEditSectionTitle>
                Headline for the job post
              </JobCreateEditSectionTitle>
              <TextField
                fullWidth
                margin="normal"
                placeholder="This helps your job post stand out to the right candidates"
                {...getTextFieldFormikProps(formik, "title")}
                multiline
                minRows={2}
                maxRows={8}
              />
              <JobCreateEditSectionDescription component="div" className="ml-2" gutterBottom>
                <div className="mb-2">Example</div>
                <ul className="list-disc list-inside">
                  {[
                    "Product designer needed for a website project",
                    "LinkedIn optimization specialist needed",
                  ].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </JobCreateEditSectionDescription>
            </div>

            <div>
              <JobCreateEditSectionTitle>
                Description of the job
              </JobCreateEditSectionTitle>
              <TextField
                fullWidth
                margin="normal"
                placeholder="Give a detailed description of your job posting"
                {...getTextFieldFormikProps(formik, "description")}
                multiline
                minRows={2}
                maxRows={8}
              />
            </div>

            <div>
              <JobCreateEditSectionTitle>Skills</JobCreateEditSectionTitle>
              <Autocomplete
                multiple
                loading={skillsQueryResult.isFetching}
                freeSolo
                options={skillsQueryResult?.remappedData || []}
                getOptionLabel={(option) => {
                  return getSkillName(option);
                }}
                isOptionEqualToValue={(option, value) => {
                  return option === value;
                }}
                inputValue={skillQ}
                onInputChange={(_, value) => setSkillQ(value)}
                value={formik.values.skills}
                onChange={(_, value) => {
                  formik.setFieldValue("skills", value);
                }}
                renderInput={(params) => (
                  <TextField
                    placeholder="Type a skill and select from dropdowns; enter as many skills as you have"
                    fullWidth
                    margin="dense"
                    {...getTextFieldFormikHelperTextAndErrorProps(
                      formik,
                      "skills",
                      "Type a skill and select from dropdowns; enter as many skills as you have"
                    )}
                    {...params}
                  />
                )}
              />
            </div>

            <div>
              <JobCreateEditSectionTitle>Duration</JobCreateEditSectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <DatePicker
                  label="Start Date"
                  value={formik.values.start_date}
                  disableFuture
                  maxDate={formik.values.end_date}
                  onChange={(newValue) => {
                    formik.setFieldValue("start_date", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      margin="dense"
                      {...getTextFieldFormikHelperTextAndErrorProps(
                        formik,
                        "start_date"
                      )}
                      {...params}
                    />
                  )}
                />
                <DatePicker
                  label="End Date"
                  disableFuture
                  minDate={formik.values.start_date}
                  value={formik.values.end_date}
                  onChange={(newValue) => {
                    formik.setFieldValue("end_date", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      margin="dense"
                      {...getTextFieldFormikHelperTextAndErrorProps(
                        formik,
                        "end_date"
                      )}
                      {...params}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <JobCreateEditSectionTitle>Budget</JobCreateEditSectionTitle>
              <JobCreateEditSectionDescription gutterBottom>
                Please tell use your budget
              </JobCreateEditSectionDescription>
              <RadioGroup
                row
                {...getTextFieldFormikProps(formik, "budget_type")}
                className='mb-4'
              >
                {[
                  { label: "Fixed Amount", value: AmountRateEnum.FIXED },
                  { label: "Hourly Rate", value: AmountRateEnum.HOURLY },
                ].map(({ label, value }, index) => (
                  <FormControlLabel
                    key={index}
                    value={value}
                    control={<Radio />}
                    label={label}
                  />
                ))}
              </RadioGroup>
              <CurrencyTextField
                label="Budget Amount"
                {...getTextFieldFormikProps(formik, "budget")}
              />
            </div>

            <div className="flex items-center justify-end gap-4">
              <LinkButton
                variant="outlined"
                size="large"
                disabled={isSubmitting}
                to={RouteEnum.JOBS}
              >
                Cancel
              </LinkButton>
              <LoadingButton
                size="large"
                loading={isSubmitting}
                loadingPosition="start"
                onClick={formik.handleSubmit}
              >
                Submit
              </LoadingButton>
            </div>
          </div>
        </Paper>
      )}
    </LoadingContent>
  );
}

export default JobCreateEdit;
