import {
  Avatar,
  Button,
  Drawer,
  Icon,
  Paper,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DialogTitleXCloseButton from "common/DialogTitleXCloseButton";
import {
  APP_SIDE_MENU_WIDTH,
  MediaQueryBreakpointEnum,
} from "constants/Global";
import useAuthUser from "hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

import projectDashboardBigPNG from "assets/imgs/project-dashboard-big-image.png";
import projectDashboardAbout1PNG from "assets/imgs/project-dashboard-about-1.png";
import projectDashboardAbout2PNG from "assets/imgs/project-dashboard-about-2.png";
import projectDashboardAbout3PNG from "assets/imgs/project-dashboard-about-3.png";
import projectDashboardAbout4PNG from "assets/imgs/project-dashboard-about-4.png";
import projectDashboardOtherProjects1PNG from "assets/imgs/project-dashboard-other-projects.png";
import projectDashboardShareIconPNG from "assets/imgs/project-dashboard-icon.png";
import useToggle from "hooks/useToggle";
import { useState } from "react";
import { RouteEnum } from "constants/RouteConstants";

function ProjectDashboard(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const authUser = useAuthUser();


  const navigate = useNavigate();

  const [isBuyProject, toggleBuyProject] = useToggle();
  const [selectedTier, setSelectedTier] = useState(0);

  function handleTierSelection(_, value) {
    return setSelectedTier(value);
  }

  const sideMenuInformation = [
    {
      title: "Price",
      value: "$50",
    },
    {
      title: "Delivery Time",
      value: "2 days",
    },
    {
      title: "Number of revisions",
      value: "1",
    },
    {
      title: "Milestone",
      value: "Yes",
    },
    {
      title: "Additional Revision",
      value: "2",
    },
    {
      title: "Review",
      value: "1",
    },
  ];

  const projectDashboardAboutImages = [
    {
      name: projectDashboardAbout1PNG,
    },
    {
      name: projectDashboardAbout2PNG,
    },
    {
      name: projectDashboardAbout3PNG,
    },
    {
      name: projectDashboardAbout4PNG,
    },
  ];

  const checkAuthentication = () => {
    if (!!authUser?.accessToken) return;
    else navigate(RouteEnum.LOGIN);
  };

  const buyProjectContent = (
    <div>
      <ToggleButtonGroup
        color="primary"
        fullWidth
        // orientation="vertical"
        value={selectedTier}
        exclusive
        onChange={handleTierSelection}
      >
        {[{ label: "Basic" }, { label: "Standard" }, { label: "Advance" }].map(
          (tier, index) => (
            <ToggleButton key={index} value={index}>
              {tier?.label}
            </ToggleButton>
          )
        )}
      </ToggleButtonGroup>

      {sideMenuInformation?.map((info, index) => (
        <div key={index} className="flex justify-between my-10">
          <Typography>{info?.title}</Typography>
          <Typography>{info?.value}</Typography>
        </div>
      ))}

      <div className=" flex flex-col items-center gap-3 justify-center ">
        <Button className="w-auto">Buy at $50</Button>
        <Button
          onClick={checkAuthentication}
          className="w-auto"
          variant="outlined"
        >
          Message {authUser?.lastname}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Paper variant="outlined" className="p-4 md:p-6">
        <div className="flex items-center flex-wrap mb-4">
          <Typography variant="h4">Name of the Project</Typography>
          <div className="flex-1" />
          {!ismd && (
            <Button
              startIcon={<Icon>filter_list</Icon>}
              onClick={toggleBuyProject}
            >
              Buy Project
            </Button>
          )}
        </div>
        <div className="flex">
          {ismd && (
            <div className="w-full md:w-1/3 md:pr-6">{buyProjectContent}</div>
          )}
          <div className="w-full md:w-2/3 md:pl-6 md:border-l">
            <div className="">
              <div>
                <Avatar src={authUser?.avatar} className="w-20 h-20" />

                <div className="flex gap-8">
                  <Typography variant="h6">
                    {`${authUser?.firstname} ${authUser?.lastname}`}
                  </Typography>
                  <div className="flex gap-1">
                    <Rating
                      className="text-green-400"
                      name="read-only"
                      max={1}
                      value={1}
                    />
                    <Typography>5.0 (106 reviews)</Typography>
                  </div>
                  <Typography>Expert</Typography>

                  <Typography></Typography>
                </div>
              </div>
              <Typography variant="h5" className="my-4">
                I am great at designing a responsive website
              </Typography>
              <div className="mt-8">
                <img src={projectDashboardBigPNG} />
              </div>
              <div className="flex flex-wrap gap-4">
                {projectDashboardAboutImages?.map((img, index) => (
                  <div key={index} className="mt-4 w-full md:w-44">
                    <img
                      className="w-full h-36"
                      src={img?.name}
                      alt="project dashboard about"
                    />
                  </div>
                ))}
              </div>
              <Typography className="my-6" variant="h4">
                About this Project
              </Typography>
              <Typography className="my-5">
                Welcome to Pamelathedesigner{" "}
              </Typography>
              <Typography className="my-5">
                Looking for a custom logo design for your business? I'm a
                professional logo designer & creative geek, working with small
                businesses and startups for the last 10 years for their branding
                projects and logo designing requirements.
              </Typography>
              <Typography className="my-5">
                Let me create a logo that will stand out and your clients will
                notice.
              </Typography>

              <Typography variant="h5" className="font-semibold">
                PACKAGE INCLUDES{" "}
              </Typography>
              <ul>
                <ol>1) Custom Logo Design Concept (ORIGINAL DESIGN)</ol>
                <ol>2) Revisions on logo design </ol>
                <ol>3) Logo sample provided within 6 business days</ol>
              </ul>

              <div className="mt-8 flex gap-6 w-1/2">
                <div className="">
                  <Typography className="font-semibold">Logo Style</Typography>
                  <Typography>Minimalist, Monogram, Wordmark</Typography>
                </div>

                <div>
                  <Typography className="font-semibold">File Format</Typography>
                  <Typography>AI, JPG, PDF, PNG</Typography>
                </div>
              </div>

              <div className="my-8">
                <Typography variant="h5" className="font-semibold">
                  Project CheckList
                </Typography>

                <div className="flex gap-5 my-4">
                  <div className="w-10 flex justify-center items-center h-10 bg-primary-main text-white rounded-full">
                    <Typography variant="h5">1</Typography>
                  </div>
                  <Typography>
                    Purchase Project and Send Requirements where needed
                  </Typography>
                </div>

                <div className="flex gap-5 my-4">
                  <div className="w-10 flex justify-center items-center h-10 bg-primary-main text-white rounded-full">
                    <Typography variant="h5">2</Typography>
                  </div>
                  <div>
                    <Typography>Project gets worked on</Typography>
                    <Typography>
                      Payment is only made when you have satified it
                    </Typography>
                  </div>
                </div>

                <div className="flex gap-5 my-4">
                  <div className="w-10 flex justify-center items-center h-10 bg-primary-main text-white rounded-full">
                    <Typography variant="h5">3</Typography>
                  </div>
                  <div>
                    <Typography>Review work and make payment</Typography>
                    <Typography>
                      Payment is only made when you have satified it
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="my-8">
                <Typography variant="h5" className="my-4">
                  About {`${authUser?.firstname} ${authUser?.firstname}`}{" "}
                </Typography>
                <Avatar src={authUser.avatar} className="h-20 w-20" />
                <div className="flex gap-4 text-primary-main">
                  <div className="flex gap-2  cursor-pointer items-center">
                    <Typography>View portfolio</Typography>
                    <img
                      className="w-2 h-2"
                      src={projectDashboardShareIconPNG}
                    />
                  </div>
                  <div className="flex gap-2 items-center cursor-pointer">
                    <Typography>View profile</Typography>
                    <img
                      className="w-2 h-2"
                      src={projectDashboardShareIconPNG}
                    />
                  </div>
                </div>
                <Typography className="my-4" variant="h6">
                  UI/UX||Graphics||Data Analyst||Content Creator||CV Writer||
                </Typography>
                <Typography>Lagos, Nigeria - 7:49 pm local time</Typography>
                <Typography className="my-8" variant="h4">
                  Summary
                </Typography>
                <Typography>
                  <Typography class="my-2">
                    Hi, Thanks for coming to my page 😊{" "}
                  </Typography>

                  <Typography class="my-2">
                    I am a lawyer with skills in Data analysis, graphic design
                    and experience in building end to end UIUX designs for
                    digital products.
                  </Typography>
                  <Typography class="my-2">My expertise include:</Typography>
                  <ul>
                    <li>Wireframing</li>
                    <li>User Experience Design</li>
                    <li>Figma Prototyping</li>
                    <li>Adobe Photoshop and Branding</li>
                  </ul>

                  <Typography class="my-2">
                    When it comes analysing data, I have expertise in the use of
                    Excel, PowerBi, and PosgreSQL.
                  </Typography>
                  <Typography class="my-2">
                    I also write projects, design and write the best resume.
                  </Typography>

                  <Typography class="my-2">
                    I speak and write two native languages in Nigeria: Igbo and
                    Hausa.
                  </Typography>
                </Typography>
              </div>

              <div>
                <Typography className="my-4 font-semibold">
                  Other Projects by Sky
                </Typography>

                <div className="flex gap-6 flex-wrap">
                  <div className="w-full md:w-60 rounded-2xl bg-primary-main text-white ">
                    <div className="flex gap-3 md:block">
                      <div className="h-44 relative">
                        <img
                          className=" h-full w-full w-min-1/2"
                          src={projectDashboardOtherProjects1PNG}
                        />
                      </div>
                      <Typography className="mt-2 md:px-3">
                        I design responsive Mobile Apps and Websites
                      </Typography>
                    </div>
                    <div className="w-full md:w-60  text-[11px]">
                      <div className="px-3 border-b-2">
                        <div className="flex items-center my-2 justify-between">
                          <Typography>From $25</Typography>
                          <Typography className="">2 day delivery</Typography>
                        </div>
                      </div>
                      <div class="flex p-3 justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <Avatar className="h-7 w-7" />
                          <Typography>Pamela Ohaeri </Typography>
                        </div>
                        <div class="flex gap-2">
                          <Rating
                            className="text-green-500"
                            value={1}
                            max={1}
                          />
                          <Typography>4.5 (564)</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-60 rounded-2xl bg-primary-main text-white ">
                    <div className="flex gap-3 md:block">
                      <div className="h-44 relative">
                        <img
                          className=" h-full w-full w-min-1/2"
                          src={projectDashboardOtherProjects1PNG}
                        />
                      </div>
                      <Typography className="mt-2 md:px-3">
                        I design responsive Mobile Apps and Websites
                      </Typography>
                    </div>
                    <div className="w-full md:w-60  text-[11px]">
                      <div className="px-3 border-b-2">
                        <div className="flex items-center my-2 justify-between">
                          <Typography>From $25</Typography>
                          <Typography className="">2 day delivery</Typography>
                        </div>
                      </div>
                      <div class="flex p-3 justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <Avatar className="h-7 w-7" />
                          <Typography>Pamela Ohaeri </Typography>
                        </div>
                        <div class="flex gap-2">
                          <Rating
                            className="text-green-500"
                            value={1}
                            max={1}
                          />
                          <Typography>4.5 (564)</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <img
                    className="w-1/4 cursor-pointer"
                    src={projectDashboardOtherProjects1PNG}
                  />
                  <img
                    className="w-1/4 cursor-pointer"
                    src={projectDashboardOtherProjects1PNG}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
      {!ismd && (
        <Drawer
          open={isBuyProject}
          anchor="right"
          PaperProps={{
            className: "flex flex-col",
            style: { width: APP_SIDE_MENU_WIDTH },
          }}
        >
          <DialogTitleXCloseButton onClose={toggleBuyProject} className="mb-4">
            Buy Project
          </DialogTitleXCloseButton>
          <div className="flex-1 min-h-0 overflow-auto px-4">
            {buyProjectContent}
          </div>
        </Drawer>
      )}
    </>
  );
}

export default ProjectDashboard;
