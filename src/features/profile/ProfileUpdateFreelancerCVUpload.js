import { Button, Icon, Typography } from "@mui/material";
import okHand from "assets/imgs/ok-hand.png";

function ProfileUpdateFreelancerCVUpload({ stepper }) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 max-w-xl mx-auto">
      <Typography variant="h3" color="primary" className="text-center">
        Let us get to know you
      </Typography>
      <Typography variant="h6" className="text-center">
        This will only take a few minutes
      </Typography>
      <img alt="okHand" className="h-40 my-4" src={okHand} />
      <Typography variant="h6" className="text-center">
        We need to know about your education, experience and skills, you can
        choose to import your information And you can always edit it.
      </Typography>
      <div className="grid grid-cols-1 gap-4">
        {[
          {
            children: "Upload saved LinkedIn profile PDF",
            icon: "backup",
            disabled: true,
          },
          {
            children: "Upload your resume",
            icon: "upload_file",
            disabled: true,
          },
          {
            children: "Fill it manually",
            icon: "article",
            onClick: () => stepper.nextStep(),
          },
        ].map(({ children, icon, disabled }, index) => (
          <Button
            key={index}
            startIcon={<Icon>{icon}</Icon>}
            disabled={disabled}
          >
            {children}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ProfileUpdateFreelancerCVUpload;
