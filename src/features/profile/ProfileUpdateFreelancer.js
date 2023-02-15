import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useAuthUser from "hooks/useAuthUser";
import useDataRef from "hooks/useDataRef";
import { useEffect } from "react";
import useStepper from "hooks/useStepper";
import ProfileUpdateFreelancerPersonalInformation from "./ProfileUpdateFreelancerPersonaInformation";
import ProfileUpdateFreelancerCVUpload from "./ProfileUpdateFreelancerCVUpload";
import LevelApi from "apis/LevelApi";
import ProfileUpdateFreelancerWorkHistory from "./ProfileUpdateFreelancerWorkHistory";
import ProfileUpdateFreelancerProfessionalInformation from "./ProfileUpdateFreelancerProfessionalInformation";
import ProfileUpdateFreelancerSocialAccount from "./ProfileUpdateFreelancerSocialAccounts";
import ProfileUpdateFreelancerAccountSecurity from "./ProfileUpdateFreelancerAccountSecurity";
import ProfileUpdateFreelancerCharges from "./ProfileUpdateFreelancerCharges";
import UserApi from "apis/UserApi";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import AssetApi from "apis/AssetsApi";
import useSearchParamStepState from "hooks/useSearchParamStepState";
import {
  ProfileUpdateFreelancerParamEnum,
  ProfileUpdateFreelancerViewModeEnum,
} from "./ProfileConstants";
import LinkButton from "common/LinkButton";

function ProfileUpdateFreelancer(props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const authUser = useAuthUser();

  const [searchParams] = useSearchParams();
  const updateViewMode =
    searchParams.get("viewMode") || ProfileUpdateFreelancerViewModeEnum.FULL;

  const isFullViewMode =
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.FULL;
  const isCurrentViewMode =
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.CURRENT;
  const isTitleViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.TITLE;
  const isBiographyViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.BIOGRAPHY;
  const isProfilePictureViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.PROFILE_PICTURE;
  const isPitchViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.PITCH_VIDEO;
  const isLanguagesViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.LANGUAGES;
  const isEmployementViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.EMPLOYEMENT_HISTORY;
  const isCertificationsViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.CERTIFICATIONS;
  const isSkillsViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.SKILLS;
  const isEducationsViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.EDUCATIONS;
  const isCategoriesViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.CATEGORIES;
  const isSocialViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.SOCAIL_ACCOUNTS;
  const isPhoneNumberViewMode =
    isFullViewMode ||
    isCurrentViewMode ||
    updateViewMode === ProfileUpdateFreelancerViewModeEnum.PHONE_NUMBERS;

  const steps = [
    ProfileUpdateFreelancerParamEnum.CV_UPLOAD,
    ProfileUpdateFreelancerParamEnum.PERSONAL_INFORMATION,
    ProfileUpdateFreelancerParamEnum.EMPLOYEMENT_HISTORY,
    ProfileUpdateFreelancerParamEnum.PROFESSIONAL_INFORMATION,
    ProfileUpdateFreelancerParamEnum.SOCIAL_ACCOUNTS,
    ProfileUpdateFreelancerParamEnum.ACCOUNT_SECURITY,
    ProfileUpdateFreelancerParamEnum.CHARGES,
  ];

  const stepToParam = (step) => steps[step];

  const [step, onStepChange] = useSearchParamStepState({
    initialParam: ProfileUpdateFreelancerParamEnum.CV_UPLOAD,
    toParam: stepToParam,
    toStep: (param) => steps.indexOf(param),
  });

  const stepper = useStepper({ step, onStepChange, maxStep: steps.length - 1 });

  const languageLevelsQueryResult = LevelApi.useGetLevelsQuery({
    params: { type: "LANGUAGE" },
  });

  const languageLevels = languageLevelsQueryResult.data?.data;

  const [updateUserMutation, updateUserMutationResult] =
    UserApi.useUpdateUserMutation();

  const [uploadAssetMutation, uploadAssetMutationResult] =
    AssetApi.useUploadAssetMutation();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      location: "",
      titles: "",
      biography: "",
      avatar: "",
      languages: [],
      pitch_video: "",
      skills: [],
      categories: [],
      social_accounts: [],
      hourly_rate: 0,
      work_histories: [],
      certifications: [],
      educations: [],
      phone_numbers: [],
    },
    validationSchema: yup.object({
      ...[
        {},
        {
          titles: yup.string().label("Titles").optional(),
          biography: yup
            .string().min(100).max(500)
            .label("Biography")
            .optional(),

          languages: yup
            .array(
              yup.object({
                id: yup.string().label("Language").required(),
                level: yup.string().label("Level").required(),
              })
            )
            .label("Languages"),
          avatar: yup.mixed().label("Profile Picture").optional(),
          pitch_video: yup.mixed().label("Pitch Video").optional(),
        },
        {
          work_histories: yup.array(
            yup.object({
              title: yup.string().label("Title").required(),
              company: yup.string().label("Company").required(),
              location: yup.string().label("Location").required(),
              start_date: yup.date().label("Start Date").required(),
              end_date: yup.date().label("End Date").optional(),
              description: yup.string().label("Description").optional(),
            })
          ),
        },
        {
          skills: yup
            .array(yup.string().label("Skill").required())
            .label("Skills"),
          categories: yup.array(
            yup.array(yup.string().label("Category").required())
          ),
          certifications: yup.array(
            yup.object({
              name: yup.string().label("Name").required(),
              company: yup.string().label("Company").required(),
              date: yup.date().label("Date").max(new Date()).required(),
            })
          ),
          educations: yup.array(
            yup.object({
              name: yup.string().label("Name").required(),
              country: yup.string().label("Country").required(),
              major: yup.string().label("Major").required(),
              title: yup.string().label("Title").required(),
              date: yup.date().label("Date").max(new Date()).required(),
            })
          ),
        },
        {
          social_accounts: yup.array(
            yup.object({
              id: yup.string().label("Name").required(),
              info: yup.string().label("Info").required(),
            })
          ),
        },
        {},
        {
          hourly_rate: yup.number().label("Hourly Rate").positive().optional(),
        },
      ][stepper.step],
    }),
    onSubmit: async (_values) => {
      const values = { ..._values };
      try {
        if (stepper.step === 0) {
          return stepper.nextStep();
        }
        if (stepper.step === 1) {
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

          if (values.pitch_video instanceof File) {
            const data = await uploadAssetMutation({
              data: {
                file: values.pitch_video,
                resource_type: "video",
                public_id: authUser?.id,
                unique_filename: false,
                upload_preset: "pitch_videos_upload_preset",
              },
            }).unwrap();
            values.pitch_video = data.secure_url;
          }
        }
        const data = await updateUserMutation({
          path: { id: authUser?.id },
          data: values,
        }).unwrap();
        enqueueSnackbar(data?.message, { variant: "success" });

        if (stepper.step === 6 || !isFullViewMode) {
          return navigate(RouteEnum.PROFILE);
        }
        stepper.nextStep();
      } catch (error) {
        enqueueSnackbar(error?.data?.message, { variant: "error" });
      }
    },
  });

  // console.log(formik.errors);

  const dataRef = useDataRef({
    DEFAULT_LANGUAGE,
    DEFAULT_CATEGORY,
    DEFAULT_WORK_HISTORY,
    DEFAULT_CERTIFICATION,
    DEFAULT_EDUCATION,
    authUser,
    formik,
    languageLevelsQueryResult,
    languageLevels,
    isFullViewMode,
    isCurrentViewMode,
    isTitleViewMode,
    isBiographyViewMode,
    isProfilePictureViewMode,
    isPitchViewMode,
    isLanguagesViewMode,
    isEmployementViewMode,
    isCertificationsViewMode,
    isSkillsViewMode,
    isEducationsViewMode,
    isCategoriesViewMode,
    isSocialViewMode,
    isPhoneNumberViewMode,
  });

  useEffect(() => {
    const values = dataRef.current.formik.values;
    dataRef.current.formik.setValues({
      firstname: authUser?.firstname || values.firstname,
      lastname: authUser?.lastname || values.lastname,
      location: authUser?.location || values.location,
      email_address: authUser?.email_address || values.email_address,
      titles: authUser?.titles || values.titles,
      avatar: authUser?.avatar || values.avatar,
      biography: authUser?.biography || values.biography,
      languages: authUser?.languages || values.languages,
      pitch_video: authUser?.pitch_video || values.pitch_video,
      skills: authUser?.skills || values.skills,
      categories: authUser?.categories || values.categories,
      social_accounts: authUser?.social_accounts || values.social_accounts,
      hourly_rate: authUser?.hourly_rate || values.hourly_rate,
      work_histories: authUser?.work_histories || values.work_histories,
      certifications: authUser?.certifications || values.certifications,
      educations: authUser?.educations || values.educations,
      phone_numbers: authUser?.phone_numbers || values.phone_numbers,
    });
  }, [authUser, dataRef]);

  const contentProps = { dataRef, ...dataRef.current };

  const cancelButton = (
    <LinkButton
      variant="outlined"
      size="large"
      disabled={
        uploadAssetMutationResult.isLoading ||
        updateUserMutationResult.isLoading
      }
      to={RouteEnum.PROFILE}
    >
      Cancel
    </LinkButton>
  );

  return (
    <>
      {
        [
          <ProfileUpdateFreelancerCVUpload {...contentProps} />,
          <ProfileUpdateFreelancerPersonalInformation {...contentProps} />,
          <ProfileUpdateFreelancerWorkHistory {...contentProps} />,
          <ProfileUpdateFreelancerProfessionalInformation {...contentProps} />,
          <ProfileUpdateFreelancerSocialAccount {...contentProps} />,
          <ProfileUpdateFreelancerAccountSecurity {...contentProps} />,
          <ProfileUpdateFreelancerCharges {...contentProps} />,
        ][stepper.step]
      }
      <div className="flex items-center justify-end gap-4 flex-wrap my-4">
        {isFullViewMode && stepper.canPrevStep() ? (
          <>
            {cancelButton}
            <div className="flex-1" />
            <Button
              variant="outlined"
              size="large"
              disabled={
                uploadAssetMutationResult.isLoading ||
                updateUserMutationResult.isLoading
              }
              onClick={() => stepper.prevStep()}
            >
              Back
            </Button>
          </>
        ) : (
          cancelButton
        )}
        <LoadingButton
          size="large"
          loading={
            uploadAssetMutationResult.isLoading ||
            updateUserMutationResult.isLoading
          }
          loadingPosition="start"
          onClick={formik.handleSubmit}
        >
          {!isFullViewMode ? "Save" : "Continue"}
        </LoadingButton>
      </div>
    </>
  );
}

export default ProfileUpdateFreelancer;

const DEFAULT_LANGUAGE = {
  id: "",
  level: "",
};

const DEFAULT_CATEGORY = ["", "", ""];

const DEFAULT_WORK_HISTORY = {
  title: "",
  company: "",
  location: "",
  start_date: null,
  end_date: null,
  description: "",
};

const DEFAULT_CERTIFICATION = {
  name: "",
  company: "",
  date: null,
};

const DEFAULT_EDUCATION = {
  name: "",
  country: "",
  major: "",
  title: "",
  date: null,
};
