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

import Header from "features/header/header";
import backgroundImage from "../../assets/nehpets/HomePage_backgroundImage.svg";
import LinkCard from "features/home/Links";
import home1Image from "../../assets/nehpets/NehpetsHome.jpg";
import home2Image from "../../assets/nehpets/NehpetsHome2.jpg";
import home3Image from "../../assets/nehpets/NehpetsHome3.jpg";
import yellowBallSmallImage from "../../assets/nehpets/yellowSmall.svg";
import ashBallImage from "../../assets/nehpets/ashBall.svg";
import maroonBallImage from "../../assets/nehpets/maroonBall.svg";
import ashBallSmallImage from "../../assets/nehpets/ashballsmall.svg";
import chinesesgirlsImage from "../../assets/nehpets/HomePage_Section2.svg";
import africanChildred from "../../assets/nehpets/HomePage_Section2_2.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import AboutImage from "../../assets/nehpets/AboutUsImage.svg";
import useStepper from "hooks/useStepper";
import { useEffect, useRef } from "react";
import useDataRef from "hooks/useDataRef";
import Footer from "common/Footer";

function AboutUs() {
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
    
   ];


   const stepper = useStepper({ maxStep: configs.length - 1 });

   const config = configs[stepper.step];

   const dataRef = useDataRef({ stepper });

   useEffect(() => {
     const intervalId = setInterval(() => {
       if (dataRef.current.stepper.canNextStep()) {
         dataRef.current.stepper.nextStep();
       } else {
         dataRef.current.stepper.reset();
       }
     }, 1000 * 10);
     return () => {
       clearInterval(intervalId);
     };
   }, [dataRef]);
  return (
    <>
      <div className="">
        <div
          className="h-[260px] "
          //   style={{
          //     background: `url('${backgroundImage}')`,
          //     backgroundSize: "cover",
          //     backgroundRepeat: "no-repeat",
          //   }}
        >
          <Header underlined="about" />
          <div className="md:h-[260px] py-14">
            <img src={AboutImage} />
          </div>

          <div class="w-full flex justify-center pb-8">
            <div className="md:text-center md:py-8 md:px-10 md:w-3/5 px-2 mx-3 border bg-white rounded-lg">
              <Typography
                className="my-6 font-bold text-primary-main text-center"
                variant="h4"
              >
                What We Do
              </Typography>
              <Typography className="text-base">
                Nehpets Consulting prepares their clients for IELTS. This online
                preparation comes with IELTS Materials and a study pack.
                Tutorial sessions, sample tests, one on one interactions and
                individual feedback. Nehpets consulting can help you process
                your visa applications ranging from Canadian permanent residency
                visas to study, work, visiting visas and so on. <br /> <br />
                At Neehpets Consulting, we believe that every traveller is
                peculiar and must be approached perculiarly, therefore our team
                of experts will help you discover your relocation plans, and
                then tailor them to your personal needs. <br /> <br />
                As a student, Nehpets Consulting can help you source for pocket
                friendly schools and provide all the support you will need.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default AboutUs;
