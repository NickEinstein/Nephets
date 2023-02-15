import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MediaQueryBreakpointEnum } from "constants/Global";

import { BsApple, BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import { GrAndroid } from "react-icons/gr";

function PageFooter(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const categories = [
    "Development & IT",
    "Design & Creative",
    "Sales & Marketing",
    "Writing & Translation",
    "Backend Development",
    "CMS Development",
    "HR & Training",
    "Legal",
    "Hire freelancers",
    "Mobile App Development",
  ];

  const talent = [
    "How to Find Work",
    "Direct Contracts",
    "How to update profile",
  ];

  const clients = [
    "How to Hire",
    "Talent Marketplace",
    "Project Catalog",
    "Talent Scout",
    "Payment Method",
    "Direct Contracts",
    "Hire Worldwide",
  ];

  const aboutUs = [
    "Leadership",
    "Investor Relations",
    "Careers",
    "Our Impact",
    "Press",
    "Contact Us",
  ];
  const support = ["Help & Support", "Trust & Safety", "FAQs", "Community"];

  const expandableFooter = [
    { name: "Categories", list: categories },
    { name: "Talent", list: talent },

    { name: "Clients", list: clients },

    { name: "About Us", list: aboutUs },

    { name: "Support", list: support },
  ];

  return (
    <>
      <div className="bg-primary-dark text-white">
        <Container maxWidth="xl">
          {ismd && (
            <div className="flex flex-wrap justify-between items-start py-16 pb-32">
              <div className=" flex flex-col gap-2 justify-center items-center">
                <Typography variant="h4" className="my-20">
                  Categories
                </Typography>
                {categories.map((text) => (
                  <Typography variant="">{text}</Typography>
                ))}
              </div>
              <div className=" flex flex-col gap-2 justify-center items-center">
                <Typography variant="h4" className="my-20">
                  For Talent
                </Typography>
                {talent.map((text) => (
                  <Typography variant="">{text}</Typography>
                ))}
              </div>
              <div className=" flex flex-col gap-2 justify-center items-center">
                <Typography variant="h4" className="my-20">
                  For Freelancer
                </Typography>
                {clients.map((text) => (
                  <Typography variant="">{text}</Typography>
                ))}
              </div>
              <div className=" flex flex-col gap-2 justify-center items-center">
                <Typography variant="h4" className="my-20">
                  About US
                </Typography>
                {aboutUs.map((text) => (
                  <Typography variant="">{text}</Typography>
                ))}
              </div>
              <div className=" flex flex-col gap-2 justify-center items-center">
                <Typography variant="h4" className="my-20">
                  Support
                </Typography>
                {support.map((text) => (
                  <Typography variant="">{text}</Typography>
                ))}
              </div>
            </div>
          )}
          {!ismd && (
            <div>
              {expandableFooter.map((e) => (
                <Accordion
                  disableGutters
                  className="w-72 bg-primary-dark text-white border-white"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="text-white" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h5" className="border-white">
                      {e.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="flex flex-col gap-3">
                    {e.list.map((text) => (
                      <Typography variant="">{text}</Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          )}
        </Container>
        <div className="pt-20 pb-5 ">
          <div class="py-4 px-24 border-y-white border-y-2 flex justify-center md:justify-between items-center">
            {ismd && (
              <ul className="flex w-1/12 md:justify-between justify-center">
                <li>
                  <BsYoutube className="text-2xl" />
                </li>
                <li>
                  <BsFacebook className="text-2xl" />
                </li>
                <li>
                  <BsInstagram className="text-2xl" />
                </li>
              </ul>
            )}
            <ul>
              <li className="text-center">© Ayopey Global Services Limited. 2022</li>
            </ul>
            {ismd && (
              <ul className="flex gap-2 py-4 justify-between">
                <li>
                  <GrAndroid className="text-2xl" />
                </li>
                <li>
                  <BsApple className="text-2xl" />
                </li>
              </ul>
            )}
          </div>
          {ismd && (
            <div className="flex justify-center">
              <ul className="w-3/5 mt-4 font-semibold flex justify-between">
                <li>Terms of Service </li>
                <li> Privacy Policy</li>
                <li>Cookie Setting</li>
                <li>Accessibility</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PageFooter;
