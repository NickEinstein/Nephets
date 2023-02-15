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

function HomeNehpets() {
  const [containerScrollTop, setContainerScrollTop] = useState(0);

   

  return (
    <>
    Hello
    </>
  );
}

export default HomeNehpets;
