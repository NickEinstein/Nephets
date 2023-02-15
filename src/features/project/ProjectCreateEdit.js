import { LoadingButton } from "@mui/lab";
import {
  Button,
  Step,
  StepButton,
  StepContent,
  Stepper,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useStepper from "hooks/useStepper";
import { useSnackbar } from "notistack";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import {
  ProjectCreateEditParamEnum,
  ProjectStatus,
  ProjectTierEnum,
} from "./ProjectConstants";
import { MediaQueryBreakpointEnum } from "constants/Global";
import ProjectApi from "apis/ProjectApi";
import useSearchParamStepState from "hooks/useSearchParamStepState";
import LinkButton from "common/LinkButton";
import { RouteEnum } from "constants/RouteConstants";
import useDataRef from "hooks/useDataRef";
import { useEffect, useMemo } from "react";
import { yupCustomField } from "utils/FormikUtils";
import ProjectCreateEditOverview from "./ProjectCreateEditOverview";
import { normalizeArray } from "utils/ObjectUtils";
import ProjectCreateEditPricing from "./ProjectCreateEditPricing";
import CategoryApi from "apis/CategoryApi";
import ProjectCreateEditGallery from "./ProjectCreateEditGallery";
import ProjectCreateEditRequirements from "./ProjectCreateEditRequirements";
import ProjectCreateEditDescription from "./ProjectCreateEditDescription";
import ProjectCreateEditReview from "./ProjectCreateEditReview";
import AssetApi from "apis/AssetsApi";
import useAuthUser from "hooks/useAuthUser";
import LoadingContent from "common/LoadingContent";
import useMounted from "hooks/useMounted";

function ProjectCreateEdit(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const mounted = useMounted();

  const authUser = useAuthUser();

  const isEdit = !!id;

  const steps = [
    ProjectCreateEditParamEnum.OVERVIEW,
    ProjectCreateEditParamEnum.PRICING,
    ProjectCreateEditParamEnum.GALLARY,
    ProjectCreateEditParamEnum.REQUIREMENT,
    ProjectCreateEditParamEnum.DESCRIPTION,
    ProjectCreateEditParamEnum.REVIEW,
  ];

  const stepToParam = (step) => steps[step];

  const [step, onStepChange] = useSearchParamStepState({
    initialParam: ProjectCreateEditParamEnum.OVERVIEW,
    toParam: stepToParam,
    toStep: (param) => steps.indexOf(param),
  });

  const stepper = useStepper({ step, onStepChange, maxStep: steps.length - 1 });

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
      category: DEFAULT_CATEGORY,
      attributes: {},
      tags: [],
      tiers: { [ProjectTierEnum.BASIC]: DEFAULT_TIER },
      images: [],
      cover: "",
      videos: [],
      documents: [],
      requirements: [],
      faqs: [],
      request_queue_size: 1,
    },
    validationSchema: yup.lazy((values) => {
      return yup.object({
        ...[
          {
            // user: objectId().required(),
            title: yup.string().label("Title").trim().required(),
            category: yup
              .array(yup.string().label("Level").trim().required())
              .label("Category")
              .min(1)
              .required(),
            attributes: yup.lazy((attributes) => {
              return yup.object({
                ...Object.keys(attributes).reduce((acc, key) => {
                  acc[key] = yup.mixed().required();
                  return acc;
                }, {}),
              });
            }),
            tags: yup
              .array(yup.string().label("Tag").trim().required())
              .label("Tags"),
          },
          {
            tiers: yup.lazy((attributes) => {
              return yup.object({
                ...Object.keys(attributes).reduce((acc, key) => {
                  acc[key] = yup.object({
                    // type: yup
                    //   .string()
                    //   .oneOf(Object.values(ProjectTierEnum))
                    //   .required(),
                    title: yup.string().label("Title").trim().optional(),
                    description: yup
                      .string()
                      .label("Description")
                      .trim()
                      .optional(),
                    services: yup.lazy((services) => {
                      return yup.object({
                        ...(services
                          ? Object.keys(services).reduce((acc, key) => {
                              acc[key] = yup.mixed().optional();
                              return acc;
                            }, {})
                          : {}),
                      });
                    }),
                    price: yup.number().label("Price").default(0).required(),
                  });
                  return acc;
                }, {}),
              });
            }),
            // addons: ProjectAddon[],
          },
          {
            images: yup
              .array(
                yup
                  .object({
                    name: yup.string().trim().optional(),
                    url: yup.mixed().required(),
                  })
                  .label("Images")
              )
              .default([]),
            cover: yup.string().label("Cover").trim().url(),
            videos: yup
              .array(
                yup
                  .object({
                    name: yup.string().trim().optional(),
                    url: yup.mixed().required(),
                  })
                  .label("Videos")
              )
              .default([]),
            documents: yup
              .array(
                yup.object({
                  name: yup.string().trim().optional(),
                  url: yup.mixed().required(),
                })
              )
              .label("Documents")
              .default([]),
          },
          {
            requirements: yup
              .array(yupCustomField())
              .label("Requirements")
              .default([])
              .required(),
          },
          {
            description: yup.string().label("Description").trim().optional(),
            steps: yup
              .array(
                yup.object({
                  name: yup.string().trim().required(),
                  description: yup.string().trim().required(),
                })
              )
              .default([]),
            faqs: yup
              .array(
                yup.object({
                  question: yup.string().label("Question").trim().required(),
                  answer: yup.string().label("Answer").trim().required(),
                })
              )
              .label("FAQS")
              .default([]),
          },
          {
            request_queue_size: yup.number().default(1).required(),
          },
        ][stepper.step],
        status: yup
          .string()
          .oneOf([ProjectStatus.PENDING, ProjectStatus.IN_REVIEW])
          .default(ProjectStatus.PENDING)
          .required(),
      });
    }),
    onSubmit: async (_values) => {
      try {
        const values = { ..._values };
        values.attributes = Object.keys(values.attributes).reduce((acc, id) => {
          acc.push({ id, value: values.attributes[id] });
          return acc;
        }, []);

        values.tiers = Object.keys(values.tiers).reduce((acc, type) => {
          const tier = values.tiers[type];
          acc.push({
            ...tier,
            type,
            services: Object.keys(tier.services).reduce((acc, id) => {
              acc.push({ ...DEFAULT_TIER, id, value: tier.services[id] });
              return acc;
            }, []),
          });
          return acc;
        }, []);

        if (stepToParam(stepper.step) === ProjectCreateEditParamEnum.GALLARY) {
          for (const index in values.images) {
            const image = values.images[index];
            if (image?.url instanceof File) {
              const data = await uploadAssetMutation({
                data: {
                  file: image.url,
                  resource_type: "image",
                  public_id: `${id}.${index}`,
                  unique_filename: false,
                  upload_preset: "project_images_upload_preset",
                },
              }).unwrap();
              values.images[index].url = data.secure_url;
            }
          }

          for (const index in values.videos) {
            const video = values.videos[index];
            if (video?.url instanceof File) {
              const data = await uploadAssetMutation({
                data: {
                  file: video.url,
                  resource_type: "video",
                  public_id: `${id}.${index}`,
                  unique_filename: false,
                  upload_preset: "project_videos_upload_preset",
                },
              }).unwrap();
              values.videos[index].url = data.secure_url;
            }
          }

          for (const index in values.documents) {
            const document = values.documents[index];
            if (document?.url instanceof File) {
              const data = await uploadAssetMutation({
                data: {
                  file: document.url,
                  resource_type: "auto",
                  public_id: `${id}.${index}.pdf`,
                  unique_filename: false,
                  upload_preset: "project_documents_upload_preset",
                },
              }).unwrap();
              values.documents[index].url = data.secure_url;
            }
          }
        }

        const func = isEdit ? updateProjectMutation : createProjectMutation;
        const data = await func({ path: { id }, data: values }).unwrap();
        enqueueSnackbar(data?.message, { variant: "success" });

        if (!isEdit) {
          return navigate(
            generatePath(RouteEnum.PROJECTS_EDIT, {
              id: data?.data?.id,
            }).concat("?step=", ProjectCreateEditParamEnum.PRICING)
          );
        }

        if (!stepper.canNextStep()) {
          return navigate(RouteEnum.PROJECTS_FREELANCER_DASHBOARD);
        }
        stepper.nextStep();
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

  const categoryQueryResult = CategoryApi.useGetCategoryQuery(
    {
      path: {
        id: formik.values.category?.[formik.values.category?.length - 1],
        group: false,
      },
    },
    {
      skip: !(
        formik.values.category?.[formik.values.category?.length - 1] &&
        formik.values.category?.length > 1
      ),
    }
  );

  const category = categoryQueryResult.data?.data;

  const dataRef = useDataRef({
    mounted,
    DEFAULT_ASSET,
    DEFAULT_TIER,
    DEFAULT_FAQ,
    DEFAULT_REQUIREMENT,
    formik,
    project,
    categoryQueryResult,
    category,
  });

  useEffect(() => {
    const values = dataRef.current.formik.values;
    if (project) {
      dataRef.current.formik.setValues({
        title: project?.title || values.title,
        description: project?.description || values.description,
        category: project?.category || values.category,
        attributes:
          project?.attributes?.reduce((acc, curr) => {
            acc[curr.id] = curr.value;
            return acc;
          }, {}) || values.attributes,
        tags: project?.tags || values.tags,
        tiers:
          normalizeArray(
            project?.tiers?.map((tier) => ({
              ...tier,
              services:
                tier?.services?.reduce((acc, curr) => {
                  acc[curr.id] = curr.value;
                  return acc;
                }, {}) || {},
            })),
            { getId: ({ type }) => type }
          ) || values.tiers,
        images: project?.images || values.images,
        cover: project?.cover || values.cover,
        videos: project?.videos || values.videos,
        documents: project?.documents || values.documents,
        requirements: project?.requirements || values.requirements,
        faqs: project?.faqs || values.faqs,
        request_queue_size:
          project?.request_queue_size || values.request_queue_size,
        status: project?.status || values.status,
      });
    }
  }, [dataRef, project]);

  const contentProps = { dataRef, ...dataRef.current };

  const contents = [
    {
      title: "Overview",
      body: <ProjectCreateEditOverview {...contentProps} />,
    },
    { title: "Pricing", body: <ProjectCreateEditPricing {...contentProps} /> },
    { title: "Gallery", body: <ProjectCreateEditGallery {...contentProps} /> },
    {
      title: "Requirements",
      body: <ProjectCreateEditRequirements {...contentProps} />,
    },
    {
      title: "Description",
      body: <ProjectCreateEditDescription {...contentProps} />,
    },
    { title: "Review", body: <ProjectCreateEditReview {...contentProps} /> },
  ];

  const content = contents[stepper.step];

  const footer = (
    <div className="flex items-center gap-4 py-8 flex-wrap-reverse">
      <LinkButton
        variant="outlined"
        to={RouteEnum.PROJECTS_FREELANCER_DASHBOARD}
      >
        Cancel
      </LinkButton>
      <div className="flex-1" />
      <Button
        variant="outlined"
        disabled={!stepper.canPrevStep() || isSubmitting}
        onClick={stepper.prevStep}
      >
        Back
      </Button>
      <LoadingButton
        // disabled={!stepper.canNextStep()}
        loading={isSubmitting}
        loadingPosition="end"
        endIcon={<></>}
        onClick={formik.handleSubmit}
      >
        {stepper.canNextStep() ? "Continue" : "Save Project"}
      </LoadingButton>
      {!stepper.canNextStep() && (
        <LoadingButton
          loading={isSubmitting}
          loadingPosition="end"
          endIcon={<></>}
          onClick={async () => {
            await formik.setFieldValue("status", ProjectStatus.IN_REVIEW);
            formik.handleSubmit();
          }}
        >
          Submit For Review
        </LoadingButton>
      )}
    </div>
  );

  return (
    <LoadingContent
      loading={projectQueryResult.isLoading}
      error={projectQueryResult.isError}
      onReload={projectQueryResult.refetch}
    >
      {() => (
        <>
          <div className="w-full overflow-auto mb-2">
            <Stepper
              activeStep={stepper.step}
              alternativeLabel={ismd}
              // orientation={ismd ? "horizontal" : "vertical"}
              className="mb-4"
            >
              {contents.map((content, index) => (
                <Step key={index} completed={stepper.step > index}>
                  <StepButton
                    disabled={stepper.step <= index}
                    onClick={() => stepper.nextStep(index)}
                  >
                    {content.title}
                  </StepButton>
                  {/* {!ismd && (
              <StepContent>
                {content.body}
                {footer}
              </StepContent>
            )} */}
                </Step>
              ))}
            </Stepper>
          </div>
          {/* {ismd && content?.body}
      {ismd && footer} */}
          {content?.body}
          {footer}
        </>
      )}
    </LoadingContent>
  );
}

export default ProjectCreateEdit;

const DEFAULT_CATEGORY = [""];

const DEFAULT_FAQ = {
  question: "",
  answer: "",
};

const DEFAULT_ASSET = {
  name: "",
  url: "",
};

const DEFAULT_TIER = {
  type: "",
  title: "",
  description: "",
  services: {},
  price: 0,
};

const DEFAULT_REQUIREMENT = {
  label: "",
  id: "",
  description: "",
  required: false,
  deprecated: false,
};
