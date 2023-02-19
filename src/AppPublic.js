import { lazy } from "react";
import Suspense from "common/Suspense";
import { Navigate, useRoutes } from "react-router-dom";
import { configureRoutes } from "utils/RouteUtils";
import { RouteEnum } from "constants/RouteConstants";

function AppPublic() {
  const routes = useRoutes(ROUTES);

  return <Suspense>{routes}</Suspense>;
}

const ROUTES = configureRoutes([
  {
    path: "*",
    element: <Navigate to={RouteEnum.HOME} replace />,
  },
  {
    path: RouteEnum.HOME,
    element: lazy(() => import("features/home/Home")),
  },
  {
    path: RouteEnum.VISA,
    element: lazy(() => import("features/visa/Visa")),
  },
  {
    path: RouteEnum.ABOUT_US,
    element: lazy(() => import("features/aboutus/AboutUs")),
  },

  {
    path: RouteEnum.COACHING,
    element: lazy(() => import("features/coaching/coaching")),
  },

  {
    path: RouteEnum.PERSONALINFO,
    element: lazy(() => import("features/personalInfo/PersonalInfo")),
  },
  {
    path: RouteEnum.COACHINGFORM,
    element: lazy(() => import("features/coaching/CoachingForm")),
  },

  // {
  //   path: RouteEnum.SIGNUPCLIENT,
  //   element: lazy(() => import("features/signup/SignUpClient")),
  // },
  // {
  //   path: RouteEnum.SIGNUPCLIENT,
  //   element: lazy(() => import("features/signup/SignUpClientF")),
  // },
  // {
  //   path: RouteEnum.SIGNUPCLIENTF,
  //   element: lazy(() => import("features/signup/SignUpClientF")),
  // },
  {
    path: RouteEnum.LOGIN,
    element: lazy(() => import("features/login/Login")),
  },
]);

export default AppPublic;
