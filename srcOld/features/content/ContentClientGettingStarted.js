import { Typography } from "@mui/material";
import women from "assets/imgs/women.png";
import LinkButton from "common/LinkButton";
import { RouteEnum } from "constants/RouteConstants";

function ContentClientGettingStarted(params) {
  return (
    <div className="flex flex-col-reverse lg:flex-row my-4 lg:my-16 lg:space-x-8 text-primary-dark">
      <div className="space-y-10 mt-10">
        <Typography variant="h4" className="font-bold">
          Thousands of Talents waiting for you
        </Typography>
        <Typography className="font-bold">
          We make it easy for you to connect with high-quality startup talent
          who are ready for a new challenge. Start sourcing today:
        </Typography>
        <div>
          <Typography className="font-bold">1. Set up your account</Typography>
          <Typography className="font-bold">2. Publish your jobs</Typography>
        </div>

        <div className="max-w-xs flex items-center justify-between">
          <LinkButton size="large" to={RouteEnum.HOW_IT_WORKS}>
            Lets get started
          </LinkButton>
          <Typography className="font-bold">It takes five minutes!</Typography>
        </div>
      </div>
      <div>
        <img src={women} alt="img" className="mx-auto" />
      </div>
    </div>
  );
}

export default ContentClientGettingStarted;
