import { lazy, Suspense, useMemo } from "react";
import { RouteEnum } from "constants/RouteConstants";
import { Navigate, useRoutes } from "react-router-dom";
import { configureRoutes } from "utils/RouteUtils";
import useAuthUser from "hooks/useAuthUser";

function Project() {
  const authUser = useAuthUser();
  const routes = useRoutes(useMemo(() => getRoutes({ authUser }), [authUser]));

  return <Suspense>{routes}</Suspense>;
}

export default Project;

function getRoutes({ authUser }) {
  const redirect = <Navigate to={RouteEnum.PROJECTS} replace />;
  const redirectToHome = <Navigate to={RouteEnum.HOME} replace />;

  return configureRoutes(
    [
      {
        path: "*",
        element: redirect,
      },
      {
        index: true,
        element: lazy(() => import("./ProjectSearch")),
      },
      {
        path: RouteEnum.PROJECTS_SEARCH,
        element: lazy(() => import("./ProjectSearch")),
      },
      {
        path: RouteEnum.PROJECTS_DASHBOARD,
        element: lazy(() => import("./ProjectDashboard")),
      },
      {
        path: RouteEnum.PROJECTS_FREELANCER_DASHBOARD,
        element: authUser?.isFreelancer
          ? lazy(() => import("./ProjectFreelancerDashboard"))
          : redirectToHome,
      },
      {
        path: RouteEnum.PROJECTS_CREATE,
        element: authUser?.isFreelancer
          ? lazy(() => import("./ProjectCreateEdit"))
          : redirectToHome,
      },
      {
        path: RouteEnum.PROJECTS_EDIT,
        element: authUser?.isFreelancer
          ? lazy(() => import("./ProjectCreateEdit"))
          : redirectToHome,
      },
    ],
    {
      parentPath: RouteEnum.PROJECTS,
    }
  );
}
