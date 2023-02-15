import { lazy } from "react";
import {
  Drawer,
  ListItemButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import clsx from "clsx";
import {
  APP_SIDE_MENU_WIDTH,
  MediaQueryBreakpointEnum,
} from "constants/Global";
import { RouteEnum } from "constants/RouteConstants";
import useToggle from "hooks/useToggle";
import { Link, useMatch, useRoutes } from "react-router-dom";
import { configureRoutes } from "utils/RouteUtils";
import Suspense from "common/Suspense";
import ProtectedPageScaffold from "common/ProtectedPageScaffold";

function Setting(props) {
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);

  const [isSidebar, toggleSidebar] = useToggle();

  const width = APP_SIDE_MENU_WIDTH;

  const routes = useRoutes(ROUTES);

  const links = LINKS.map((section) => (
    <div key={section.name} className="mb-4">
      <Typography gutterBottom className="font-bold">
        {section.name}
      </Typography>
      <div className="flex flex-col">
        {section.children.map((link) => (
          <LinkItem key={link.name} item={link} />
        ))}
      </div>
    </div>
  ));

  return (
    <ProtectedPageScaffold>
      <div className="flex">
        {islg ? (
          <div className="">{links}</div>
        ) : (
          <Drawer
            // classes={{
            //   root: "overflow-x-hidden",
            //   paper: "overflow-hidden py-4 bg-primary-shade2 border-0",
            // }}
            // style={{
            //   overflowX: "hidden",
            //   width: width,
            //   whiteSpace: "nowrap",
            // }}
            variant="temporary"
            open={isSidebar}
            onClose={() => toggleSidebar()}
            PaperProps={{
              style: {
                width: width,
                // borderTopRightRadius: 40,
              },
            }}
          >
            {links}
          </Drawer>
        )}
        <div className="flex-1 px-4 lg:px-8">
          <Suspense>{routes}</Suspense>
        </div>
      </div>
    </ProtectedPageScaffold>
  );
}

export default Setting;

function LinkItem(props) {
  const { item } = props;

  const match = useMatch(item.to.concat("/*"));

  return (
    <ListItemButton
      component={Link}
      to={item.to}
      className={clsx("rounded", match && "bg-[#37054833]")}
    >
      <Typography>{item.name}</Typography>
    </ListItemButton>
  );
}

const LINKS = [
  {
    name: "Billing",
    children: [
      {
        name: "Billing & Payments",
        to: RouteEnum.SETTINGS_BILLING_AND_PAYMENTS,
      },
    ],
  },
  {
    name: "User Setting",
    children: [
      {
        name: "Password & Security",
        to: RouteEnum.SETTINGS_PASSWORD_AND_SECURITY,
      },
      {
        name: "Notification",
        to: RouteEnum.SETTINGS_NOTIFICATION,
      },
    ],
  },
];

const ROUTES = configureRoutes(
  [
    {
      path: RouteEnum.SETTINGS_BILLING_AND_PAYMENTS,
      element: lazy(() => import("./SettingBillingAndPayments")),
    },
    {
      path: RouteEnum.SETTINGS_PASSWORD_AND_SECURITY,
      element: lazy(() => import("./SettingPasswordAndSecurity")),
    },
    {
      path: RouteEnum.SETTINGS_NOTIFICATION,
      element: lazy(() => import("./SettingNotification")),
    },
  ],
  {
    parentPath: RouteEnum.SETTINGS,
  }
);
