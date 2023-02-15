import {} from "@mui/material";
import { RouteEnum } from "constants/RouteConstants";
import { useNavigate } from "react-router-dom";
import ProfileUpdateTipsXAvoidScaffold from "./ProfileUpdateTipsXAvoidScaffold";

function ProfileUpdateAvoid(props) {
  const navigate = useNavigate();

  return (
    <ProfileUpdateTipsXAvoidScaffold
      onBackClick={() => navigate(RouteEnum.PROFILE_UPDATE_TIPS)}
      onContinueClick={() => navigate(RouteEnum.PROFILE_UPDATE)}
      title="Avoid the following"
      data={[
        {
          description:
            "Providing any misleading or inaccurate information about your identity",
          icon: "person_remove",
        },
        {
          description:
            "Requesting to take communication and payment outside of Softwrk",
          icon: "chat",
        },
        {
          description:
            "Opening duplicate accounts. Remember, you can always create more Gigs",
          icon: "post_add",
        },
      ]}
    />
  );
}

export default ProfileUpdateAvoid;
