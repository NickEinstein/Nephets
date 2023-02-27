import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import { Button, TextField, Typography } from "@mui/material";
import userAvatarImage from "../../assets/nehpets/HomeUser_Avartar.svg";
import { Box } from "@mui/system";
import { post } from "services/fetch";
import Header from "features/header/header";
import { useState } from "react";

const HomeUsersCard = () => {

  const [formdata, setFormdata] = useState(
     {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          mailingAddress: "",
          highestLevelEducation: "",
          immigratingToCanada: "",
          children: "",
          howManyMembersHouseHold: "",
          primaryReason: "",
          currentOccupation: "",
          transcriptsEvaluated: "",
          canadianOfficialLanguage: "",
          firstLanguage: "",
          relativesOrFriendsLivingInCanada: "",
          amountOfSettlementFunds: "",
          writtenIELTS: "",
          ieltsMonthYear: "",
          provinceMigrating: "",
          aboutNephetsConsults: "",
      
          
          maritalStatus: "",
          nationality: "",
          address: "",
          country: "",
          listAllMembers: ""
  });

      const onChange = (e) => {
        // console.log(e?.target?.value);
        // console.log(e);
        // console.log(name);

        console.log(e.target.value);
        console.log(e.target.value);
        setFormdata({
          ...formdata,
          [e.target.name]: e.target.value,
        });
      };
      
    const add = async ()=>{
      
 const res = await post({
   endpoint: `customers`,
   body: { ...formdata },
   auth: false,
 });
    }

   console.log(formdata)

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
                name="firstName"
                label="First Name"
                variant="outlined"
                className="w-full"
                onChange={onChange}
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                name="lastName"
                variant="outlined"
                onChange={onChange}
                className="w-full"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Age"
                name="age"
                variant="outlined"
                onChange={onChange}
              />
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Phone Number (WhatsApp)"
                variant="outlined"
                name="mobileNumber"
              />
            </div>
            <TextField
              onChange={onChange}
              className="w-full"
              id="outlined-basic"
              label="Current Mailing Address (Residency)"
              variant="outlined"
              name="mailingAddress"
            />
            <TextField
              onChange={onChange}
              className="w-full"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
            />
            <div class="flex gap-6">
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Nationality (Country Of Birth)"
                variant="outlined"
                name="nationality"
              />
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Country Of Residence"
                variant="outlined"
                name="country"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Highest Level Of Education for you and your partner (If applicable)"
                variant="outlined"
                name="highestLevelEducation"
              />
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="How Soon are you considering immigrating to Canada"
                variant="outlined"
                name="immigratingToCanada"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Marital Status"
                variant="outlined"
                name="maritalStatus"
              />
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Do you have any dependent children?"
                variant="outlined"
                name="children"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="How many Memners of your household plan to immigrate with you?"
                variant="outlined"
                name="howManyMembersHouseHold"
              />
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="What is the primary reason for immigrating to Canada?"
                variant="outlined"
                name="primaryReason"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Current Occupation"
                variant="outlined"
                name="currentOccupation"
              />
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Have you had your Transcripts evaluated by the Canadian Evaluation Service?"
                variant="outlined"
                name="transcriptsEvaluated"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Which of Canadian Official languages do you speak? Check all that apply"
                variant="outlined"
                name="canadianOfficialLanguage"
              />
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="What is your first Language (Spoken Fluently)"
                variant="outlined"
                name="firstLanguage"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Do you have relatives or friends living in canada currently?"
                variant="outlined"
                name="relativesOrFriendsLivingInCanada"
              />
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Kindly state amount of Settlement funds Available (CAN $; US $; Naira)"
                variant="outlined"
                name="amountOfSettlementFunds"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="Have you written the International English Language Testing System (IELTS) exams"
                variant="outlined"
                name="writtenIELTS"
              />
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="If YEs, Kindly state the (Month, Year)"
                variant="outlined"
                name="ieltsMonthYear"
              />
            </div>
            <div class="flex gap-6">
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="What province or territory are you interested in migrating to? Check all that apply"
                variant="outlined"
                name="provinceMigrating"
              />
              <TextField
                onChange={onChange}
                className="w-full"
                id="outlined-basic"
                label="How did you hear about Nephets Consults"
                variant="outlined"
                name="aboutNephetsConsults"
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
