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
  useMediaQuery,
} from "@mui/material";
import home1Image from "../../assets/nehpets/NehpetsHome.jpg";
import home2Image from "../../assets/nehpets/Tourist.jpg";
import home3Image from "../../assets/nehpets/NehpetsHome3.jpg";
import { useEffect, useMemo, useRef, useState } from "react";
// import "./HomeTopSectionBackgroundColor.css";
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
import africanChildred from "../../assets/nehpets/HomePageChildrenReplacement.jpg";
import HomeUsersCard from "./HomeUsersCard";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import cardImage2 from "../../assets/nehpets/LinkCard_two.svg";
import HomeWhyChooseUs from "./HomeWhyChooseUs";
import { Link } from "react-router-dom";
import Footer from "common/Footer";
  import { MediaQueryBreakpointEnum } from "constants/Global";



function Home() {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

   const configs = [
     {
       bgColor: "HomeTopSectionBackgroundColor_WomanInRedImage",
       textColor: "text-secondary-main",
       image: home1Image,
     },
     {
       bgColor: "HomeTopSectionBackgroundColor_ManInDreadsImage",
       textColor: "text-white",
       image: home2Image,
     },
     {
       bgColor: "HomeTopSectionBackgroundColor_headerImage",
       textColor: "text-secondary-main",
       image: home3Image,
     },
     {
       bgColor: "HomeTopSectionBackgroundColor_headerImage",
       textColor: "text-secondary-main",
       image: backgroundImage,
     },
   ];

     const configsMobile = [
       {
         bgColor: "HomeTopSectionBackgroundColor_WomanInRedImage",
         textColor: "text-secondary-main",
         image: home1Image,
       },
       {
         bgColor: "HomeTopSectionBackgroundColor_ManInDreadsImage",
         textColor: "text-white",
         image: home2Image,
       },
       {
         bgColor: "HomeTopSectionBackgroundColor_headerImage",
         textColor: "text-secondary-main",
         image: home3Image,
       },
      //  {
      //    bgColor: "HomeTopSectionBackgroundColor_headerImage",
      //    textColor: "text-secondary-main",
      //    image: backgroundImage,
      //  },
     ];

   const stepper = useStepper({
     maxStep: ismd ? configs.length - 1 : configs.length - 2,
   });

   const config = configs[stepper.step];

   const dataRef = useDataRef({ stepper });

   useEffect(() => {
     const intervalId = setInterval(() => {
       if (dataRef.current.stepper.canNextStep()) {
         dataRef.current.stepper.nextStep();
       } else {
         dataRef.current.stepper.reset();
       }
     }, 1000 * 5);
     return () => {
       clearInterval(intervalId);
     };
   }, [dataRef]);

  return (
    <>
      <div className="">
        <div
          className="h-screen md:block"
          style={{
            background: ismd && `url('${configs[stepper.step].image}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img className="h-screen absolute top-0 -z-20 w-full" src={configs[stepper.step].image} />

          {/* <div className="self-stretch w-1/2 hidden md:flex items-end">
            <div className="relative w-full" style={{ height: 620 }}>
              {configs.map((step, index) => (
                <Fade
                  key={index}
                  in={stepper.step === index}
                  timeout={500}
                  className="absolute block top-0 w-full h-full "
                >
                  <img alt={index} src={step.image} />
                </Fade>
              ))}
            </div>
          </div> */}
          {/* <Header step={stepper.step} underlined="home" /> */}

          <div className="px-[10%] z-10 ">
            <div className="md:py-64 py-44 md:w-2/5 text-white ">
              <Typography variant="h4">
                Immigration & Visa Consultant Agent
              </Typography>
              <Typography className="mt-8 mb-4 text-white " variant="h5">
                Planning together to achieve your dream
              </Typography>
              <Link to="/personal-info">
                <Button>Book Now</Button>
              </Link>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="w-full absolute md:-top-[70px] -top-[200px] z-50 md:z-10">
            <div class="flex justify-around">
              <LinkCard
                to="/visa"
                text="Apply For Visa"
                text2="Let's assist you"
                cardImage={cardImage}
              />
              <LinkCard
                to="/coaching"
                text="Start a Course"
                text2="Register for IELTS"
                cardImage={cardImage2}
              />
            </div>
          </div>
        </div>

        <div className="relative w-full h-[500px] p-[3%]">
          <img
            className="absolute hidden md:block right-[7%] top-9 w-40 -z-10"
            src={ashBallImage}
          />

          <div className="relative w-100  px-[23%] pl-[12%] flex mt-20">
            <div className="relative w-full hidden md:block ">
              <img
                class="w-[260px] hidden md:block h-[230px] z-20 absolute left-0"
                src={africanChildred}
              />
              {/* <img
                class="absolute w-[260px] h-[260px] top-[100px] left-[215px]"
                src={chinesesgirlsImage}
              /> */}
              <img
                class="w-12 hidden md:block absolute top-[30px] left-[300px]"
                src={yellowBallImage}
              />
              <img
                class="w-20 hidden md:block absolute top-[190px] -z-10 -left-6"
                src={yellowBallImage}
              />
              {/* <div
                class="w-24 h-24 rounded-full text-white flex flex-col items-center justify-center absolute text-[11px] top-[250px] z-10 left-[220px] bg-[#AB0035]"
                // src={maroonBallImage}
              >
                <Typography className="">200+</Typography>
                <Typography className="">completed</Typography>
                <Typography className=""> visas</Typography>
              </div> */}

              {/* <img
                  class="w-40 absolute top-[60%] left-[8%]"
                  src={yellowBallImage}
                />
                <img class="w-40" src={yellowBallSmallImage} /> */}
            </div>
            <div className="relative md:w-[550px] my-20 md:my-0 w-full">
              <img className="w-80 hidden md:block" src={ashBallImage} />
              <div className="absolute w-[300px] md:left-5 md:top-10 top-4">
                <Typography
                  className="my-3 mb-6 w-full font-extrabold text-center"
                  variant="h4"
                >
                  Get coached by experienced tutors
                </Typography>
                <Typography className="my3 font-semibold text-base" variant="">
                  We’ve been coaching and registering students for IELTS exams
                  for educational opportunities in foreign countries
                </Typography>
                <Link
                  to="/coaching-form"
                  className=" md:left-[50px] flex md:mt-12 mt-4 mr-5 w-full justify-center"
                >
                  <Button className="w-32">Enroll </Button>
                </Link>
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

        <Footer />
      </div>
    </>
  );
}

export default Home;
