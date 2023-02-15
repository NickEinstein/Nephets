import {
  Alert,
  Breadcrumbs,
  Chip,
  Icon,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import UserAvatar from "common/UserAvatar";
import { useMemo } from "react";
import { generatePath } from "react-router-dom";
import {
  ProfileUpdateFreelancerParamEnum,
  ProfileUpdateFreelancerViewModeEnum,
  ProfileViewModeEnum,
} from "./ProfileConstants";
import * as dfns from "date-fns";
import LinkIconButton from "common/LinkIconButton";
import { RouteEnum } from "constants/RouteConstants";
import LinkButton from "common/LinkButton";
import UserStatusChip from "common/UserStatusChip";
import ProfileProgress from "./ProfileProgress";
import { DateFormatEnum } from "constants/DateContants";
import VideoPreviewer from "common/VideoPreviewer";
import clsx from "clsx";
import SkillApi from "apis/SkillsApi";
import LanguageApi from "apis/LanguageApi";
import CategoryApi from "apis/CategoryApi";
import { normalizeArray } from "utils/ObjectUtils";
import LevelApi from "apis/LevelApi";
import CurrencyTypography from "common/CurrencyTypography";
import MuiRouterLink from "common/MuiRouterLink";
import { StatusColorMap } from "constants/Global";
import ProfileDashboardTitle from "./ProfileDashboardTitle";
import ProfileDashboardSubtitle from "./ProfileDashboardSubtitle";
import CountryApi from "apis/CountryApi";
import ProjectApi from "apis/ProjectApi";

function ProfileDashboardFreelancer({
  id,
  authUser,
  isAuthUser,
  viewMode,
  isPrivateView,
  isPublicView,
  userQueryResult,
  user,
  renderLabelAndValues,
  renderLabelAndValue,
  editIcon,
}) {
  const {
    languagesIds,
    languagesLevels,
    skillsIds,
    categoriesId,
    locationsIds,
  } = useMemo(() => {
    return {
      ...user?.languages?.reduce(
        (acc, curr) => {
          acc.languagesIds.push(curr.id);
          acc.languagesLevels.push(curr.level);
          return acc;
        },
        { languagesIds: [], languagesLevels: [] }
      ),
      skillsIds: user?.skills?.reduce((acc, curr) => {
        acc.push(curr);
        return acc;
      }, []),
      categoriesId: user?.categories?.flat(),
      locationsIds: user?.work_histories?.map((item) => item?.location),
    };
  }, [user?.categories, user?.languages, user?.skills, user?.work_histories]);

  const activeProjectsQueryResult = ProjectApi.useGetProjectsQuery(
    useMemo(
      () => ({
        params: { user: user?.id, status: "ACCEPTED" },
      }),
      [user?.id]
    ),
    { skip: !user }
  );

  const activeProjects = activeProjectsQueryResult.data?.data  || []

  const languagesQueryResult = LanguageApi.useGetLanguagesQuery(
    useMemo(
      () => ({
        params: {
          fields: "name",
          id: languagesIds?.length
            ? `in(${languagesIds.join(",")})`
            : undefined,
        },
      }),
      [languagesIds]
    ),
    {
      skip: !languagesIds?.length,
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  const levelsQueryResult = LevelApi.useGetLevelsQuery(
    useMemo(
      () => ({
        params: {
          fields: "name",
          id: languagesLevels?.length
            ? `in(${languagesLevels.join(",")})`
            : undefined,
        },
      }),
      [languagesLevels]
    ),
    {
      skip: !languagesLevels?.length,
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  const skillsQueryResult = SkillApi.useGetSkillsQuery(
    useMemo(
      () => ({
        params: {
          fields: "name",
          id: skillsIds?.length ? `in(${skillsIds.join(",")})` : undefined,
        },
      }),
      [skillsIds]
    ),
    {
      skip: !skillsIds?.length,
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  const categoriesQueryResult = CategoryApi.useGetCategoriesQuery(
    useMemo(
      () => ({
        params: {
          fields: "name",
          id: `in(${categoriesId?.join(",")})`,
        },
      }),
      [categoriesId]
    ),
    {
      skip: !categoriesId?.length,
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  const countriesQueryResult = CountryApi.useGetCountriesQuery(
    useMemo(
      () => ({
        params: {
          fields: "name",
          id: `in(${locationsIds?.join(",")})`,
        },
      }),
      [locationsIds]
    ),
    {
      skip: !locationsIds?.length,
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  function getLocationName(id) {
    return countriesQueryResult.normalizedData?.[id]?.name || "";
  }

  const contentProps = { viewMode, isPrivateView, isPublicView };

  return (
    <>
      <Paper variant="outlined" className="p-4 md:p-6">
        <div className="flex justify-center md:justify-between items-start flex-wrap mb-6">
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mb-4 text-center md:text-start">
            <div className="relative">
              <UserAvatar className="w-20 h-20 mb-1" src={user?.avatar}>
                {user?.lastname?.slice(0, 1)?.toUpperCase()}
              </UserAvatar>
              {isPrivateView && (
                <div className="bg-white rounded-full absolute -top-2 -right-2 border">
                  <LinkIconButton
                    size="small"
                    color="primary"
                    // className="absolute -top-2 right-2"
                    to={generateEditRoute(
                      ProfileUpdateFreelancerParamEnum.PERSONAL_INFORMATION,
                      ProfileUpdateFreelancerViewModeEnum.PROFILE_PICTURE
                    )}
                  >
                    {editIcon}
                  </LinkIconButton>
                </div>
              )}
              {isPrivateView && (
                <MuiRouterLink
                  to={generateEditRoute(
                    ProfileUpdateFreelancerParamEnum.PERSONAL_INFORMATION,
                    ProfileUpdateFreelancerViewModeEnum.FULL
                  )}
                >
                  Edit Profile
                </MuiRouterLink>
              )}
            </div>
            <div>
              <Typography variant="h5" className="font-extrabold" gutterBottom>
                {user?.firstname} {user?.lastname}
              </Typography>
              <Typography
                variant="body2"
                className="font-bold whitespace-nowrap"
                gutterBottom
              >
                {user?.type}
              </Typography>
              <Typography gutterBottom>{`Member since ${dfns.format(
                new Date(user?.created_at),
                "MMMM yyyy"
              )}`}</Typography>
              <UserStatusChip status={user?.status} />
            </div>
          </div>
          {isPrivateView && (
            <div className="flex items-center justify-center flex-wrap gap-2">
              <LinkButton
                variant="outlined"
                to={generatePath(RouteEnum.PROFILE_DASHBOARD, { id }).concat(
                  "?viewMode=",
                  ProfileViewModeEnum.PUBLIC
                )}
              >
                See Public View
              </LinkButton>
              <LinkButton to={RouteEnum.SETTINGS}>Profile Settings</LinkButton>
            </div>
          )}
          {isAuthUser && isPublicView && (
            <LinkButton variant="outlined" to={RouteEnum.PROFILE}>
              See Full View
            </LinkButton>
          )}
        </div>
        {isPrivateView && user?.status_reason && (
          <Alert
            severity={StatusColorMap[user?.status]}
            className="rounded-full mb-8"
          >
            {user?.status_reason}
          </Alert>
        )}
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 md:pr-6">
            <div className="mb-4">
              <ProfileProgress value={user?.profile_progress} />
            </div>
            <Section {...contentProps}>
              {renderLabelAndValues([
                {
                  label: "Rating",
                  value: <Rating size="small" name="read-only" value={4} />,
                },
                {
                  label: "Fulfiled Orders",
                  value: 1,
                },
                {
                  label: "Rejected Orders",
                  value: 0,
                },
                {
                  label: "Average Response Time",
                  value: "1 hour",
                },
                {
                  label: "Last Job Done",
                  value: dfns.format(
                    new Date(),
                    DateFormatEnum.SPACE_dd_MMM_yyyy
                  ),
                },
              ])}
            </Section>
            <Section
              {...contentProps}
              title={
                <ProfileDashboardSubtitle>Categories</ProfileDashboardSubtitle>
              }
              editRoute={generateEditRoute(
                ProfileUpdateFreelancerParamEnum.PROFESSIONAL_INFORMATION,
                ProfileUpdateFreelancerViewModeEnum.CATEGORIES
              )}
              onAdd={() => {}}
            >
              <div className="flex flex-col gap-4">
                {user?.categories?.map((categoryHierarchy, index) => (
                  <Breadcrumbs
                    key={index}
                    separator={<Icon>navigate_next</Icon>}
                  >
                    {categoryHierarchy?.map((category) => (
                      <Typography key={category}>
                        {
                          categoriesQueryResult?.normalizedData?.[category]
                            ?.name
                        }
                      </Typography>
                    ))}
                  </Breadcrumbs>
                ))}
              </div>
            </Section>
            <Section
              {...contentProps}
              title={
                <ProfileDashboardSubtitle>Pitch Video</ProfileDashboardSubtitle>
              }
              editRoute={generateEditRoute(
                ProfileUpdateFreelancerParamEnum.PERSONAL_INFORMATION,
                ProfileUpdateFreelancerViewModeEnum.PITCH_VIDEO
              )}
              onAdd={() => {}}
            >
              <VideoPreviewer
                controls
                src={user?.pitch_video}
                className="aspect-video border rounded-lg"
              />
            </Section>
            <Section
              {...contentProps}
              title={
                <ProfileDashboardSubtitle>
                  Hours Per Week
                </ProfileDashboardSubtitle>
              }
              editRoute={generateEditRoute(
                ProfileUpdateFreelancerParamEnum.CHARGES
              )}
            >
              <ProfileDashboardTitle>
                More than 30 hrs/week
              </ProfileDashboardTitle>
            </Section>
            <Section
              {...contentProps}
              title={
                <ProfileDashboardSubtitle>Languages</ProfileDashboardSubtitle>
              }
              editRoute={generateEditRoute(
                ProfileUpdateFreelancerParamEnum.PERSONAL_INFORMATION,
                ProfileUpdateFreelancerViewModeEnum.LANGUAGES
              )}
              onAdd={() => {}}
            >
              {renderLabelAndValues(user?.languages, (language) => ({
                label:
                  languagesQueryResult.normalizedData?.[language?.id]?.name,
                value:
                  levelsQueryResult.normalizedData?.[language?.level]?.name,
              }))}
            </Section>
            <Section
              {...contentProps}
              title={
                <ProfileDashboardSubtitle>
                  Phone Numbers
                </ProfileDashboardSubtitle>
              }
              editRoute={generateEditRoute(
                ProfileUpdateFreelancerParamEnum.ACCOUNT_SECURITY,
                ProfileUpdateFreelancerViewModeEnum.PHONE_NUMBERS
              )}
              onAdd={() => {}}
            >
              {renderLabelAndValues(user?.phone_numbers, (phoneNumber) => ({
                label: `${phoneNumber?.code} ${phoneNumber?.digits}`,
                value: phoneNumber?.status,
              }))}
            </Section>
            {isPrivateView && (
              <Section
                {...contentProps}
                title={
                  <ProfileDashboardSubtitle>
                    Linked Accounts
                  </ProfileDashboardSubtitle>
                }
                editRoute={generateEditRoute(
                  ProfileUpdateFreelancerParamEnum.SOCIAL_ACCOUNTS,
                  ProfileUpdateFreelancerViewModeEnum.SOCAIL_ACCOUNTS
                )}
              >
                {renderLabelAndValues([
                  {
                    label: "Google",
                    value: "",
                  },
                  {
                    label: "Apple",
                    value: "",
                  },
                  {
                    label: "Facebook",
                    value: "",
                  },
                  {
                    label: "Twitter",
                    value: "",
                  },
                ])}
              </Section>
            )}
            <Section
              {...contentProps}
              title={
                <ProfileDashboardSubtitle>
                  Certifications
                </ProfileDashboardSubtitle>
              }
              onAdd={() => {}}
              editRoute={generateEditRoute(
                ProfileUpdateFreelancerParamEnum.PROFESSIONAL_INFORMATION,
                ProfileUpdateFreelancerViewModeEnum.CERTIFICATIONS
              )}
            >
              {user?.certifications?.map((certification, index) => {
                return (
                  <div key={index}>
                    <Typography className="font-extrabold" gutterBottom>
                      {certification.name}
                      {" - "}
                      <Typography
                        variant="body2"
                        component="span"
                        className="font-light"
                        gutterBottom
                      >
                        {dfns.format(
                          new Date(certification.date),
                          DateFormatEnum.SPACE_MMMM_yyyy
                        )}
                      </Typography>
                    </Typography>
                    <Typography gutterBottom>
                      {certification.company}
                    </Typography>
                  </div>
                );
              })}
            </Section>
            <Section
              {...contentProps}
              title={
                <ProfileDashboardSubtitle>Educations</ProfileDashboardSubtitle>
              }
              onAdd={() => {}}
              editRoute={generateEditRoute(
                ProfileUpdateFreelancerParamEnum.PROFESSIONAL_INFORMATION,
                ProfileUpdateFreelancerViewModeEnum.EDUCATIONS
              )}
            >
              {user?.educations?.map((education, index) => {
                return (
                  <div key={index}>
                    <Typography gutterBottom className="font-bold">
                      {education.name}
                      {" - "}
                      <Typography
                        variant="body2"
                        component="span"
                        className="font-light"
                        gutterBottom
                      >
                        {dfns.format(
                          new Date(education.date),
                          DateFormatEnum.SPACE_MMMM_yyyy
                        )}
                      </Typography>
                    </Typography>
                    <Typography gutterBottom>{education.major}</Typography>
                  </div>
                );
              })}
            </Section>
          </div>
          <div className="w-full md:w-2/3 md:pl-6 md:border-l">
            <Section {...contentProps}>
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className="flex">
                  <ProfileDashboardTitle>{user?.titles}</ProfileDashboardTitle>
                  <LinkIconButton
                    size="small"
                    color="primary"
                    to={generateEditRoute(
                      ProfileUpdateFreelancerParamEnum.PERSONAL_INFORMATION,
                      ProfileUpdateFreelancerViewModeEnum.TITLE
                    )}
                  >
                    {editIcon}
                  </LinkIconButton>
                </div>
                <div className="flex">
                  <CurrencyTypography variant="h6" className="font-bold">
                    {user?.hourly_rate}
                  </CurrencyTypography>
                  <LinkIconButton
                    size="small"
                    color="primary"
                    to={generateEditRoute(
                      ProfileUpdateFreelancerParamEnum.CHARGES,
                      ProfileUpdateFreelancerViewModeEnum.FULL
                    )}
                  >
                    {editIcon}
                  </LinkIconButton>
                </div>
              </div>
              <Typography>{user?.biography}</Typography>
            </Section>

            <Section
              {...contentProps}
              title={
                <ProfileDashboardTitle>Softwrk Job History</ProfileDashboardTitle>
              }
            >
              {user?.work_history?.length ? null : (
                <Typography className="py-4">
                  No work yet. Once you start getting hired on Softwrk your work
                  with clients will show up here.{" "}
                  <MuiRouterLink to="#">Start your search</MuiRouterLink>
                </Typography>
              )}
            </Section>

            <Section
              {...contentProps}
              title={<ProfileDashboardTitle>Skills</ProfileDashboardTitle>}
              editRoute={generateEditRoute(
                ProfileUpdateFreelancerParamEnum.PROFESSIONAL_INFORMATION,
                ProfileUpdateFreelancerViewModeEnum.SKILLS
              )}
            >
              <div className="flex flex-wrap gap-4">
                {user?.skills?.map((skill) => (
                  <Chip
                    key={skill}
                    label={skillsQueryResult.normalizedData?.[skill]?.name}
                  />
                ))}
              </div>
            </Section>

            <Section
              {...contentProps}
              title={<ProfileDashboardTitle>Portfolio</ProfileDashboardTitle>}
              onAdd={() => {}}
              editRoute={generateEditRoute(
                ProfileUpdateFreelancerParamEnum.PROFESSIONAL_INFORMATION
              )}
            ></Section>

            <Section
              {...contentProps}
              title={
                <ProfileDashboardTitle>
                  Employement History
                </ProfileDashboardTitle>
              }
              onAdd={() => {}}
              editRoute={generateEditRoute(
                ProfileUpdateFreelancerParamEnum.EMPLOYEMENT_HISTORY,
                ProfileUpdateFreelancerViewModeEnum.EMPLOYEMENT_HISTORY
              )}
            >
              {user?.work_histories?.map((experience, index) => {
                const start_date = new Date(experience.start_date);
                const end_date = new Date(experience.end_date || undefined);

                return (
                  <div key={index}>
                    <Typography className="font-extrabold" gutterBottom>
                      {experience.title}
                    </Typography>
                    <Typography gutterBottom>{experience.company}</Typography>
                    <Typography
                      variant="body2"
                      className="font-light"
                      gutterBottom
                    >
                      {dfns.format(start_date, DateFormatEnum.SPACE_MMMM_yyyy)}{" "}
                      -{" "}
                      {experience.end_date
                        ? dfns.format(end_date, DateFormatEnum.SPACE_MMMM_yyyy)
                        : "Present"}{" "}
                      ({dfns.formatDistanceStrict(end_date, start_date)})
                    </Typography>
                    <Typography>{experience.description}</Typography>
                    <Typography>
                      {getLocationName(experience.location)}
                    </Typography>
                  </div>
                );
              })}
            </Section>

            <Section
              {...contentProps}
              title={
                <ProfileDashboardTitle>Other Experiences</ProfileDashboardTitle>
              }
              onAdd={() => {}}
              editRoute={generateEditRoute(
                ProfileUpdateFreelancerParamEnum.PROFESSIONAL_INFORMATION
              )}
            >
              {user?.other_experiences?.map((experience, index) => {
                const start_date = new Date(experience.start_date);
                const end_date = new Date(experience.end_date || undefined);

                return (
                  <div key={index}>
                    <Typography className="font-extrabold" gutterBottom>
                      {experience.title}
                    </Typography>
                    <Typography gutterBottom>{experience.company}</Typography>
                    <Typography className="font-light" gutterBottom>
                      {dfns.format(start_date, DateFormatEnum.SPACE_MMMM_yyyy)}{" "}
                      -{" "}
                      {experience.end_date
                        ? dfns.format(end_date, DateFormatEnum.SPACE_MMMM_yyyy)
                        : "Present"}{" "}
                      ({dfns.formatDistanceStrict(end_date, start_date)})
                    </Typography>
                    <Typography>{experience.description}</Typography>
                  </div>
                );
              })}
            </Section>

            <Section
              {...contentProps}
              title={
                <ProfileDashboardTitle>Active Projects</ProfileDashboardTitle>
              }
            ></Section>

            {isPublicView && (
              <Section
                {...contentProps}
                title={
                  <ProfileDashboardTitle>
                    Project Catalogue
                  </ProfileDashboardTitle>
                }
                onAdd={() => {}}
              ></Section>
            )}
          </div>
        </div>
      </Paper>
    </>
  );
}

export default ProfileDashboardFreelancer;

function generateEditRoute(
  route,
  mode = ProfileUpdateFreelancerViewModeEnum.CURRENT
) {
  return RouteEnum.PROFILE_UPDATE.concat("?step=", route, "&viewMode=", mode);
}

function Section({
  title,
  className,
  children,
  editRoute,
  onEdit,
  onAdd,
  isPrivateView,
}) {
  return (
    <div className={clsx("py-6 border-b", className)}>
      {(title || onAdd || editRoute) && (
        <div className="mb-2 flex items-center gap-2">
          {title}
          <div className="flex-1" />
          {isPrivateView && (
            <>
              {/* {!!onAdd && (
                  <IconButton color="primary" size="small" onClick={onAdd}>
                    <Icon>add_circle</Icon>
                  </IconButton>
                )} */}
              {editRoute && (
                <LinkIconButton color="primary" size="small" to={editRoute}>
                  <Icon>drive_file_rename_outline</Icon>
                </LinkIconButton>
              )}
            </>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

const editIcon = <Icon>drive_file_rename_outline</Icon>;
