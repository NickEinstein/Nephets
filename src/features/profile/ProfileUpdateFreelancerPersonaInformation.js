import {
  Autocomplete,
  Button,
  Icon,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import LanguageApi from "apis/LanguageApi";
import DropzoneField from "common/DropzoneField";
import ImagePreviewer from "common/ImagePreviewer";
import LabelXHelpTooltip from "common/LabelXHelpTooltip";
import VideoPreviewer from "common/VideoPreviewer";
import useDebouncedState from "hooks/useDebouncedState";
import { useState } from "react";
import Dropzone from "react-dropzone";
import {
  getTextFieldFormikHelperTextAndErrorProps,
  getTextFieldFormikProps,
} from "utils/FormikUtils";
import { normalizeArray } from "utils/ObjectUtils";
import ProfileUpdateScaffold from "./ProfileUpdateScaffold";
import ProfileUpdateSectionTitle from "./ProfileUpdateSectionTitle";

function ProfileUpdateFreelancerPersonaInformation({
  formik,
  languageLevels,
  DEFAULT_LANGUAGE,
  isTitleViewMode,
  isBiographyViewMode,
  isProfilePictureViewMode,
  isPitchViewMode,
  isLanguagesViewMode,
}) {
  return (
    <ProfileUpdateScaffold title="Personal Information">
      <div className="max-w-xl grid grid-cols-1 gap-4">
        {isTitleViewMode && (
          <TextField
            fullWidth
            margin="dense"
            placeholder="E.g : Customer Experience & Tech Support | Software Tester"
            label={
              <LabelXHelpTooltip
                label="Title"
                title="Add a title that tells what you do and who you are"
              />
            }
            {...getTextFieldFormikProps(formik, "titles")}
          />
        )}
        {isBiographyViewMode && (
          <div>
            <TextField
              fullWidth
              margin="dense"
              placeholder="Tell a bit about your strength, what makes you stand out, your expertise and strengths "
              label={<LabelXHelpTooltip label="Bio" title="" />}
              multiline
              minRows={4}
              maxRows={8}
              {...getTextFieldFormikProps(formik, "biography")}
            />
            <div className="flex justify-between px-5">
              <Typography>Minimum of 100 Characters</Typography>
              <Typography>{formik.values.biography.length}/500</Typography>
            </div>
          </div>
        )}
        <div className="flex flex-wrap justify-between gap-4">
          {isProfilePictureViewMode && (
            <div>
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
          )}
          {isPitchViewMode && (
            <div>
              <ProfileUpdateSectionTitle gutterBottom>
                Pitch Video
              </ProfileUpdateSectionTitle>
              <Dropzone
                multiple={false}
                accept={{ "video/*": [] }}
                onDropAccepted={(files) =>
                  formik.setFieldValue("pitch_video", files?.[0])
                }
              >
                {(dropzone) => (
                  <DropzoneField
                    {...{
                      dropzone,
                      InputContainerProps: {
                        className: "w-48 h-48 relative group",
                      },
                    }}
                  >
                    {() => {
                      return (
                        <>
                          {formik.values.pitch_video ? (
                            <VideoPreviewer
                              controls
                              src={formik.values.pitch_video}
                              className="w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Typography
                                variant="body2"
                                className="text-center text-text-secondary"
                              >
                                Drop video here or click to browse
                              </Typography>
                            </div>
                          )}
                          <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center group-hover:hidden bg-black bg-opacity-10 text-white">
                            <Icon className="text-6xl">videocam</Icon>
                          </div>
                        </>
                      );
                    }}
                  </DropzoneField>
                )}
              </Dropzone>
            </div>
          )}
        </div>
        {isLanguagesViewMode && (
          <div>
            <ProfileUpdateSectionTitle gutterBottom>
              Languages
            </ProfileUpdateSectionTitle>
            <div className="flex flex-col mb-4 gap-4">
              {formik.values.languages?.map((language, index) => (
                <LanguageField
                  {...{ key: index, formik, language, index, languageLevels }}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  const newLanguages = [
                    ...formik.values.languages,
                    { ...DEFAULT_LANGUAGE },
                  ];
                  formik.setFieldValue("languages", newLanguages);
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
  );
}

export default ProfileUpdateFreelancerPersonaInformation;

function LanguageField({ formik, language, index, languageLevels }) {
  const [languageQ, setLanguageQ] = useState("");

  const key = `languages.${index}`;
  const languageKey = `${key}.id`;

  const [debouncedLanguageQ] = useDebouncedState(languageQ, {
    wait: 200,
    enableReInitialize: true,
  });

  const languagesQueryResult = LanguageApi.useGetLanguagesQuery(
    {
      params: {
        q: debouncedLanguageQ || undefined,
        id: (!debouncedLanguageQ && language?.id) || undefined,
      },
    },
    {
      skip: !(debouncedLanguageQ || language?.id),
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  function getLanguageName(id) {
    return languagesQueryResult.normalizedData?.[id]?.name || "";
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
      <Autocomplete
        loading={languagesQueryResult.isFetching}
        freeSolo
        options={languagesQueryResult?.data?.data || []}
        getOptionLabel={(option) => {
          return option?.name ? option.name : getLanguageName(option);
        }}
        isOptionEqualToValue={(option, value) => {
          return option?.id === value.id;
        }}
        inputValue={languageQ}
        onInputChange={(_, value) => setLanguageQ(value)}
        value={
          language?.id
            ? { ...language, name: getLanguageName(language.id) }
            : null
        }
        onChange={(_, value) => {
          formik.setFieldValue(languageKey, value?.id || "");
        }}
        renderInput={(params) => (
          <TextField
            label="Language"
            fullWidth
            margin="dense"
            {...getTextFieldFormikHelperTextAndErrorProps(formik, languageKey)}
            {...params}
          />
        )}
      />
      <TextField
        margin="dense"
        fullWidth
        placeholder="Select Level"
        label="Level"
        {...getTextFieldFormikProps(formik, `${key}.level`)}
        select
      >
        {languageLevels?.map((level) => (
          <MenuItem key={level.id} value={level.id}>
            {level.name}
          </MenuItem>
        ))}
      </TextField>
      <div className="absolute -right-4 -top-4">
        <IconButton
          color="error"
          onClick={() => {
            const newLanguages = [...formik.values.languages];
            newLanguages.splice(index, 1);
            formik.setFieldValue("languages", newLanguages);
          }}
        >
          <Icon>cancel</Icon>
        </IconButton>
      </div>
    </div>
  );
}
