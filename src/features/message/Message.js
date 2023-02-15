import { lazy, Suspense, useMemo } from "react";
import { RouteEnum } from "constants/RouteConstants";
import { Navigate, useRoutes } from "react-router-dom";
import { configureRoutes } from "utils/RouteUtils";
import useAuthUser from "hooks/useAuthUser";

function Message() {
  const authUser = useAuthUser();
  const routes = useRoutes(useMemo(() => getRoutes({ authUser }), [authUser]));

  return <Suspense>{routes}</Suspense>;
}

export default Message;

function getRoutes({ authUser }) {
  const redirect = <Navigate to={RouteEnum.MESSAGES} replace />;
  const redirectToHome = <Navigate to={RouteEnum.HOME} replace />;

  return configureRoutes(
    [
      {
        path: "*",
        element: redirect,
      },
      {
        index: true,
        element: lazy(() => import("./MessageRoom")),
      },
      {
        path: RouteEnum.MESSAGES_ROOMS,
        element: lazy(() => import("./MessageRoom")),
      },
    ],
    {
      parentPath: RouteEnum.MESSAGES,
    }
  );
}
