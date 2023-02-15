import {} from "@mui/material";
import { RouteEnum } from "constants/RouteConstants";
import { useNavigate } from "react-router-dom";
import ProfileUpdateTipsXAvoidScaffold from "./ProfileUpdateTipsXAvoidScaffold";

function ProfileUpdateTip(props) {
  const navigate = useNavigate();
  return (
    <ProfileUpdateTipsXAvoidScaffold
      onBackClick={() => navigate(RouteEnum.HOW_IT_WORKS)}
      onContinueClick={() => navigate(RouteEnum.PROFILE_UPDATE_AVOID)}
      title="Tips on what makes a grea profile"
      data={[
        {
          description:
            "Put a face to your name! Upload a profile picture clearly shows your face",
          icon: "person_add_alt",
        },
        {
          description:
            "A complete profileee converts more, so take your time and create a perfect profile",
          icon: "post_add",
        },
        {
          description:
            "Accurately describe your professional skills to help you get more work",
          icon: "format_list_numbered",
        },
      ]}
    />
  );
}

export default ProfileUpdateTip;
