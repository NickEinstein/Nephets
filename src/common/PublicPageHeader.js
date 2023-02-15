import {
  AppBar,
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
  useMediaQuery,
} from "@mui/material";
import { MediaQueryBreakpointEnum } from "constants/Global";
import useToggle from "hooks/useToggle";
import { Link, matchPath, useLocation, useMatch } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import Logo from "./Logo";
import SearchTextField from "./SearchTextField";
import LinkButton from "./LinkButton";
import "./PublicPageHeader.css";
import clsx from "clsx";
import useResizeObserver from "hooks/useResizeObserver";
import { useMemo, useRef, useState } from "react";
import usePopover from "hooks/usePopover";

/**
 *
 * @param {PublicPageHeaderProps} props
 */
function PublicPageHeader(props) {
  const { renderSubHeader, className, position, ...rest } = props;
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);
  const [isDrawer, toggleDrawer] = useToggle();

  const subHeader = renderSubHeader?.();

  const appBarRef = useRef(/** @type {HTMLElement}*/ (null));

  const [appBarRect, setAppBarRect] = useState({ width: 0, height: 0 });

  useResizeObserver(() => {
    if (appBarRef.current) {
      setAppBarRect({
        width: appBarRef.current.offsetWidth,
        height: appBarRef.current.offsetHeight,
      });
    }
  }, appBarRef);

  return (
    <>
      <AppBar
        ref={appBarRef}
        className={clsx("PublicPageHeader", className)}
        position={position}
        {...rest}
      >
        <Container>
          <Toolbar disableGutters className="items-center gap-2">
            {islg ? (
              <>
                <Link to={RouteEnum.HOME}>
                  <Logo />
                </Link>
                <div className="flex-1" />
                <List dense className="flex">
                  {LINKS.map((link, index) => (
                    <PublicPageHeaderLinkTop {...{ key: index, link, index }} />
                  ))}
                </List>
              </>
            ) : (
              <IconButton color="inherit" onClick={toggleDrawer}>
                <Icon>menu</Icon>
              </IconButton>
            )}
            <div className="flex-1" />
            <SearchTextField size="small" />
            <LinkButton variant="text" to={RouteEnum.LOGIN}>
              Login
            </LinkButton>
            <LinkButton to={RouteEnum.SIGNUP}>Sign up</LinkButton>
          </Toolbar>
          {subHeader}
        </Container>
      </AppBar>
      {["fixed", "absolute"].includes(position) && <div style={appBarRect} />}
      {!islg && (
        <Drawer
          variant="temporary"
          open={isDrawer}
          onClose={toggleDrawer}
          PaperProps={{ style: { width: DRAWER_WIDTH } }}
        >
          <Toolbar>
            <Logo />
          </Toolbar>
          <List>
            {LINKS.map((link, index) => (
              <PublicPageHeaderLinkSide {...{ key: index, link, index }} />
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
}

PublicPageHeader.defaultProps = {
  position: "fixed",
};

export default PublicPageHeader;

function PublicPageHeaderLinkTop({ link, index }) {
  const { label, to, children } = link;

  const isGroup = !!children;

  const match = useMatch(to || "/");

  const childrenPopover = usePopover();

  return (
    <>
      <ListItemButton
        key={index}
        className={clsx(
          "rounded"
          // !!match && "bg-primary-main text-primary-contrastText"
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
                className=""
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
                  secondary={description}
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
    if (children) {
      for (const child of children) {
        result = matchPath({ path: child.to + "/*" }, location.pathname);
        if (result) {
          return result;
        }
      }
      return result;
    }
  }, [children, location.pathname]);

  // const match = useMatch(to || "/");

  const [isSubMenu, toggleSubMenu] = useToggle();

  return (
    <>
      <ListItemButton
        key={index}
        className={clsx(
          "rounded"
          // !!match && "bg-primary-main text-primary-contrastText"
        )}
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
                    secondary={description}
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

const LINKS = [
  {
    label: "Find Talents",
    children: [
      {
        label: "Post a job and hire a pro",
        description: "Talent Marketplace",
        to: RouteEnum.SIGNUP,
      },
      {
        label: "Browse and buy projects",
        description: "Project Catalogue",
        to: RouteEnum.SIGNUP,
      },
      {
        label: "Let us find you the right talent",
        description: "Talent Scout",
        to: RouteEnum.SIGNUP,
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Ways to earn",
        description: "Learn why Softwrk has the right oppotunities for you.",
        to: RouteEnum.SIGNUP,
      },
      {
        label: "Find work for your skills",
        description: "Explore the kind of work available in your field.",
        to: RouteEnum.SIGNUP,
      },
      {
        label: "Find ways to promote yourself",
        description: "Show clients you are the one they want.",
        to: RouteEnum.SIGNUP,
      },
    ],
  },
  {
    label: "Why Softwrk",
    children: [
      {
        label: "Success Stories",
        description: "Discover how teams work strategically and grow together.",
        to: RouteEnum.SIGNUP,
      },
      {
        label: "Reviews",
        description: "See what it is like to collaborate on Softwrk.",
        to: RouteEnum.SIGNUP,
      },
      {
        label: "How to hire",
        description: "Learn about the different ways to get work done",
        to: RouteEnum.SIGNUP,
      },
      {
        label: "How to find work",
        description: "Learn about how to grow your independent career.",
        to: RouteEnum.SIGNUP,
      },
    ],
  },
  { label: "Explore", to: RouteEnum.SIGNUP },
  // { label: "About Us", to: RouteEnum.HOME },
  // { label: "Messages", to: RouteEnum.HOME },
];

const DRAWER_WIDTH = 256;

/**
 * @typedef {{
 * renderSubHeader: ()  => import("react").ReactNode;
 * } & import("@mui/material").AppBarProps} PublicPageHeaderProps
 */
