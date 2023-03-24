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
      className="px-[10%] py-[60px] bg-[#AB0035] flex justify-between"
    >
      <div>
        <img src={logo} />
        <Typography className="font-bold">
          Planning Together to Achieve your dream
        </Typography>
      </div>
      <ul className="text-base flex flex-col gap-3">
        <h2 style={{ fontSize: "22px", marginBottom: "30px", color: "white" }}>
          Quick Links
        </h2>

        <li> Home</li>
        <li>Coaching</li>
        <li>Visa</li>
        <li>About Us</li>
      </ul>

      <ul className="text-base flex flex-col gap-3">
        <h2 style={{ fontSize: "22px", marginBottom: "30px", color: "white" }}>
          Contact Us
        </h2>
        <li className="flex gap-3 items-center">
          <AiFillPhone /> +234 7033149424
        </li>
        <li className="flex gap-3 items-center">
          <AiFillPhone /> +1 (204) 441 - 4828
        </li>
        <li className="flex gap-3 items-center">
          <AiTwotoneMail /> Info@nehpetsconsult.com
        </li>
      </ul>

      <ul className="text-base flex flex-col gap-3">
        <h2 style={{ fontSize: "22px", marginBottom: "30px", color: "white" }}>
          Social Media
        </h2>

        <div className="flex gap-4 ">
          <a>
            {" "}
            <AiOutlineInstagram style={{ fontSize: "36px" }} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100090851305102&mibextid=ZbWKwL
"
          >
            <AiFillFacebook style={{ fontSize: "36px" }} />
          </a>
          <li>
            <AiFillTwitterSquare style={{ fontSize: "36px" }} />
          </li>
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
