import logo from "../../assets/nehpets/Nehpets logo 1.svg";
// import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Typography } from "@mui/material";
const Links = ({cardImage, text}) => {
  return (
    <div className="bg-[#AB0035] p-3 cursor-pointer  text-white h-[260] w-[170px] px-5 flex flex-col justify-center items-center">
      <img className="w-8" src={cardImage} />

      <Typography className="my-3">{text}</Typography>

      <Typography className="mb-3 text-center text-[10px]">Lorem ipsum dolor sit amet consectetur.</Typography>
    </div>
  );
};
export default Links;
