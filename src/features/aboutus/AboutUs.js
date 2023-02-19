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
import yellowBallImage from "../../assets/nehpets/yellowBall.svg";
import yellowBallSmallImage from "../../assets/nehpets/yellowSmall.svg";
import ashBallImage from "../../assets/nehpets/ashBall.svg";
import maroonBallImage from "../../assets/nehpets/maroonBall.svg";
import ashBallSmallImage from "../../assets/nehpets/ashballsmall.svg";
import chinesesgirlsImage from "../../assets/nehpets/HomePage_Section2.svg";
import africanChildred from "../../assets/nehpets/HomePage_Section2_2.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import AboutImage from "../../assets/nehpets/AboutUsImage.svg";

function AboutUs() {
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
          <div className="h-[260px] ">
            <img src={AboutImage} />
          </div>

          <div class="w-full flex justify-center ">
            <div className="text-center py-8 px-10 w-3/5 border bg-white rounded-lg">
              <Typography className="my-6 font-bold" variant="h4">
                What We Do
              </Typography>
              <Typography>
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
    </>
  );
}

export default AboutUs;
