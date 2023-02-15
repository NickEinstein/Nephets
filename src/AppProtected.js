import { lazy, useMemo, useState } from "react";
import { Container, useMediaQuery } from "@mui/material";
import { MediaQueryBreakpointEnum } from "constants/Global";
import { matchPath, Navigate, useLocation, useRoutes } from "react-router-dom";
import Suspense from "common/Suspense";
import { configureRoutes } from "utils/RouteUtils";
import { RouteEnum } from "constants/RouteConstants";
import useAuthUser from "hooks/useAuthUser";
import { isUserProfileUpdateRequired } from "utils/UserUtils";
import UserApi from "apis/UserApi";
import LoadingContent from "common/LoadingContent";
import ProtectedPageHeader from "common/ProtectedPageHeader";
import PageFooter from "common/PageFooter";

function AppProtected(props) {
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const location = useLocation();

  const authUser = useAuthUser();

  const [appBarRect, setAppBarRect] = useState({ width: 0, height: 0 });

  const authUserProfileQueryResults = UserApi.useGetAuthUserProfileQuery();

  const REDIRECT_PATH =
    authUser?.new || isUserProfileUpdateRequired(authUser)
      ? RouteEnum.HOW_IT_WORKS
      : RouteEnum.PROFILE;

  const routes = useRoutes(
    useMemo(() => getRoutes({ REDIRECT_PATH }), [REDIRECT_PATH])
  );

  const routeConfig = useMemo(
    () => [].find((route) => matchPath(route, location.pathname)),
    [location.pathname]
  );

  return (
    <>
      <LoadingContent
        loading={authUserProfileQueryResults.isLoading}
        error={authUserProfileQueryResults.isError}
        onReload={authUserProfileQueryResults.refetch}
      >
        {() =>
          routeConfig && !routeConfig?.header && !routeConfig?.content ? (
            <>
              <Suspense>{routes}</Suspense>
            </>
          ) : (
            <>
              {(routeConfig ? !!routeConfig.header : true) && (
                <ProtectedPageHeader
                  hideRectSpacing
                  onRectChange={setAppBarRect}
                />
              )}
              {(routeConfig ? !!routeConfig.content : true) && (
                <Container
                  className="min-h-full pb-8"
                  style={{ paddingTop: appBarRect?.height + 32 }}
                >
                  <Suspense>{routes}</Suspense>
                </Container>
              )}
              {(routeConfig ? !!routeConfig.footer : true) && <PageFooter />}
            </>
          )
        }
      </LoadingContent>
    </>
  );
}

export default AppProtected;

function getRoutes({ REDIRECT_PATH }) {
  return configureRoutes([
    {
      path: "*",
      element: <Navigate to={REDIRECT_PATH} replace />,
    },
    {
      path: RouteEnum.HOW_IT_WORKS,
      element: lazy(() => import("features/how-it-works/HowItWorks")),
    },
    {
      path: RouteEnum.PROFILE.concat("/*"),
      element: lazy(() => import("features/profile/Profile")),
    },
    {
      path: RouteEnum.SETTINGS.concat("/*"),
      element: lazy(() => import("features/setting/Setting")),
    },
    {
      path: RouteEnum.PROJECTS.concat("/*"),
      element: lazy(() => import("features/project/Project")),
    },
    {
      path: RouteEnum.JOBS.concat("/*"),
      element: lazy(() => import("features/job/Job")),
    },
  ]);
}
