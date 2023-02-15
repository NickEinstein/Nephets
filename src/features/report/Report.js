import { lazy, Suspense, useMemo } from "react";
import { RouteEnum } from "constants/RouteConstants";
import { Navigate, useRoutes } from "react-router-dom";
import { configureRoutes } from "utils/RouteUtils";
import useAuthUser from "hooks/useAuthUser";

function Report() {
  const authUser = useAuthUser();

  const routes = useRoutes(useMemo(() => getRoutes({ authUser }), [authUser]));

  return <Suspense>{routes}</Suspense>;
}

export default Report;

function getRoutes({ authUser }) {
  const redirect = <Navigate to={RouteEnum.REPORTS_TRANSACTIONS} replace />;
  const redirectToHome = (
    <Navigate to={RouteEnum.REPORTS_TRANSACTIONS} replace />
  );

  return configureRoutes(
    [
      {
        path: "*",
        element: redirect,
      },
      {
        index: true,
        element: lazy(() => import("./ReportTransactionHistory")),
      },
      {
        path: RouteEnum.REPORTS_TRANSACTIONS,
        element: lazy(() => import("./ReportTransactionHistory")),
      },
      ...(authUser?.isClient
        ? [
            {
              path: RouteEnum.REPORTS_BUDGETS,
              element: lazy(() => import("./ReportClientBudget")),
            },
          ]
        : []),
    ],
    {
      parentPath: RouteEnum.REPORTS,
    }
  );
}
