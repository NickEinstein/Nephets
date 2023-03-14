import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Typography } from "@mui/material";
import userAvatarImage1 from "../../assets/nehpets/Nephets2.jpg";
import userAvatarImage from "../../assets/nehpets/Nephets1.jpg";
import userAvatarImage2 from "../../assets/nehpets/testimonial3.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomeUsersCard = () => {
  return (
    <div className="bg-[#AB0035] p-5 ">
      <Typography className="py-8 text-center text-white" variant="h4">
        What Our Users Say About Us
      </Typography>
      <div class="flex justify-between gap-4 items-center  w-full mt-4">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className="w-full mx-auto"
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={true}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 1,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {[
            {
              image: userAvatarImage1,
              title: "Loveth",
              text: `I register for the IELTS tutorial for the 2022 diet, the
                  classes were very insightful, with lots of materials, videos,
                  individual and group assessments and an interview session.
                  With the help of this, I was able to score a band mark of 7.
                  This has prompted me in continuing my immigration process
                  which has yielded success I’d recommend this to anyone.`,
            },
            {
              image: userAvatarImage,
              title: "Lawrence",
              text: `In 2022 I was recommended to try this service, and the journey
              thus far has been awesome, I enroll in the IELTS session, and I
              must say it was very impactful, I was able to secure two
              admissions within the space. Thanks to Nehpets Consults.`,
            },
            {
              image: userAvatarImage2,
              title: "Emmanuel",
              text: `Nehpets Consults has shown what it meant to be a consulting
              firm. Through this platform, I was able to secure admission to
              Canada. They are keen to hold your hands while working through
              this process, with detailed information, pros and cons, cost
              implication and other relevant information for settling in Canada.`,
            },
          ].map((card, index) => (
            <div className="relative my-8  bg-[#D9D9D9] p-3 ">
              <div className="full ">
                <img
                  className="w-16 h-16 left-[47%] rounded-full absolute -top-7"
                  src={card.image}
                />
              </div>
              <div className=" mt-7 text-center">
                <Typography className="text-center" variant="h6">
                  {card.title}
                </Typography>
                <div className=" px-24 py-8">
                  <Typography variant="" className="text-base ">
                    {card.text}
                  </Typography>
                </div>
                <Typography className="mt-4 text-xs">Student visa</Typography>
              </div>
            </div>
          ))}
        </Carousel>

        {/* <div className="relative bg-[#D9D9D9] p-3 w-2/5">
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
        </div> */}
      </div>
    </div>
  );
};
export default HomeUsersCard;
