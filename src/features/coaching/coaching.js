import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Button, Divider, Typography, useMediaQuery } from "@mui/material";
import VisaImage from "../../assets/nehpets/PictureForVisa.jpg";
import VisaImage1 from "../../assets/nehpets/Coaching1.jpg";
import VisaImage2 from "../../assets/nehpets/Coaching2.jpg";
import VisaImage3 from "../../assets/nehpets/Coaching3.jpg";
import backgroundImage from "../../assets/nehpets/NephetsCoachingBg.svg";
import Header from "features/header/header";
import { Link } from "react-router-dom";
import useStepper from "hooks/useStepper";
import useDataRef from "hooks/useDataRef";
import { useEffect } from "react";
import Footer from "common/Footer";
import { MediaQueryBreakpointEnum } from "constants/Global";

const Coaching = () => {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const configs = [
    {
      bgColor: "HomeTopSectionBackgroundColor_ManInDreadsImage",
      textColor: "text-white",
      image: VisaImage2,
    },
    {
      bgColor: "HomeTopSectionBackgroundColor_headerImage",
      textColor: "text-secondary-main",
      image: VisaImage3,
    },

    {
      bgColor: "HomeTopSectionBackgroundColor_headerImage",
      textColor: "text-secondary-main",
      image: backgroundImage,
    },
    {
      bgColor: "HomeTopSectionBackgroundColor_WomanInRedImage",
      textColor: "text-secondary-main",
      image: VisaImage1,
    },
  ];

  const configs2 = [
     {
       bgColor: "HomeTopSectionBackgroundColor_WomanInRedImage",
       textColor: "text-secondary-main",
       image: VisaImage1,
     },
    {
      bgColor: "HomeTopSectionBackgroundColor_ManInDreadsImage",
      textColor: "text-white",
      image: VisaImage2,
    },
    {
      bgColor: "HomeTopSectionBackgroundColor_headerImage",
      textColor: "text-secondary-main",
      image: VisaImage3,
    },
    {
      bgColor: "HomeTopSectionBackgroundColor_headerImage",
      textColor: "text-secondary-main",
      image: backgroundImage,
    },
  ];

  const stepper = useStepper({
    maxStep: ismd ? configs.length - 2 : configs.length - 2,
  });

  const config = configs[stepper.step];

  const dataRef = useDataRef({ stepper });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (dataRef.current.stepper.canNextStep()) {
        dataRef.current.stepper.nextStep();
      } else {
        dataRef.current.stepper.reset();
      }
    }, 1000 * 5);
    return () => {
      clearInterval(intervalId);
    };
  }, [dataRef]);

  return (
    <div className="pb-16  ">
      <Header underlined="coaching" />
      <div
        className="h-screen relative"
        style={{
          background: ismd && `url('${configs[stepper.step].image}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            display: ismd && configs.length - 2 == stepper.step && "none",
          }}
          className="absolute  w-full"
        >
          <div className=" w-full px-[10%] py-[300px] flex items-center md:justify-between font-extrabold text-primary-main text-base">
            <Typography className="font-extrabold" variant="h2">
              IELTS CRASH COURSE
            </Typography>
            {/* <Divider /> */}
            {/* <Typography className="mt-4 mb-4 text-white " variant="h2">
             NEHPETS CONSULTING
            </Typography> */}
            {/* <Link to="/personal-info">
              <Button>Book Now</Button>
            </Link> */}
          </div>
        </div>
      </div>

      <img
        className="h-screen absolute top-0 -z-20 w-full"
        src={
          configs.length - 2 == stepper.step
            ? configs[stepper.step+1].image
            : configs[stepper.step].image
        }
      />

      <div className="px-[10%]">
        <Typography
          className="my-16 text-center font-semibold text-primary-main"
          variant="h4"
        >
          What You Should Know Before Your Journey Starts
        </Typography>
        <div className="flex md:flex-row flex-col items-start gap-2 mb-4">
          {/* <div
            style={{
              background: `url('${VisaImage}')`,
              backgroundSize: "auto",
              backgroundRepeat: "no-repeat",
            }}
            className="w-[800px] min-h-[280px] "
          > */}
          <img className="w-[350px] h-full" src={VisaImage} />
          {/* </div> */}
          <div className="w-full  ">
            <Typography variant="h4" className="mb-6 font-bold">
              What is IELTS
            </Typography>
            <Typography className="text-base">
              The International English Language Testing System (IELTS) is an
              exam that is been done on a weekly or bi-weekly basis across
              different countries. Which is designed to help you work, study or
              migrate to a country where English is the native language. This
              includes countries such as Australia, Canada, New Zealand, the UK
              and the USA. This exam tests your ability, fluency and proficiency
              to listen, read, write and speak in English will be assessed
              during the test. IELTS is graded on a scale of 1-9.
            </Typography>
          </div>
        </div>

        <Typography variant="h4" className="font-bold">
          Why IELTS
        </Typography>
        <Typography className="text-base">
          If you intend to live, school or work in an English-speaking country,
          it is necessary to enroll and write the IELTS exams, especially for
          immigration purposes. In recent times we have seen the reduction of
          IELTS exanimation been a major requirement to entering an
          English-speaking country, especially in the area of schooling prior to
          the fact that the host or applicant country is an English-speaking
          country.
        </Typography>
        <div>
          <div className="my-12">
            <Typography variant="h6" className="font-bold">
              Requirements Needed
            </Typography>
            <Typography>
              {" "}
              <Typography className="text-base">
                To be qualified to write the IELTS examination, you must have a
                valid passport from your country of residence, or which has at
                least six months before it expires.
              </Typography>
            </Typography>
          </div>
          {/* <div className="my-12">
            <Typography variant="h6">Requirements/Countries</Typography>
            <Typography>
              {" "}
              <Typography>
                Lorem ipsum dolor sit amet consectetur. Dolor sit odio sit
                sagittis morbi senectus amet at. Ut in gravida arcu semper.
                Ultrices amet justo tellus diam sed nunc ipsum pellentesque ut.
                Cras venenatis elementum proin in ut mi integer est. Facilisi
                felis mi mattis sed tortor. Id euismod neque id tempor sed
                maecenas purus mattis. Venenatis senectus ipsum et suspendisse
                urna sapien vel facilisis tellus. Etiam nulla nisi odio molestie
                malesuada. Ornare ac est sapien diam nullam commodo aliquet. Dui
                quis nisl fermentum velit aliquam ultricies id amet. Nisl sed
                nunc vestibulum maecenas rhoncus sociis non molestie. Est eget
                in non consequat mi ornare phasellus.
              </Typography>
            </Typography>
          </div> */}
          <div className="my-12">
            <Typography variant="h6" className="font-bold">
              How To Apply
            </Typography>
            <Typography>
              {" "}
              <Typography className="text-base">
                To apply for the IELTS examination, you will have to provide the
                necessary information, book a convenient date and time, attach
                your passport, and proceed to make payment for the exams.
              </Typography>
            </Typography>
          </div>
          <div className="flex justify-end my-8">
            <Link to="/coaching-form">
              <Button>Book Now</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Coaching;
