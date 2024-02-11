import React from "react";
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
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiTwotoneMail,
  AiFillPhone,
} from "react-icons/ai";
// import ReactDOM from 'react-dom';
// import { BsYoutube,BsFacebook,BsInstagram, BsApple, BsFillFileEarmarkCodeFill } from 'react-icons/bs';
// import { AiFillAndroid,AiOutlineCopyright, AiFillUnlock } from 'react-icons/ai';
import logo from "assets/nehpets/Nehpets logo 1.svg";

const Footer = () => {
  return (
    <div
      style={{
        // backgroundColor: "#370548",
        // padding: "70px 60px",
        color: "white",
      }}
      className="px-[10%] py-[60px] bg-[#AB0035] flex flex-col md:flex-row md:justify-between gap-16 z-50"
    >
      <div className="hidden md:block">
        <img src={logo} />
        <Typography className="font-bold">
          Planning Together to Achieve your dream
        </Typography>
      </div>
      <ul className="text-base flex flex-col md:justify-start md:items-center gap-5 justify-center items-center">
        <h2 className="text-3xl md:mb-8">Quick Links</h2>

        <a className="hover:text-primary-main cursor-pointer"> Home</a>
        <a className="hover:text-primary-main cursor-pointer">Coaching</a>
        <a className="hover:text-primary-main cursor-pointer">Visa</a>
        <a className="hover:text-primary-main cursor-pointer">About Us</a>
      </ul>

      <ul className="text-base flex flex-col md:justify-start md:items-center justify-center items-center gap-3">
        <h2 className="text-3xl md:mb-8">Contact Us</h2>
        <li className="flex gap-3 items-center">
          <AiFillPhone /> +234 (904) 919 5599
        </li>
        <li className="flex gap-3 items-center">
          <AiFillPhone /> +1 (204) 441 - 4828
        </li>
        <li className="flex gap-3 items-center">
          <AiTwotoneMail /> Info@nehpetsconsult.com
        </li>
      </ul>

      <ul className="text-base flex flex-col md:justify-start md:items-center justify-center items-center gap-3">
        <h2 className="text-3xl md:mb-8">Social Media</h2>

        <div className="flex gap-4 ">
          <a href="https://instagram.com/nehpetsconsult?igshid=ZDdkNTZiNTM=">
            <AiOutlineInstagram style={{ fontSize: "36px" }} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100090851305102&mibextid=ZbWKwL
"
          >
            <AiFillFacebook style={{ fontSize: "36px" }} />
          </a>
          <a href="https://twitter.com/Nehpetsconsult">
            <AiFillTwitterSquare style={{ fontSize: "36px" }} />
          </a>
          <a
            href="https://www.linkedin.com/company/nehpets-consult/
"
          >
            <AiFillLinkedin style={{ fontSize: "36px" }} />
          </a>
        </div>
      </ul>
    </div>
  );
};
export default Footer;
