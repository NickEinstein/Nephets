import { Button, Icon, Typography } from "@mui/material";

function ProfileUpdateTipsXAvoidScaffold({
  title,
  data,
  onBackClick,
  onContinueClick,
}) {
  return (
    <div>
      <Typography variant="h3" color="primary" className="text-center">
        {title}
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
        {data?.map(({ description, icon }, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <div className="bg-primary-main text-primary-contrastText w-14 h-14 flex items-center justify-center rounded-full">
              <Typography variant="h3">{index + 1}</Typography>
            </div>
            <Typography variant="h6" className="text-center my-4">
              {description}
            </Typography>
            {/* <img alt="description" src={image} /> */}
            <Icon style={{ fontSize: 60 }}>{icon}</Icon>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-4 flex-wrap">
        <Button variant="outlined" onClick={onBackClick} size="large">
          Back
        </Button>
        <Button size="large" onClick={onContinueClick}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default ProfileUpdateTipsXAvoidScaffold;
