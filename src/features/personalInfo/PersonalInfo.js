import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Button, TextField, Typography } from "@mui/material";
import userAvatarImage from "../../assets/nehpets/HomeUser_Avartar.svg";
import { Box } from "@mui/system";
import { post } from "services/fetch";
import Header from "features/header/header";

const HomeUsersCard = () => {

    const add = async ()=>{
        let createCustomer = {
          firstName: "Daniel",
          lastName: "Ntoe",
          mobileNumber: "08105334020",
          age: "40",
          maritalStatus: "Single",
          email: "danino@g.com",
          nationality: "nigeria",
          address: "lagos",
          country: "nigeria",
          doYouHaveChildren: "no",
          listAllMembers: "yemi, john",
          job: "Software",
          passport: "Drivers licence",
          terms: "yes",
        };
 const res = await post({
   endpoint: `customers`,
   body: { ...createCustomer },
   auth: false,
 });
    }

   

  return (
    <div>
      <Header />

      <div className="w- p-5 px-20 flex justify-center">
        <div class="w-3/5">
          <Typography
            className="pt-8  text-center  text-bold text-black"
            variant="h3"
          >
            Personal Information
          </Typography>
          <Typography className="pb-8 text-center  text-bold text-black">
            This will help us send you updates and recomendations.
          </Typography>
          <Box
            className="flex flex-col "
            component="form"
            sx={{
              "& > :not(style)": { m: 1, display: "flex" },
            }}
            noValidate
            autoComplete="off"
          >
            <div class="flex gap-6">
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                className="w-full"
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Age"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Phone Number (WhatsApp)"
                variant="outlined"
              />
            </div>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Current Mailing Address (Residency)"
              variant="outlined"
            />
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Nationality (Country Of Birth)"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Country Of Residence"
                variant="outlined"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Highest Level Of Education for you and your partner (If applicable)"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="How Soon are you considering immigrating to Canada"
                variant="outlined"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Marital Status"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Do you have any dependent children?"
                variant="outlined"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="How many Memners of your household plan to immigrate with you?"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="What is the primary reason for immigrating to Canada?"
                variant="outlined"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Current Occupation"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Have you had your Transcripts evaluated by the Canadian Evaluation Service?"
                variant="outlined"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Which of Canadian Official languages do you speak? Check all that apply"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="What is your first Language (Spoken Fluently)"
                variant="outlined"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Do you have relatives or friends living in canada currently?"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Kindly state amount of Settlement funds Available (CAN $; US $; Naira)"
                variant="outlined"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Have you written the International English Language Testing System (IELTS) exams"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="If YEs, Kindly state the (Month, Year)"
                variant="outlined"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="What province or territory are you interested in migrating to? Check all that apply"
                variant="outlined"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="How did you hear about Nephets Consults"
                variant="outlined"
              />
            </div>
            <Button onClick={add} className="h-10">
              Submit Form
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default HomeUsersCard;
