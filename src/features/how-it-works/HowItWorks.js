import { useMemo, useRef, useState } from "react";
import { ButtonBase, Icon, IconButton, Paper, Typography } from "@mui/material";
import VideoPreviewer from "common/VideoPreviewer";
import clsx from "clsx";
import HowItWorksSection from "./HowItWorksSection";
import UserApi from "apis/UserApi";
import { UserTypeEnum } from "constants/Global";
import FreelancerUserCard from "common/FreelancerUserCard";
import HowitWorksRegisterPng from "assets/imgs/how-it-works-register.png";
import HowitWorksOrderPng from "assets/imgs/how-it-works-order.png";
import HowitWorksDeliverPng from "assets/imgs/how-it-works-deliver.png";
import HowitWorksGetPaidPng from "assets/imgs/how-it-works-get-paid.png";
import HowitWorksSearchTalentsPng from "assets/imgs/how-it-works-search-talents.png";
import HowitWorksCreateProjectPng from "assets/imgs/how-it-works-create-project.png";
import { generatePath, Link, useSearchParams } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import { ProfileViewModeEnum } from "features/profile/ProfileConstants";
import LinkButton from "common/LinkButton";
import useAuthUser from "hooks/useAuthUser";
import { urlSearchParamsExtractor } from "utils/URLUtils";

function HowItWorks(props) {
  const [isPausedVideo, setPausedVideo] = useState(true);

  const authUser = useAuthUser();

  const ceoVideoRef = useRef(null);

  const [searchParam] = useSearchParams();

  const { type } = urlSearchParamsExtractor(searchParam, {
    type: authUser?.type || UserTypeEnum.FREELANCER,
  });

  const isClient = type === UserTypeEnum.CLIENT;
  const isFreelancer = type === UserTypeEnum.FREELANCER;

  const [nextStep, setNextStep] = useState(-1);

  const freelancersQueryResult = UserApi.useGetUsersQuery(
    useMemo(
      () => ({ params: { type: UserTypeEnum.FREELANCER, limit: 8 } }),
      []
    ),
    {
      skip: isFreelancer,
    }
  );

  const freelancers = freelancersQueryResult.data?.data;

  return (
    <>
      <div
        className="border group relative"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <VideoPreviewer
          ref={ceoVideoRef}
          src="https://res.cloudinary.com/dnto1u2qw/video/upload/v1668609350/contents/how-softwrk-work_uzgko8.mp4"
          className="w-full h-full"
          onEnded={() => setPausedVideo(true)}
        />
        <div
          className={clsx(
            "absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-10",
            !isPausedVideo && "hidden group-hover:flex"
          )}
        >
          <div className="flex flex-col items-center text-white">
            <IconButton
              color="inherit"
              onClick={() => {
                if (ceoVideoRef.current?.paused) {
                  ceoVideoRef.current?.play();
                  setPausedVideo(false);
                } else {
                  ceoVideoRef.current?.pause();
                  setPausedVideo(true);
                }
              }}
            >
              <Icon className="text-8xl">
                {isPausedVideo ? "play_circle" : "pause_circle"}
              </Icon>
            </IconButton>
            {isPausedVideo && (
              <Typography
                variant="h3"
                className="text-center font-extrabold text-primary-main"
              >
                Easy Does it at Softwork
              </Typography>
            )}
          </div>
        </div>
      </div>
      {isClient && (
        <HowItWorksSection title="See how our freelancers are doing">
          <div className="flex flex-wrap justify-center gap-8">
            {freelancers?.map((freelancer) => {
              return (
                <FreelancerUserCard
                  key={freelancer?.id}
                  data={freelancer}
                  component={Link}
                  to={generatePath(RouteEnum.PROFILE_DASHBOARD, {
                    id: freelancer?.id,
                  }).concat("?viewMode=", ProfileViewModeEnum.PUBLIC)}
                />
              );
            })}
          </div>
        </HowItWorksSection>
      )}

      <HowItWorksSection title="How It Works" className="bg-gray-50">
        <div className="flex flex-wrap justify-center gap-8">
          {(isClient
            ? [
                {
                  description: "Sign-up on Softwrk",
                  image: HowitWorksRegisterPng,
                },
                {
                  description: "Post a job/invite talents",
                  image: HowitWorksOrderPng,
                },
                {
                  description: "Make Payment",
                  image: HowitWorksGetPaidPng,
                },
                {
                  description: "Get regular updates on job till completion",
                  image: HowitWorksDeliverPng,
                },
                {
                  description:
                    "Upon confirmation by you that work done is satifactory, the freelancer get paid",
                  image: HowitWorksGetPaidPng,
                },
              ]
            : [
                {
                  description: "Register on SoftWrk & List your services",
                  image: HowitWorksRegisterPng,
                },
                {
                  description: "Get an order for a service you offer",
                  image: HowitWorksOrderPng,
                },
                {
                  description: "Deliver on service request",
                  image: HowitWorksDeliverPng,
                },
                {
                  description: "Get paid upon acceptance of job by customer",
                  image: HowitWorksGetPaidPng,
                },
              ]
          ).map(({ description, image }, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center"
              >
                <div className="bg-primary-dark text-primary-contrastText w-14 h-14 flex items-center justify-center rounded-full">
                  <Typography variant="h3">{index + 1}</Typography>
                </div>
                <img alt="description" src={image} className="w-52 h-52" />
                <Typography variant="h6" className="text-center my-4">
                  {description}
                </Typography>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-8 justify-end">
          <LinkButton to={RouteEnum.JOBS_CREATE}>Continue</LinkButton>
        </div>
      </HowItWorksSection>

      {isFreelancer && (
        <HowItWorksSection title="Choose your preferences">
          <div className="flex flex-wrap gap-8 justify-center mb-8">
            {[
              {
                bgColor: "#BF41AB",
                image: HowitWorksSearchTalentsPng,
                title: "Search for opportunities",
                description:
                  "Clients post jobs on our Talent Marketplace: you can browse and bid for them, or get invited by a client.",
              },
              {
                bgColor: "#D1EBFF",
                image: HowitWorksCreateProjectPng,
                title: "Create Project and offer to potential buyers",
                description:
                  "Define your service with prices and timelines on your Project Catalog for clients to buy right away.",
              },
            ].map(({ bgColor, image, title, description }, index) => {
              return (
                <Paper
                  component={ButtonBase}
                  variant="outlined"
                  key={bgColor}
                  style={{ backgroundColor: bgColor }}
                  className={clsx(
                    "w-72 p-4 rounded-lg block text-start relative"
                  )}
                  onClick={() => setNextStep((p) => (p === index ? -1 : index))}
                >
                  <img alt={bgColor} src={image} className="w-full h-48 mb-8" />
                  <Typography variant="h6" className="font-bold mb-4">
                    {title}
                  </Typography>
                  <Typography>{description}</Typography>
                  {nextStep === index && (
                    <div className="absolute top-4 right-4 bg-primary-dark rounded-full w-8 h-8"></div>
                  )}
                </Paper>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            <LinkButton variant="outlined" to={RouteEnum.PROFILE_UPDATE}>
              Skip for now
            </LinkButton>
            {
              [
                <LinkButton to={RouteEnum.JOBS_SEARCH}>
                  Continue to search for jobs
                </LinkButton>,
                <LinkButton to={RouteEnum.PROJECTS_CREATE}>
                  Continue to create profile
                </LinkButton>,
              ][nextStep]
            }
          </div>
        </HowItWorksSection>
      )}
    </>
  );
}

export default HowItWorks;
