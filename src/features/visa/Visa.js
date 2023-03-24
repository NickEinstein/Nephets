import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Button, Typography } from "@mui/material";
import VisaImage from "../../assets/nehpets/VisaImage.svg";
import VisaImage2 from "../../assets/nehpets/BabyToReplaceVisa.jpg";
import Header from "features/header/header";
import { Link } from "react-router-dom";
import Footer from "common/Footer";

const Visa = () => {
  return (
    <div>
      <Header underlined="visa" />

      <div className=" h-[260] w-100 p-5  px-[15%] ">
        <Typography
          className="my-16 text-center font-extrabold text-primary-main"
          variant="h4"
        >
          Have You Asked The "WHY QUESTION?"
        </Typography>
        <div className="flex items-start gap-4 mb-4">
          <div className=" w-[600px] h-[350px]">
            <img className="w-full h-full" src={VisaImage2} />
          </div>
          <div className="w-full  border-3 text-base">
            <Typography className="text-base">
              Travelling or leaving your country is a very important step that
              needs proper evaluation before embarking on. There are basic
              questions you should ask yourself, I call it the evaluation phase.
              Over the years we have seen a high rate of people travelling
              without having a clear view of why they are doing it or the
              necessary backing of support. The JAPA syndrome has dash so many
              persons into regretting their decision or being stuck at a dead
              end. What is the JAPA Syndrome; In recent times we have seen a
              large number of people leaving countries through schooling,
              visiting and immigration for the purpose of leaving a better life,
              and benefiting from all the good tidings this new country has. In
              this same fact, so many people have dashed into that syndrome
              without properly analyzing the pros and cons attached to it.
            </Typography>
          </div>
        </div>
        <Typography className="text-base">
          Before your start your joining or travelling to a country, either for
          schooling, visiting, tourist or immigration purposes you should ask
          yourself this question.
          <ul className="flex-col flex gap-3 mt-3 px-20 font-bold list-disc">
            <li>
              Am you ready to start life afresh basically for those studying and
              those processing for immigration? Imagine leaving all you have in
              a country and starting a new life in a different country. Also,
              ask yourself,
            </li>
            <li>Do I have the financial strength to pursue such a process?</li>
            <li>
              Do I have the necessary skill needed for the prospective labour
              market?
            </li>
            <li> Decide on the path or process to follow.</li>
          </ul>
        </Typography>
        <div>
          <div className="my-12">
            <Typography variant="h6" className="font-extrabold">
              Visa Types
            </Typography>
            <Typography>
              {" "}
              <Typography className="text-base">
                There are different types of visas depending on what you are
                applying for. This Visas can be classified into Temporary and
                Permanent Visas. For more information click below
              </Typography>
              <ul className="flex-col flex gap-3 mt-3 px-20 font-bold list-disc text-base">
                <Link
                  to="/temporal-visa"
                  className="hover:text-primary-main hover:cursor-pointer"
                >
                  Temporary Residence
                </Link>
                <Link
                  to="/permanent-visa"
                  className="hover:text-primary-main hover:cursor-pointer"
                >
                  Permanent Residence{" "}
                </Link>
              </ul>
            </Typography>
          </div>
          <div className="my-12">
            <Typography className="font-extrabold" variant="h6">
              Requirements/Countries
            </Typography>
            <Typography>
              {" "}
              <Typography className="text-base">
                Visa requirement varies in different countries, prior to the
                evaluation, assessment and validation of the application
                process.
              </Typography>
            </Typography>
          </div>

          <div className="flex justify-end">
            <Link to="/personal-info">
              <Button>Book Now</Button>
            </Link>
          </div>
        </div>
      </div>
    
      <Footer />
    </div>
  );
};
export default Visa;
