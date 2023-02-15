import ProfileUpdateScaffold from "./ProfileUpdateScaffold";
import {
  getTextFieldFormikHelperTextAndErrorProps,
  getTextFieldFormikProps,
} from "utils/FormikUtils";
import {
  Autocomplete,
  CircularProgress,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import useDebouncedState from "hooks/useDebouncedState";
import CountryApi from "apis/CountryApi";
import { normalizeArray } from "utils/ObjectUtils";
import useDataRef from "hooks/useDataRef";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import UserApi from "apis/UserApi";
import AssetApi from "apis/AssetsApi";
import { LoadingButton } from "@mui/lab";
import LinkButton from "common/LinkButton";
import { RouteEnum } from "constants/RouteConstants";
import ProfileUpdateSectionTitle from "./ProfileUpdateSectionTitle";
import Dropzone from "react-dropzone";
import DropzoneField from "common/DropzoneField";
import ImagePreviewer from "common/ImagePreviewer";

function ProfileUpdateClient({ authUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [updateUserMutation, updateUserMutationResult] =
    UserApi.useUpdateUserMutation();

  const [uploadAssetMutation, uploadAssetMutationResult] =
    AssetApi.useUploadAssetMutation();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      location: "",
      company: "",
      description: "",
      avatar: "",
    },
    validationSchema: yup.object({
      //   username: yup.string().label("Username").trim().required(),
      firstname: yup.string().label("First Name").trim().required(),
      lastname: yup.string().label("Last Name").trim().required(),
      location: yup.mixed().label("Country").required(),
      company: yup.string().label("Company").trim().required(),
      description: yup.string().label("Description").trim().optional(),
    }),
    onSubmit: async (values) => {
      try {
        if (values.avatar instanceof File) {
          const data = await uploadAssetMutation({
            data: {
              file: values.avatar,
              resource_type: "image",
              public_id: authUser?.id,
              unique_filename: false,
              upload_preset: "profile_pictures_upload_preset",
            },
          }).unwrap();
          values.avatar = data.secure_url;
        }
        const data = await updateUserMutation({
          path: { id: authUser?.id },
          data: values,
        }).unwrap();
        enqueueSnackbar(data?.message, { variant: "success" });
        navigate(RouteEnum.PROFILE);
      } catch (error) {
        enqueueSnackbar(error?.data?.message, { variant: "error" });
      }
    },
  });

  const [locationQ, setLocationQ] = useState("");

  const [debouncedLocationQ] = useDebouncedState(locationQ, {
    wait: 1000,
    enableReInitialize: true,
  });

  const dataRef = useDataRef({ formik });

  const countriesQueryResult = CountryApi.useGetCountriesQuery(
    {
      params: {
        q: debouncedLocationQ || undefined,
        id: (!debouncedLocationQ && formik.values.location) || undefined,
        fields: "name",
      },
    },
    {
      // skip: !(debouncedLocationQ || formik.values.location),
      selectFromResult: (state) => ({
        ...state,
        remappedData: state.data?.data?.map(({ id }) => id),
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  const isSubmitting =
    uploadAssetMutationResult.isLoading || updateUserMutationResult.isLoading;

  useEffect(() => {
    const values = dataRef.current.formik.values;
    dataRef.current.formik.setValues({
      firstname: authUser?.firstname || values.firstname,
      lastname: authUser?.lastname || values.lastname,
      location: authUser?.location || values.location,
      company: authUser?.company || values.company,
      description: authUser?.description || values.description,
      avatar: authUser?.avatar || values.avatar,
    });
  }, [authUser, dataRef]);

  function getCountryName(id) {
    return countriesQueryResult.normalizedData?.[id]?.name || "";
  }

  return (
    <ProfileUpdateScaffold
      title="Profile Information"
      description="Update neccessary information"
    >
      <div className="max-w-xl">
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
          fullWidth
          margin="normal"
          placeholder="E.g: XYZ Limited"
          label="Company"
          {...getTextFieldFormikProps(formik, "company")}
        />
        <TextField
          fullWidth
          margin="normal"
          placeholder="Tell a bit about your company"
          label="Description"
          multiline
          minRows={4}
          maxRows={8}
          {...getTextFieldFormikProps(formik, "description")}
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
          inputValue={locationQ}
          onInputChange={(_, value) => setLocationQ(value)}
          value={
            formik.values.location
              ? {
                  id: formik.values.location,
                  name: getCountryName(formik.values.location),
                }
              : null
          }
          onChange={(_, value) => {
            formik.setFieldValue("location", value?.id);
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
        <div className="my-4">
          <ProfileUpdateSectionTitle gutterBottom>
            Profile Picture
          </ProfileUpdateSectionTitle>
          <Dropzone
            multiple={false}
            accept={{ "image/*": [] }}
            onDropAccepted={(files) =>
              formik.setFieldValue("avatar", files?.[0])
            }
          >
            {(dropzone) => (
              <DropzoneField
                {...{
                  dropzone,
                  InputContainerProps: {
                    className: "rounded-full w-48 h-48 relative group",
                  },
                }}
              >
                {() => {
                  return (
                    <>
                      {formik.values.avatar ? (
                        <ImagePreviewer
                          src={formik.values.avatar}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Typography
                            variant="body2"
                            className="text-center text-text-secondary"
                          >
                            Drop image here or click to browse
                          </Typography>
                        </div>
                      )}
                      <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center group-hover:hidden bg-black bg-opacity-10 text-white">
                        <Icon className="text-6xl">photo_camera</Icon>
                      </div>
                    </>
                  );
                }}
              </DropzoneField>
            )}
          </Dropzone>
        </div>
        <div className="flex items-center justify-end gap-4">
          <LinkButton
            variant="outlined"
            size="large"
            disabled={isSubmitting}
            to={RouteEnum.PROFILE}
          >
            Cancel
          </LinkButton>
          <LoadingButton
            size="large"
            loading={isSubmitting}
            loadingPosition="start"
            onClick={formik.handleSubmit}
          >
            Save
          </LoadingButton>
        </div>
      </div>
    </ProfileUpdateScaffold>
  );
}

export default ProfileUpdateClient;
