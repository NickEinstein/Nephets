import ProfileUpdateScaffold from "./ProfileUpdateScaffold";
import { Button, Typography } from "@mui/material";

function ProfileUpdateFreelancerSocialAccounts(props) {
  return (
    <ProfileUpdateScaffold
      title="Social Accounts"
      description="Link your social accounts"
    >
      <div className="max-w-xl grid grid-cols-1 gap-4">
        {[{ name: "Google" }, { name: "Facebook" }, { name: "Twitter" }].map(
          ({ name }, index) => (
            <div key={index} className="flex gap-4 justify-between">
              <Typography variant="h6" className="font-bold" color="primary">
                {name}
              </Typography>
              <Button variant="outlined">Connect</Button>
            </div>
          )
        )}
      </div>
    </ProfileUpdateScaffold>
  );
}

export default ProfileUpdateFreelancerSocialAccounts;
