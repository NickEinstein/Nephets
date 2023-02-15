import useAuthUser from "hooks/useAuthUser";
import ProfileUpdateClient from "./ProfileUpdateClient";
import ProfileUpdateFreelancer from "./ProfileUpdateFreelancer";

function ProfileUpdate(props) {
  const authUser = useAuthUser();

  const Update = authUser?.isClient
    ? ProfileUpdateClient
    : ProfileUpdateFreelancer;

  return <Update {...{ authUser }} />;
}

export default ProfileUpdate;
