import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Typography } from "@mui/material";
import userAvatarImage from "../../assets/nehpets/HomeUser_Avartar.svg";

const HomeUsersCard = () => {
  return (
    <div className="bg-[#AB0035] h-[260] w-100 p-5 px-20">
      <Typography className="py-8 text-center text-white" variant="h4">
        What Our Users Say About Us
      </Typography>
<div class="flex justify-between mx-[10%] mt-4">
    
          <div className="relative bg-[#D9D9D9] p-3 w-1/5">
            <div className="full ">
              <img
                className="w-16 left-[30%] absolute -top-7"
                src={userAvatarImage}
              />
            </div>
            <div className=" mt-7 text-center">
              <Typography variant="h6">Susan Strong</Typography>
              <Typography variant="">
                {" "}
                Lorem ipsum dolor sit amet consectetur.
              </Typography>
              <Typography className="mt-4 text-xs">Student visa</Typography>
            </div>
          </div>
    
          <div className="relative bg-[#D9D9D9] p-3 w-1/5">
            <div className="full ">
              <img
                className="w-16 left-[30%] absolute -top-7"
                src={userAvatarImage}
              />
            </div>
            <div className=" mt-7 text-center">
              <Typography variant="h6">Susan Strong</Typography>
              <Typography variant="">
                {" "}
                Lorem ipsum dolor sit amet consectetur.
              </Typography>
              <Typography className="mt-4 text-xs">Student visa</Typography>
            </div>
          </div>
    
          <div className="relative bg-[#D9D9D9] p-3 w-1/5">
            <div className="full ">
              <img
                className="w-16 left-[30%] absolute -top-7"
                src={userAvatarImage}
              />
            </div>
            <div className=" mt-7 text-center">
              <Typography variant="h6">Susan Strong</Typography>
              <Typography variant="">
                {" "}
                Lorem ipsum dolor sit amet consectetur.
              </Typography>
              <Typography className="mt-4 text-xs">Student visa</Typography>
            </div>
          </div>
</div>
    </div>
  );
};
export default HomeUsersCard;
