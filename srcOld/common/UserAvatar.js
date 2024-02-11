import { Avatar } from "@mui/material";

/**
 *
 * @param {UserAvatarProps} props
 * @returns
 */
function UserAvatar(props) {
  return <Avatar {...props} />;
}

export default UserAvatar;

/**
 * @typedef {import("@mui/material").AvatarProps} UserAvatarProps
 */
