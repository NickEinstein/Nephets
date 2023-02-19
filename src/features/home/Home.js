import HomeSection from "./HomeSection";
import {
  Typography,
  Container,
  Toolbar,
  Tabs,
  Tab,
  Collapse,
  Fade,
  Paper,
  Icon,
  Button,
} from "@mui/material";
import LinkButton from "common/LinkButton";
import PublicPageHeader from "common/PublicPageHeader";
import company1 from "assets/imgs/company1.png";
import company2 from "assets/imgs/company2.png";
import company3 from "assets/imgs/company3.jpeg";
import webDesign from "assets/imgs/popular-services-webdesign.png";
import mobileDev from "assets/imgs/popular-services-mobiledev.png";
import accounting from "assets/imgs/popular-services-accounting.png";
import clientImage from "assets/imgs/home-clients-image.png";
import freelancer from "assets/imgs/home-freelancer-image.png";
import headerImage from "assets/imgs/home-header-image.png";
import HomeLillianJpeg from "assets/imgs/home-lillian.jpeg";
import LadyInBlackImage from "assets/imgs/home-lady-in-black.png";
import ManInBlackImage from "assets/imgs/home-man-in-black.png";
import WomanInRedImage from "assets/imgs/home-woman-in-red-image.png";
import ManInDreadsImage from "assets/imgs/home-boy-with-dreads.png";
import dataEntry from "assets/imgs/popular-services-dataEntry.png";
import PageFooter from "common/PageFooter";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./HomeTopSectionBackgroundColor.css";
import CategoryApi from "apis/CategoryApi";
import useStepper from "hooks/useStepper";
import useDataRef from "hooks/useDataRef";
import VideoPreviewer from "common/VideoPreviewer";
import { RouteEnum } from "constants/RouteConstants";
import { UserTypeEnum } from "constants/Global";
import ProjectApi from "apis/ProjectApi";
import ProjectCard from "common/ProjectCard";
import Header from 'features/header/header'
import backgroundImage from "../../assets/nehpets/HomePage_backgroundImage.svg";
import LinkCard from "features/home/Links";
import yellowBallImage from "../../assets/nehpets/yellowBall.svg";
import yellowBallSmallImage from "../../assets/nehpets/yellowSmall.svg";
import ashBallImage from "../../assets/nehpets/ashBall.svg";
import maroonBallImage from "../../assets/nehpets/maroonBall.svg";
import ashBallSmallImage from "../../assets/nehpets/ashballsmall.svg";
import chinesesgirlsImage from "../../assets/nehpets/HomePage_Section2.svg";
import africanChildred from "../../assets/nehpets/HomePage_Section2_2.svg";
import HomeUsersCard from "./HomeUsersCard";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import cardImage2 from "../../assets/nehpets/LinkCard_two.svg";
import HomeWhyChooseUs from "./HomeWhyChooseUs";
import { Link } from "react-router-dom";



function Home() {
  
  return (
    <>
      <div className="">
        <div
          className="h-screen "
          style={{
            background: `url('${backgroundImage}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Header underlined="home" />

          <div className="px-[10%] ">
            <div className="my-32 w-2/5 text-white ">
              <Typography variant="h4">
                Immigration & Visa Consultant Agent
              </Typography>
              <Typography className="mt-8 mb-4 text-white " variant="h5">
                Lorem ipsum dolor sit amet leo eros consectetur.
              </Typography>
              <Link to="/personal-info">
                <Button>Book Now</Button>
              </Link>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="w-full absolute -top-[70px]">
            <div class="flex justify-around">
              <LinkCard text="Apply For Visa" cardImage={cardImage} />
              <LinkCard text="Start a Course" cardImage={cardImage2} />
            </div>
          </div>
        </div>

        <div className="relative w-full h-[500px] p-[3%]">
          <img
            className="absolute right-[7%] top-9 w-40 -z-10"
            src={ashBallImage}
          />

          <div className="relative w-100  px-[23%] flex mt-52">
            <div className="relative w-full  ">
              <img class="w-[160px] " src={africanChildred} />
              <img
                class="w-40 absolute top-[100px] left-[115px]"
                src={chinesesgirlsImage}
              />
              <img
                class="w-12 absolute top-[30px] left-[170px]"
                src={yellowBallImage}
              />
              <img
                class="w-20 absolute top-[130px] -z-10 -left-5"
                src={yellowBallImage}
              />
              <div
                class="w-24 h-24 rounded-full text-white flex flex-col items-center justify-center absolute text-[11px] top-[220px] z-10 left-[220px] bg-[#AB0035]"
                // src={maroonBallImage}
              >
                <Typography className="">200+</Typography>
                <Typography className="">completed</Typography>
                <Typography className=""> visas</Typography>
              </div>

              {/* <img
                  class="w-40 absolute top-[60%] left-[8%]"
                  src={yellowBallImage}
                />
                <img class="w-40" src={yellowBallSmallImage} /> */}
            </div>
            <div className="relative w-[360px] text-[11px]">
              <img className="w-48" src={ashBallImage} />
              <div className="absolute -top-5 left-[50px] ">
                <Typography
                  className="my-3 text-xs font-extrabold"
                  variant="h6"
                >
                  Get coached by experienced tutors
                </Typography>
                <Typography className="my3 font-semibold" variant="">
                  We’ve been coaching and registering students for IELTS exams
                  for educational opportunities in foreign countries
                </Typography>
              </div>
              <div className="absolute bottom-5 left-[50px]">
                <Button className="w-32">Enroll </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div className="mt-20">
          <HomeUsersCard />
        </div>

        {/* Section 4 */}
        <HomeWhyChooseUs />
      </div>
    </>
  );
}

export default Home;
