import {
  AppBar,
  ButtonBase,
  Collapse,
  Container,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { MediaQueryBreakpointEnum } from "constants/Global";
import useAuthUser from "hooks/useAuthUser";
import useToggle from "hooks/useToggle";
import { Link, matchPath, useLocation, useMatch } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import useLogout from "hooks/useLogout";
import usePopover from "hooks/usePopover";
import Logo from "./Logo";
import SearchTextField from "./SearchTextField";
import AuthUserAvatar from "./AuthUserAvatar";
import clsx from "clsx";
import "./ProtectedPageHeader.css";
import { useMemo, useRef, useState } from "react";
import useResizeObserver from "hooks/useResizeObserver";

function ProtectedPageHeader(props) {
  const {
    renderSubHeader,
    position,
    hideRectSpacing,
    onRectChange,
    className,
    ...rest
  } = props;
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const [isDrawer, toggleDrawer] = useToggle();
  const infoPopover = usePopover();

  const authUser = useAuthUser();

  const { logout } = useLogout();

  function handleLogout() {
    infoPopover.togglePopover();
    logout();
  }

  const subHeader = renderSubHeader?.();

  const appBarRef = useRef(/** @type {HTMLElement}*/ (null));

  const [appBarRect, setAppBarRect] = useState({ width: 0, height: 0 });

  const LINKS = useMemo(() => getLinks({ authUser }), [authUser]);

  useResizeObserver(() => {
    if (appBarRef.current) {
      const newRect = {
        width: appBarRef.current.offsetWidth,
        height: appBarRef.current.offsetHeight,
      };
      onRectChange?.(newRect);
      setAppBarRect(newRect);
    }
  }, appBarRef);

  return (
    <>
      <AppBar
        ref={appBarRef}
        variant="outlined"
        color="default"
        position={position}
        className={clsx("ProtectedPageHeader", className)}
        {...rest}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="items-center">
            {!ismd && (
              <IconButton color="inherit" onClick={toggleDrawer}>
                <Icon>menu</Icon>
              </IconButton>
            )}
            <Link to={RouteEnum.DASHBOARD}>
              <Logo />
            </Link>
            <SearchTextField size="small" className="ml-4" />
            <div className="flex-1" />
            {ismd && (
              <List dense className="flex">
                {LINKS.map((link, index) => (
                  <PublicPageHeaderLinkTop {...{ key: index, link, index }} />
                ))}
              </List>
            )}
            <div className="flex-1" />
            <ButtonBase className="" onClick={infoPopover.togglePopover}>
              <AuthUserAvatar />
            </ButtonBase>
            <Popover
              open={infoPopover.isOpen}
              anchorEl={infoPopover.anchorEl}
              onClose={infoPopover.togglePopover}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{ className: "w-56" }}
            >
              <div className="p-4 flex flex-col items-center">
                <AuthUserAvatar className="w-20 h-20 mb-2" />
                <Typography className="text-center font-semibold">
                  {authUser?.firstname} {authUser?.lastname}
                  {/* {authUser?.username} */}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-center whitespace-nowrap"
                >
                  {authUser.type}
                </Typography>
              </div>
              <div className="py-2">
                {[
                  {
                    icon: "person",
                    children: "Profile",
                    component: Link,
                    to: RouteEnum.PROFILE,
                  },
                  ...(authUser?.isFreelancer
                    ? [
                        {
                          icon: "person",
                          children: "My Projects",
                          component: Link,
                          to: RouteEnum.PROJECTS_FREELANCER_DASHBOARD,
                        },
                      ]
                    : []),
                  {
                    icon: "settings",
                    children: "Settings",
                    component: Link,
                    to: RouteEnum.SETTINGS,
                  },
                  { icon: "logout", children: "Logout", onClick: handleLogout },
                ].map(({ icon, children, onClick, ...rest }, index) => (
                  <ListItemButton
                    key={index}
                    className=""
                    onClick={() => {
                      infoPopover.togglePopover();
                      onClick?.();
                    }}
                    {...rest}
                  >
                    <Icon>{icon}</Icon>
                    <Typography className="ml-4">{children}</Typography>
                  </ListItemButton>
                ))}
              </div>
            </Popover>
          </Toolbar>
          {subHeader}
        </Container>
      </AppBar>
      {!hideRectSpacing && ["fixed", "absolute"].includes(position) && (
        <div style={appBarRect} />
      )}
      {!ismd && (
        <Drawer
          variant="temporary"
          open={isDrawer}
          onClose={toggleDrawer}
          PaperProps={{ style: { width: DRAWER_WIDTH } }}
        >
          <Toolbar />
          <List className="text-primary-main">
            {LINKS.map((link, index) => (
              <PublicPageHeaderLinkSide {...{ key: index, link, index }} />
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
}

ProtectedPageHeader.defaultProps = {
  position: "fixed",
  hideRectSpacing: false,
};

export default ProtectedPageHeader;

function PublicPageHeaderLinkTop({ link, index }) {
  const { label, to, children } = link;

  const isGroup = !!children;

  const location = useLocation();

  const match = useMemo(() => {
    let result = null;
    const _children = isGroup ? children : [link];
    for (const child of _children) {
      result = matchPath({ path: child.to + "/*" }, location.pathname);
      if (result) {
        break;
      }
    }
    return result;
  }, [children, isGroup, link, location.pathname]);

  const childrenPopover = usePopover();

  return (
    <>
      <ListItemButton
        key={index}
        className={clsx(
          "rounded",
          !!match && "bg-primary-main text-primary-contrastText"
        )}
        {...(isGroup
          ? {
              onClick: childrenPopover.togglePopover,
              // onMouseEnter: childrenPopover.togglePopover,
              // onMouseLeave: () => childrenPopover.togglePopover(),
            }
          : { component: Link, to })}
      >
        <ListItemText primary={label} classes={{ primary: "font-semibold" }} />
        {isGroup && (
          <>
            <Icon>
              {childrenPopover.isOpen ? "expand_less" : "expand_more"}
            </Icon>
          </>
        )}
      </ListItemButton>
      {isGroup && (
        <Popover
          open={childrenPopover.isOpen}
          anchorEl={childrenPopover.anchorEl}
          onClose={childrenPopover.togglePopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          // PaperProps={{ className: "w-36" }}
        >
          {children?.map(
            (
              { icon, children, label, description, onClick, to, ...rest },
              index
            ) => (
              <ListItemButton
                key={index}
                selected={match?.pathname === to}
                onClick={() => {
                  childrenPopover.togglePopover();
                  onClick?.();
                }}
                component={Link}
                to={to}
                {...rest}
              >
                <ListItemText
                  primary={label}
                  // secondary={description}
                  classes={{ primary: "font-semibold" }}
                />
              </ListItemButton>
            )
          )}
        </Popover>
      )}
    </>
  );
}

function PublicPageHeaderLinkSide({ link, index }) {
  const { label, to, children } = link;

  const isGroup = !!children;

  const location = useLocation();

  const match = useMemo(() => {
    let result = null;
    const _children = isGroup ? children : [link];
    for (const child of _children) {
      result = matchPath({ path: child.to + "/*" }, location.pathname);
      if (result) {
        break;
      }
    }
    return result;
  }, [children, isGroup, link, location.pathname]);

  const [isSubMenu, toggleSubMenu] = useToggle();

  return (
    <>
      <ListItemButton
        key={index}
        className={clsx(!!match && "bg-primary-main text-primary-contrastText")}
        {...(isGroup ? { onClick: toggleSubMenu } : { component: Link, to })}
      >
        <ListItemText primary={label} classes={{ primary: "font-semibold" }} />
        {isGroup && (
          <ListItemSecondaryAction>
            <Icon>{isSubMenu ? "expand_less" : "expand_more"}</Icon>
          </ListItemSecondaryAction>
        )}
      </ListItemButton>
      {isGroup && (
        <Collapse in={isSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children?.map(
              (
                { icon, children, label, description, onClick, to, ...rest },
                index
              ) => (
                <ListItemButton
                  key={index}
                  selected={match?.pathname === to}
                  className="px-6"
                  onClick={() => {
                    toggleSubMenu();
                    onClick?.();
                  }}
                  component={Link}
                  to={to}
                  {...rest}
                >
                  <ListItemText
                    primary={label}
                    // secondary={description}
                    classes={{ primary: "font-semibold" }}
                  />
                </ListItemButton>
              )
            )}
          </List>
        </Collapse>
      )}
    </>
  );
}

function getLinks({ authUser }) {
  return [
    ...(authUser?.isFreelancer
      ? [
          {
            label: "Find Work",
            children: [
              {
                label: "Find Work",
                description: "Talent Marketplace",
                to: RouteEnum.JOBS_SEARCH,
              },
              {
                label: "Saved Jobs",
                description: "Project Catalogue",
                to: RouteEnum.JOBS_SAVED,
              },
              {
                label: "Proposals",
                description: "Talent Scout",
                to: RouteEnum.JOBS_PROPOSALS,
              },
              {
                label: "Profile",
                description: "Talent Scout",
                to: RouteEnum.PROFILE,
              },
              {
                label: "My Stats",
                description: "Talent Scout",
                to: RouteEnum.PROFILE_STATS,
              },
              {
                label: "My Projects",
                description: "Talent Scout",
                to: RouteEnum.PROJECTS_FREELANCER_DASHBOARD,
              },
            ],
          },
        ]
      : []),
    ...(authUser?.isClient
      ? [
          {
            label: "Talents",
            children: [
              // {
              //   label: "Discover",
              //   description: "Talent Marketplace",
              //   to: RouteEnum.HOME,
              // },
              {
                label: "Your Hires",
                description: "See list oof freelancers you have hired on all jobs",
                to: RouteEnum.JOBS_CLIENT_HIRES,
              },
              // {
              //   label: "Company Hires",
              //   description: "Talent Scout",
              //   to: RouteEnum.HOME,
              // },
              // {
              //   label: "BYO Talents",
              //   description: "Talent Scout",
              //   to: RouteEnum.PROFILE,
              // },
              {
                label: "Recently Viewed",
                description: "Talent Scout",
                to: RouteEnum.PROFILE_FREELANCERS_RECENTLY_VIEWED,
              },
              {
                label: "Saved Talents",
                description: "Talent Scout",
                to: RouteEnum.PROFILE_FREELANCERS_SAVED,
              },
            ],
          },
        ]
      : []),
    {
      label: "My Jobs",
      children: [
        ...(authUser?.isFreelancer
          ? [
              {
                label: "Active Contracts",
                description:
                  "Learn why Softwrk has the right oppotunities for you.",
                to: RouteEnum.JOBS_CONTRACTS,
              },
              {
                label: "All Contracts",
                description:
                  "Learn why Softwrk has the right oppotunities for you.",
                to: RouteEnum.JOBS_CONTRACTS,
              },
              // {
              //   label: "Work Diary",
              //   description:
              //     "Learn why Softwrk has the right oppotunities for you.",
              //   to: RouteEnum.HOME,
              // },
            ]
          : []),
        ...(authUser?.isClient
          ? [
              {
                label: "My Jobs",
                description:
                  "Learn why Softwrk has the right oppotunities for you.",
                to: RouteEnum.JOBS_CLIENT_DASHBOARD,
              },
              {
                label: "All Job Post",
                description:
                  "Learn why Softwrk has the right oppotunities for you.",
                to: RouteEnum.JOBS_CLIENT_POSTS,
              },
              {
                label: "All Contracts",
                description:
                  "Learn why Softwrk has the right oppotunities for you.",
                to: RouteEnum.JOBS_CONTRACTS,
              },
              // {
              //   label: "Bring your own Talents",
              //   description:
              //     "Learn why Softwrk has the right oppotunities for you.",
              //   to: RouteEnum.HOME,
              // },
              {
                label: "Post a Job",
                description:
                  "Learn why Softwrk has the right oppotunities for you.",
                to: RouteEnum.JOBS_CLIENT_POSTS_ADD,
              },
              // {
              //   label: "Any Hire",
              //   description:
              //     "Learn why Softwrk has the right oppotunities for you.",
              //   to: RouteEnum.HOME,
              // },
            ]
          : []),
      ],
    },
    {
      label: "Reports",
      children: [
        ...(authUser?.isFreelancer
          ? [
              // {
              //   label: "Overview",
              //   description:
              //     "Discover how teams work strategically and grow together.",
              //   to: RouteEnum.REPORTS_OVERVIEW,
              // },
              // {
              //   label: "My Reports",
              //   description: "See what it is like to collaborate on Softwrk.",
              //   to: RouteEnum.REPORTS_SUMMARY,
              // },
              {
                label: "Billings & Earnings",
                description: "Learn about the different ways to get work done",
                to: RouteEnum.REPORTS_BILLINGS_AND_EARNINGS,
              },
              // {
              //   label: "Connect History",
              //   description: "Learn about how to grow your independent career.",
              //   to: RouteEnum.HOME,
              // },
              {
                label: "Transaction History",
                description: "Learn about how to grow your independent career.",
                to: RouteEnum.REPORTS_TRANSACTIONS,
              },
              // {
              //   label: "Certificate of Earnings",
              //   description: "Learn about how to grow your independent career.",
              //   to: RouteEnum.HOME,
              // },
            ]
          : []),
        ...(authUser?.isClient
          ? [
              // {
              //   label: "Weekly Summary",
              //   description:
              //     "Discover how teams work strategically and grow together.",
              //   to: RouteEnum.HOME,
              // },
              {
                label: "Transaction History",
                description: "Learn about how to grow your independent career.",
                to: RouteEnum.REPORTS_TRANSACTIONS,
              },
              {
                label: "Budgets",
                description: "Learn about how to grow your independent career.",
                to: RouteEnum.REPORTS_BUDGETS,
              },
            ]
          : []),
      ],
    },
    { label: "Messages", to: RouteEnum.MESSAGES },
  ];
}

const DRAWER_WIDTH = 256;

/**
 * @typedef {{
 * renderSubHeader: ()  => import("react").ReactNode;
 * } & import("@mui/material").AppBarProps} PublicPageHeaderProps
 */
