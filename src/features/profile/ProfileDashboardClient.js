import { Alert, IconButton, Paper, Rating, Typography } from "@mui/material";
import LinkButton from "common/LinkButton";
import LinkIconButton from "common/LinkIconButton";
import MuiRouterLink from "common/MuiRouterLink";
import UserAvatar from "common/UserAvatar";
import UserStatusChip from "common/UserStatusChip";
import { StatusColorMap } from "constants/Global";
import { RouteEnum } from "constants/RouteConstants";
import * as dfns from "date-fns";
import ProfileDashboardSubtitle from "./ProfileDashboardSubtitle";
import ProfileDashboardTitle from "./ProfileDashboardTitle";
import ProfileProgress from "./ProfileProgress";

function ProfileDashboardClient({
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
  return (
    <Paper variant="outlined" className="p-4 md:p-6">
      <div className="flex justify-center md:justify-between items-start flex-wrap mb-6">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mb-4 text-center md:text-start">
          <div className="relative">
            <UserAvatar className="w-20 h-20 mb-1" src={user?.avatar}>
              {user?.company?.[0]?.toUpperCase()}
            </UserAvatar>
            {isPrivateView && (
              <div className="bg-white rounded-full absolute -top-2 -right-2 border">
                <LinkIconButton
                  size="small"
                  color="primary"
                  // className="absolute -top-2 right-2"
                  to={RouteEnum.PROFILE_UPDATE}
                >
                  {editIcon}
                </LinkIconButton>
              </div>
            )}
            {isPrivateView && (
              <MuiRouterLink to={RouteEnum.PROFILE_UPDATE}>
                Edit Profile
              </MuiRouterLink>
            )}
          </div>
          <div>
            <Typography variant="h5" className="font-extrabold" gutterBottom>
              {user?.company}
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
            <LinkButton variant="outlined" to={RouteEnum.PROJECTS}>
              Browse Projects
            </LinkButton>
            <LinkButton to={RouteEnum.JOBS_CREATE}>Post Job</LinkButton>
          </div>
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
          {isPrivateView && (
            <div className="grid grid-cols-1 gap-y-6">
              <ProfileProgress value={user?.profile_progress} />
              {renderLabelAndValues([
                {
                  label: "System Rating",
                  value: <Rating size="small" name="read-only" value={4} />,
                },
              ])}
              <LinkButton to={RouteEnum.JOBS_CREATE} fullWidth>
                Post Job
              </LinkButton>
              <LinkButton
                variant="outlined"
                to={RouteEnum.PROFILE_FREELANCERS}
                fullWidth
              >
                Explore More Talents
              </LinkButton>
              <LinkButton variant="outlined" to={RouteEnum.PROJECTS} fullWidth>
                Explore Projects
              </LinkButton>

              <div>
                <ProfileDashboardSubtitle>
                  Ready to buy Projects
                </ProfileDashboardSubtitle>
                {/* @TODO render projects */}
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-2/3 md:pl-6 md:border-l">
          <div className="flex items-center justify-between">
            <ProfileDashboardTitle>Your Posting</ProfileDashboardTitle>
            {isPrivateView && (
              <LinkButton variant="outlined" to={RouteEnum.JOBS}>
                View All Posting
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default ProfileDashboardClient;
