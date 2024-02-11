import useAuthUser from "hooks/useAuthUser";
import UserAvatar from "./UserAvatar";

/**
 *
 * @param {import("./UserAvatar").UserAvatarProps} props
 * @returns
 */
function AuthUserAvatar(props) {
  const authUser = useAuthUser();
  return (
    <UserAvatar src={authUser?.avatar} {...props}>
      {authUser?.lastname?.slice(0, 1)?.toUpperCase()}
    </UserAvatar>
  );
}

export default AuthUserAvatar;
