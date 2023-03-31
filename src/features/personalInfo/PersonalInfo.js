import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import cardImage from "../../assets/nehpets/LinkCard_one.svg";
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

import userAvatarImage from "../../assets/nehpets/HomeUser_Avartar.svg";
import { Box } from "@mui/system";
import { post } from "services/fetch";
import Header from "features/header/header";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import moment from "moment";

const HomeUsersCard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [current, setCurrent] = useState(true);
  const [start_date, setStart_date] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const pay = async () => {
    let payload = {
      amount: 50000,
        
      email: formdata.email,
      firstName: formdata.firstName,
      lastName: formdata.lastName,
    };

    const res = await post({
      endpoint: `pay`,
      body: { ...payload },
      auth: false,
    });
    console.log(res);
    if (res.status == 200) {
      enqueueSnackbar(
        res?.data?.message || "Please wait while we re-direct you to Paystack",
        {
          variant: "success",
        }
      );
      setTimeout((window.location.href = `${res?.data?.url}`), 2000);
    } else {
      enqueueSnackbar(res?.data?.message || "Something went Wrond", {
        variant: "error",
      });
    }
  };

   const [paydata, setPaydata] = useState({
     amount: "100",
     email: "oquantoe@outlook.com",
     firstName: "Daniel",
     lastName: "Okon",
   });
  const educationLevel = [
    {
      value: "BSC",
      label: "BSC",
    },
    {
      value: "PHD",
      label: "PHD",
    },
    {
      value: "Masters",
      label: "Masters",
    },
    {
      value: "ND",
      label: "ND",
    },
    {
      value: "HND",
      label: "HND",
    },
    {
      value: "Highschool",
      label: "Highschool",
    },
  ];

  const province = [
    {
      value: "Alberta",
      label: "Alberta",
    },
    {
      value: "British Columbia",
      label: "British Columbia",
    },
    {
      value: "Manitoba",
      label: "Manitoba",
    },
    {
      value: "New Brunswick",
      label: "New Brunswick",
    },
    {
      value: "Newfoundland and Labrador",
      label: "Newfoundland and Labrador",
    },
    {
      value: "Nova Scotia",
      label: "Nova Scotia",
    },
    {
      value: "Ontario",
      label: "Ontario",
    },
    {
      value: "Prince Edward Island",
      label: "Prince Edward Island",
    },
    {
      value: "Quebec",
      label: "Quebec",
    },
    {
      value: "Yukon",
      label: "Yukon",
    },
    {
      value: "Saskatchewan",
      label: "Saskatchewan",
    },
    {
      value: "Northwest Territories",
      label: "Northwest Territories",
    },
    {
      value: "Nunavut",
      label: "Nunavut",
    },
  ];

  const reasonForTravel = [
    {
      value: "Visiting",
      label: "Visiting",
    },
    {
      value: "Permanent",
      label: "Permanent",
    },
    {
      value: "Education",
      label: "Education",
    },
    {
      value: "Work",
      label: "Work",
    },
    {
      value: "Residence",
      label: "Residence",
    },
  ];

  const howLong = [
    {
      value: "1-2 Years",
      label: "1-2 Years",
    },
    {
      value: "1 Year",
      label: "1 Year",
    },
    {
      value: "6 Months",
      label: "6 Months",
    },
  ];

  const maritalStatus = [
    {
      value: "Married",
      label: "Married",
    },
    {
      value: "Single",
      label: "Single",
    },
  ];
  const [formdata, setFormdata] = useState({
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
    listAllMembers: "",
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

  const add = async () => {
    const res = await post({
      endpoint: `form`,
      body: { ...formdata },
      auth: false,
    });
     

    if(res.status == 200){
      pay()
    }
    else{
       enqueueSnackbar(res?.data?.message || "Sorry something went wrong, try again", {
         variant: "error",
       });
    }

    

  console.log(res);

  };



  console.log(formdata);

  return (
    <div>
      <Header />

      {current && (
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
                  select
                  onChange={onChange}
                  className="w-full"
                  id="outlined-basic"
                  label="Highest Level Of Education for you and your partner (If applicable)"
                  variant="outlined"
                  name="highestLevelEducation"
                >
                  {educationLevel.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  onChange={onChange}
                  className="w-full"
                  id="outlined-basic"
                  label="How Soon are you considering immigrating to Canada"
                  variant="outlined"
                  name="immigratingToCanada"
                >
                  {howLong?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div class="flex gap-6">
                <TextField
                  select
                  onChange={onChange}
                  className="w-full"
                  id="outlined-basic"
                  label="Marital Status"
                  variant="outlined"
                  name="maritalStatus"
                >
                  {maritalStatus?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
                  select
                  onChange={onChange}
                  className="w-full"
                  id="outlined-basic"
                  label="What is the primary reason for immigrating to Canada?"
                  variant="outlined"
                  name="primaryReason"
                >
                  {reasonForTravel.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
                  select
                  onChange={onChange}
                  className="w-full"
                  id="outlined-basic"
                  label="What province or territory are you interested in migrating to? Check all that apply"
                  variant="outlined"
                  name="provinceMigrating"
                >
                  {province.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  onChange={onChange}
                  className="w-full"
                  id="outlined-basic"
                  label="How did you hear about Nephets Consults"
                  variant="outlined"
                  name="aboutNephetsConsults"
                />
              </div>
              <Button onClick={handleClickOpen} className="h-10">
                Submit Form
              </Button>
            </Box>
          </div>

          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              fullWidth
              maxWidth="lg"
              style={{ width: "" }}
              className=""
            >
              <DialogTitle id="alert-dialog-title"> Payment Form</DialogTitle>
              <DialogContent className="w-full ">
                <div className="w- p-5 px-20 flex justify-center">
                  <div class="w-3/5">
                    <Typography
                      className="py-8  text-center  text-bold text-primary-main "
                      variant="h5"
                    >
                      You are Paying For {formdata.purpose}
                    </Typography>

                    <Box
                      className="flex flex-col"
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, display: "flex" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div class="flex gap-6">
                        <TextField
                          disabled
                          value={formdata.firstName}
                          id="outlined-basic"
                          label="First Name"
                          // onChange={onChangePay}
                          variant="outlined"
                          className="w-full"
                          name="firstName"
                        />
                        <TextField
                          value={formdata.lastName}
                          disabled
                          id="outlined-basic"
                          label="Last Name"
                          // onChange={onChangePay}
                          variant="outlined"
                          className="w-full"
                          name="lastName"
                        />
                      </div>
                      <div class="flex gap-6">
                        <TextField
                          value={`${50000} naira`}
                          disabled
                          className="w-full"
                          id="outlined-basic"
                          label="Amount"
                          name="amount"
                          // onChange={onChangePay}
                          variant="outlined"
                        />

                        <TextField
                          disabled
                          value={formdata.email}
                          className="w-full"
                          id="outlined-basic"
                          label="Email"
                          name="email"
                          // onChange={onChangePay}
                          variant="outlined"
                        />
                      </div>

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div className="flex-between">
                          <DatePicker
                            fullWidth
                            className=" mr-8 w-full"
                            label="Appointment Date"
                            value={start_date}
                            onChange={(newValue) => {
                              // setWorkList({ ...workList, start_date: newValue });
                              setStart_date(
                                moment(newValue).format("YYYY-MM-DD")
                              );
                              setFormdata({
                                ...formdata,
                                appointmentDate:
                                  moment(newValue).format("YYYY-MM-DD"),
                              });
                              // setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </div>
                      </LocalizationProvider>

                      <Button onClick={add} className="h-10 rounded-full">
                        Make Payment
                      </Button>
                    </Box>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomeUsersCard;
