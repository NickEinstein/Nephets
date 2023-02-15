import { lazy, Suspense, useMemo } from "react";
import { RouteEnum } from "constants/RouteConstants";
import { Navigate, useRoutes } from "react-router-dom";
import { configureRoutes } from "utils/RouteUtils";
import useAuthUser from "hooks/useAuthUser";

function Job() {
  const authUser = useAuthUser();

  const routes = useRoutes(useMemo(() => getRoutes({ authUser }), [authUser]));

  return <Suspense>{routes}</Suspense>;
}

export default Job;

function getRoutes({ authUser }) {
  const redirect = <Navigate to={RouteEnum.JOBS} replace />;
  const redirectToHome = <Navigate to={RouteEnum.HOME} replace />;

  return configureRoutes(
    [
      {
        path: "*",
        element: redirect,
      },
      {
        index: true,
        element: lazy(() => import("./JobSearch")),
      },
      {
        path: RouteEnum.JOBS_SEARCH,
        element: lazy(() => import("./JobSearch")),
      },
      {
        path: RouteEnum.JOBS_DASHBOARD,
        element: lazy(() => import("./JobDashboard")),
      },
      {
        path: RouteEnum.JOBS_CLIENT_DASHBOARD,
        element: authUser?.isClient
          ? lazy(() => import("./JobClientDashboard"))
          : redirectToHome,
      },
      {
        path: RouteEnum.JOBS_CREATE,
        element: authUser?.isClient
          ? lazy(() => import("./JobCreateEdit"))
          : redirectToHome,
      },
      {
        path: RouteEnum.JOBS_EDIT,
        element: authUser?.isClient
          ? lazy(() => import("./JobCreateEdit"))
          : redirectToHome,
      },
      {
        path: RouteEnum.JOBS_CLIENT_POSTS,
        element: authUser?.isClient
          ? lazy(() => import("./JobPostList"))
          : redirectToHome,
      },
      {
        path: RouteEnum.JOBS_CLIENT_POSTS_ADD,
        element: authUser?.isClient
          ? lazy(() => import("./JobPostAdd"))
          : redirectToHome,
      },
      {
        path: RouteEnum.JOBS_SAVED,
        element: authUser?.isFreelancer
          ? lazy(() => import("./JobSavedList"))
          : redirectToHome,
      },
      {
        path: RouteEnum.JOBS_PROPOSALS,
        element: authUser
          ? lazy(() => import("./JobContractList"))
          : redirectToHome,
      },
      {
        path: RouteEnum.JOBS_CONTRACTS,
        element: authUser
          ? lazy(() => import("./JobContractList"))
          : redirectToHome,
      },
      {
        path: RouteEnum.JOBS_CLIENT_HIRES,
        element: authUser?.isClient
          ? lazy(() => import("./JobHireList"))
          : redirectToHome,
      },
    ],
    {
      parentPath: RouteEnum.JOBS,
    }
  );
}
