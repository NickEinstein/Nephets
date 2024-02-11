import logo from "../../assets/nehpets/Nehpets logo 1.svg";
// import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Links = ({cardImage,text2, text,to}) => {
  return (
    <Link to={to} className="bg-[#AB0035] hover:bg-[#dc386c] hover:scale-105 p-3 cursor-pointer z-20 text-white h-[260] w-[170px] px-5 flex flex-col justify-center items-center">
      <img className="w-8" src={cardImage} />

      <Typography className="my-3">{text}</Typography>

      <Typography className="mb-3 text-center text-[10px]">
        {text2}
      </Typography>
    </Link>
  );
};
export default Links;
