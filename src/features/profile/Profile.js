import { lazy, Suspense, useMemo } from "react";
import { RouteEnum } from "constants/RouteConstants";
import { Navigate, useRoutes } from "react-router-dom";
import { configureRoutes } from "utils/RouteUtils";
import useAuthUser from "hooks/useAuthUser";

function Profile() {
  const authUser = useAuthUser();
  const routes = useRoutes(useMemo(() => getRoutes({ authUser }), [authUser]));

  return <Suspense>{routes}</Suspense>;
}

export default Profile;

function getRoutes({ authUser }) {
  const redirect = <Navigate to={RouteEnum.PROFILE} replace />;
  const redirectToHome = <Navigate to={RouteEnum.HOME} replace />;

  return configureRoutes(
    [
      {
        path: "*",
        element: redirect,
      },
      {
        index: true,
        element: authUser
          ? lazy(() => import("./ProfileDashboard"))
          : redirectToHome,
      },
      {
        path: RouteEnum.PROFILE_DASHBOARD,
        element: lazy(() => import("./ProfileDashboard")),
      },
      {
        path: RouteEnum.PROFILE_FREELANCERS_DASHBOARD,
        element: lazy(() => import("./ProfileDashboard")),
      },
      {
        path: RouteEnum.PROFILE_CLIENTS_DASHBOARD,
        element: lazy(() => import("./ProfileDashboard")),
      },
      {
        path: RouteEnum.PROFILE_FREELANCERS,
        element: lazy(() => import("./ProfileSearchFreelancer")),
      },
      {
        path: RouteEnum.PROFILE_CLIENTS,
        element: lazy(() => import("./ProfileSearchClient")),
      },
      {
        path: RouteEnum.PROFILE_UPDATE,
        element: authUser
          ? lazy(() => import("./ProfileUpdate"))
          : redirectToHome,
      },
      {
        path: RouteEnum.PROFILE_UPDATE_TIPS,
        element: authUser
          ? lazy(() => import("./ProfileUpdateTips"))
          : redirectToHome,
      },
      {
        path: RouteEnum.PROFILE_UPDATE_AVOID,
        element: authUser
          ? lazy(() => import("./ProfileUpdateAvoid"))
          : redirectToHome,
      },
      {
        path: RouteEnum.PROFILE_FREELANCERS_RECENTLY_VIEWED,
        element: authUser?.isClient
          ? lazy(() => import("./ProfileRecentlyViewedFreelancerList"))
          : redirectToHome,
      },
      {
        path: RouteEnum.PROFILE_FREELANCERS_SAVED,
        element: authUser?.isClient
          ? lazy(() => import("./ProfileSavedFreelancerList"))
          : redirectToHome,
      },
    ],
    {
      parentPath: RouteEnum.PROFILE,
    }
  );
}
