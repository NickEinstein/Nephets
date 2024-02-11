import {
  ButtonBase,
  Icon,
  ListItemButton,
  Popover,
  Typography,
} from "@mui/material";
import { RouteEnum } from "constants/RouteConstants";
import useAuthUser from "hooks/useAuthUser";
import useLogout from "hooks/useLogout";
import usePopover from "hooks/usePopover";
import { Link } from "react-router-dom";
import UserAvatar from "./AuthUserAvatar";

function AuthUserHeaderAvatar(params) {
  const infoPopover = usePopover();

  const authUser = useAuthUser();

  const { logout } = useLogout();

  function handleLogout() {
    infoPopover.togglePopover();
    logout();
  }

  return (
    <>
      <ButtonBase className="" onClick={infoPopover.togglePopover}>
        <UserAvatar />
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
          <UserAvatar className="w-20 h-20 mb-2" />
          <Typography className="text-center font-semibold">
            {authUser?.firstname} {authUser?.lastname}
            {/* {authUser?.username} */}
          </Typography>
          <Typography variant="body2" className="text-center whitespace-nowrap">
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
    </>
  );
}

export default AuthUserHeaderAvatar;
