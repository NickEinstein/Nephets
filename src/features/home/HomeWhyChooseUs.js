import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Divider, Typography } from "@mui/material";
import userAvatarImage from "../../assets/nehpets/HomeUser_Avartar.svg";

const HomeWhyChooseUs = () => {
  return (
    <div className=" h-[260] w-100 p-5">
      <div class="flex md:justify-between justify-center md:mb-12 px-[10%]">
        <div className="bg-black hidden md:block  w-[38%] h-1 self-end" />
        <Typography className="py-8 text-center " variant="h4">
          Why Choose Us
        </Typography>
        <div className="bg-black hidden md:block  w-[38%] h-1 self-end" />
      </div>

      <div className="px-[10%] flex flex-col md:flex-row gap-5 justify-between relative md:my-24">
        <div className="relative bg-[#AB0035] p-3 md:w-52 md:h-44 h-56 flex justify-center items-center">
          <div className="w-16 h-16 bg-[#FFB13680] rounded-full absolute -bottom-7 -right-7"></div>
          <div className="w-16 h-16 bg-[#FFB13680] rounded-full absolute -bottom-7 -left-7"></div>
          <div className="text-center text-white">
            <Typography variant="h6">250 +</Typography>
            <Typography variant=""> Visas</Typography>
          </div>
        </div>

        <div className="relative bg-[#AB0035] p-3 md:w-52 md:h-44 h-56 flex justify-center items-center">
          <div className="w-16 h-16 bg-[#FFB13680] rounded-full absolute -top-7 -right-7"></div>
          <div className="w-16 h-16 bg-[#FFB13680] rounded-full absolute -bottom-7 -left-7"></div>
          <div className="text-center text-white">
            <Typography variant="h6">250 +</Typography>
            <Typography variant=""> IELTS</Typography>
          </div>
        </div>

        <div className="relative bg-[#AB0035] p-3 md:w-52 md:h-44 h-56 flex justify-center items-center">
          <div className="w-16 h-16 bg-[#FFB13680] rounded-full absolute -top-7 -right-7"></div>
          <div className="w-16 h-16 bg-[#FFB13680] rounded-full absolute  -left-7"></div>
          <div className="text-center text-white">
            <Typography variant="h6">250 +</Typography>
            <Typography variant=""> Students</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeWhyChooseUs;
