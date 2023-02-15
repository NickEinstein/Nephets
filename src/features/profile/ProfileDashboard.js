import { Icon, Typography } from "@mui/material";
import UserApi from "apis/UserApi";
import LoadingContent from "common/LoadingContent";
import { UserTypeEnum } from "constants/Global";
import useAuthUser from "hooks/useAuthUser";
import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { urlSearchParamsExtractor } from "utils/URLUtils";
import { ProfileViewModeEnum } from "./ProfileConstants";
import ProfileDashboardClient from "./ProfileDashboardClient";
import ProfileDashboardFreelancer from "./ProfileDashboardFreelancer";
import ProfileDashboardLabel from "./ProfileDashboardLabel";

function ProfileDashboard(props) {
  const { id: _id } = useParams();

  const authUser = useAuthUser();

  const id = _id || authUser?.id;

  const isAuthUser = !!authUser && authUser.id === id;

  const [searchParams] = useSearchParams();

  const { viewMode: _viewMode } = urlSearchParamsExtractor(searchParams, {
    viewMode: isAuthUser
      ? ProfileViewModeEnum.PRIVATE
      : ProfileViewModeEnum.PUBLIC,
  });

  const viewMode = isAuthUser
    ? parseInt(_viewMode) || ProfileViewModeEnum.PRIVATE
    : ProfileViewModeEnum.PUBLIC;

  const isPrivateView = viewMode === ProfileViewModeEnum.PRIVATE;
  const isPublicView = viewMode === ProfileViewModeEnum.PUBLIC;

  const userQueryResult = UserApi.useGetUserQuery(
    useMemo(() => ({ path: { id } }), [id])
  );

  const user = userQueryResult.data?.data;

  const isClient = user?.type === UserTypeEnum.CLIENT;
  const isFreelancer = user?.type === UserTypeEnum.FREELANCER;

  const contentProps = {
    id,
    authUser,
    isAuthUser,
    viewMode,
    isPrivateView,
    isPublicView,
    userQueryResult,
    user,
    isClient,
    isFreelancer,
    renderLabelAndValues,
    renderLabelAndValue,
    editIcon,
  };

  const Dashboard = isClient
    ? ProfileDashboardClient
    : ProfileDashboardFreelancer;

  return (
    <LoadingContent
      loading={userQueryResult.isLoading}
      error={userQueryResult.error}
      onReload={userQueryResult.refetch}
    >
      {() => {
        return <Dashboard {...contentProps} />;
      }}
    </LoadingContent>
  );
}

export default ProfileDashboard;

function renderLabelAndValues(list, getLabelAndValue = (item) => item) {
  return (
    <div className="flex flex-col gap-4">
      {list?.map((item) => {
        const { label, value } = getLabelAndValue(item);
        return renderLabelAndValue(label, value);
      })}
    </div>
  );
}

function renderLabelAndValue(label, value) {
  return (
    <div key={label} className="flex gap-2 justify-between ">
      <ProfileDashboardLabel>{label}</ProfileDashboardLabel>
      {typeof value === "object" ? (
        value
      ) : (
        <Typography>
          {value !== undefined && value !== null && value !== "" ? value : "-"}
        </Typography>
      )}
    </div>
  );
}

const editIcon = <Icon>drive_file_rename_outline</Icon>;
