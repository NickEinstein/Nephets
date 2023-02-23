import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Button, Divider, Typography } from "@mui/material";
import VisaImage from "../../assets/nehpets/Work.jpg";
import VisaImage1 from "../../assets/nehpets/Coaching1.jpg";
import VisaImage2 from "../../assets/nehpets/Coaching2.jpg";
import VisaImage3 from "../../assets/nehpets/Coaching3.jpg";
import backgroundImage from "../../assets/nehpets/NephetsCoachingBg.svg";
import Header from "features/header/header";
import { Link } from "react-router-dom";
import useStepper from "hooks/useStepper";
import useDataRef from "hooks/useDataRef";
import { useEffect } from "react";

const PermanentResident = () => {
  const configs = [
    //  {
    //    bgColor: "HomeTopSectionBackgroundColor_WomanInRedImage",
    //    textColor: "text-secondary-main",
    //    image: VisaImage1,
    //  },
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
    // {
    //   bgColor: "HomeTopSectionBackgroundColor_headerImage",
    //   textColor: "text-secondary-main",
    //   image: backgroundImage,
    // },
  ];

  const stepper = useStepper({ maxStep: configs.length - 1 });

  const config = configs[stepper.step];

  const dataRef = useDataRef({ stepper });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (dataRef.current.stepper.canNextStep()) {
        dataRef.current.stepper.nextStep();
      } else {
        dataRef.current.stepper.reset();
      }
    }, 1000 * 10);
    return () => {
      clearInterval(intervalId);
    };
  }, [dataRef]);

  return (
    <div className="pb-16  ">
      <Header underlined="visa" />
      <div
        className="h-96 relative"
        style={{
          background: `url('${VisaImage}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          //   style={{ display: configs.length - 1 == stepper.step && "none" }}
          className="absolute  w-full"
        >
          <div className=" w-full px-[10%] py-[10%]  justify-between font-extrabold text-primary-main ">
            <Typography className="font-extrabold" variant="h2">
              PERMANENT RESIDENCE
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

      <div class="flex gap-5 px-[10%]">
        <div className="">
          <div className="h-48">
            <Typography className="my-4 font-semibold" variant="h4">
              EXPRESS ENTRY
            </Typography>
            <Typography className="">
              Express Entry is an application for skilled workers or
              professionals who would like to immigrate to Canada having met the
              necessary requirement. From this platform, applicants are granted
              a permanent resident profile on arrival.
            </Typography>
          </div>

          <Typography variant="h5" className="font-bold my-6">
            What do we Offer?
          </Typography>
          <ul className="list-disc flex flex-col gap-3">
            <li>
              Profile assessment and an interview to evaluate your resume and
              document.
            </li>
            <li> Application process, profile creation and Visa </li>
            <li>
              Follow up on the application and provide the necessary
              information.
            </li>
            <li>
              Arriving assistance and support (Accommodation, Airport pickup and
              integration support services)
            </li>
          </ul>

          <Typography variant="h5" className="font-bold my-6">
            Process
          </Typography>
          <ul className="list-disc flex flex-col gap-3">
            <li>Fill out the assessment form provided below.</li>
            <li>
              Pay a certain fee for profile assessment, evaluation and
              interview.
            </li>
            <li> Provide all necessary documents as requested. country.</li>
          </ul>
        </div>
        <div className="">
          <div className="h-48">
            <Typography className="my-4 font-semibold text-center" variant="h4">
              PROVISIONAL NOMINEE PROGRAM (PNP)
            </Typography>
            <Typography className="">
              This is a program that allows and enables Provinces within Canada
              to nominate people from other countries for immigration. These
              persons are nominated to work and carry out their duties within
              the province nominated having met the requirement.
            </Typography>
          </div>
          <Typography variant="h5" className="font-bold my-6">
            What do we Offer?
          </Typography>
          <ul className="list-disc flex flex-col gap-3">
            <li>
              Profile assessment and an interview to evaluate your resume and
              document.
            </li>
            <li> Application process, profile creation and Visa </li>
            <li>
              Follow up on the application and provide the necessary
              information.
            </li>
            <li>
              Arriving assistance and support (Accommodation, Airport pickup and
              integration support services)
            </li>
          </ul>
          <Typography variant="h5" className="font-bold my-6">
            Process
          </Typography>
          <ul className="list-disc flex flex-col gap-3">
            <li> Fill out the assessment form provided below. </li>
            <li>
              Pay a certain fee for profile assessment, evaluation and
              interview.
            </li>
            <li> Provide all necessary documents as requested.</li>
          </ul>
        </div>
        <div className="">
          <div className="h-48">
            <Typography className="my-4 font-semibold" variant="h4">
              CARE-GIVER
            </Typography>
            <Typography>
              These are people who assist in rendering services to the retired,
              senior citizens, kids and so on. The Canadian government is open
              to accepting applicants who qualify and meet the requirement.
            </Typography>
          </div>
          <Typography variant="h5" className="font-bold my-6">
            What do we Offer?
          </Typography>
          <ul className="list-disc flex flex-col gap-3">
            <li>
              Profile assessment and an interview to evaluate your resume and
              document.{" "}
            </li>
            <li>Application process, profile creation and Visa </li>
            <li>
              Follow up on the application and provide the necessary
              information.{" "}
            </li>
            <li>
              Arriving assistance and support (Accommodation, Airport pickup and
              integration support services)
            </li>
          </ul>
          <Typography variant="h5" className="font-bold my-6">
            Process
          </Typography>
          <ul className="list-disc flex flex-col gap-3">
            <li>Fill out the assessment form provided below.</li>
            <li>
              Pay a certain fee for profile assessment, evaluation and
              interview.
            </li>
            <li> Provide all necessary documents as requested. country.</li>
          </ul>
          <div className="flex justify-end mt-8">
            <Link to="/personal-info">
              <Button>Book Now</Button>
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default PermanentResident;
