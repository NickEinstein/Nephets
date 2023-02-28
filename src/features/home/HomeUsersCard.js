import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Typography } from "@mui/material";
import userAvatarImage1 from "../../assets/nehpets/Nephets2.jpg";
import userAvatarImage from "../../assets/nehpets/Nephets1.jpg";
import userAvatarImage2 from "../../assets/nehpets/testimonial3.jpg";

const HomeUsersCard = () => {
  return (
    <div className="bg-[#AB0035] h-[260] w-100 p-5 px-20">
      <Typography className="py-8 text-center text-white" variant="h4">
        What Our Users Say About Us
      </Typography>
      <div class="flex justify-between gap-4 mx-[8%] mt-4">
        <div className="relative bg-[#D9D9D9] p-3 w-2/5">
          <div className="full ">
            <img
              className="w-16 h-16 left-[40%] rounded-full absolute -top-7"
              src={userAvatarImage1}
            />
          </div>
          <div className=" mt-7 text-center">
            <Typography className="text-center" variant="h6">
              Loveth
            </Typography>
            <Typography variant="" className="text-base">
              {" "}
              I register for the IELTS tutorial for the 2022 diet, the classes
              were very insightful, with lots of materials, videos, individual
              and group assessments and an interview session. With the help of
              this, I was able to score a band mark of 7. This has prompted me
              in continuing my immigration process which has yielded success I’d
              recommend this to anyone.
            </Typography>
            <Typography className="mt-4 text-xs">Student visa</Typography>
          </div>
        </div>

        <div className="relative bg-[#D9D9D9] p-3 w-2/5">
          <div className="full ">
            <img
              className="w-16 h-16 left-[40%] rounded-full absolute -top-7"
              src={userAvatarImage}
            />
          </div>
          <div className=" mt-7 text-center">
            <Typography variant="h6">Lawrence</Typography>
            <Typography variant="" className="text-base">
              {" "}
              In 2022 I was recommended to try this service, and the journey
              thus far has been awesome, I enroll in the IELTS session, and I
              must say it was very impactful, I was able to secure two
              admissions within the space. Thanks to Nehpets Consulting.
            </Typography>
            <Typography className="mt-4 text-xs">Student visa</Typography>
          </div>
        </div>

        <div className="relative bg-[#D9D9D9] p-3 w-2/5">
          <div className="full ">
            <img
              className="w-16 h-16 left-[40%] rounded-full absolute -top-7"
              src={userAvatarImage2}
            />
          </div>
          <div className=" mt-7 text-center">
            <Typography variant="h6">Emmanuel</Typography>
            <Typography variant="" className="text-base">
              {" "}
              Nehpets Consulting has shown what it meant to be a consulting
              firm. Through this platform, I was able to secure admission to
              Canada. They are keen to hold your hands while working through
              this process, with detailed information, pros and cons, cost
              implication and other relevant information for settling in Canada.
            </Typography>
            <Typography className="mt-4 text-xs">Student visa</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeUsersCard;
